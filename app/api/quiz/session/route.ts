import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";
import { logApiError, logServerEvent } from "@/lib/observability";

interface RequestBody {
  sessionUuid: string;
  startedAt: string;
  userAgent?: string;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    if (!body.sessionUuid || !isValidUUID(body.sessionUuid) || !body.startedAt) {
      logServerEvent("warn", {
        event: "quiz_session_validation_failed",
        route: "/api/quiz/session",
        details: { sessionUuid: body.sessionUuid ?? null, startedAt: body.startedAt ?? null },
      });
      return failure("VALIDATION_ERROR", 400, { fields: ["sessionUuid", "startedAt"] });
    }

    const client = createServerClient();
    const { data: existing } = await client.from("quiz_sessions").select("session_uuid").eq("session_uuid", body.sessionUuid).maybeSingle();
    if (existing) {
      logServerEvent("info", {
        event: "quiz_session_exists",
        route: "/api/quiz/session",
        details: { sessionUuid: body.sessionUuid },
      });
      return failure("SESSION_EXISTS", 409);
    }

    const { error } = await client.from("quiz_sessions").insert({
      session_uuid: body.sessionUuid,
      started_at: body.startedAt,
      raw_answers: {},
    });

    if (error) {
      logServerEvent("error", {
        event: "quiz_session_insert_failed",
        route: "/api/quiz/session",
        details: { sessionUuid: body.sessionUuid, message: error.message },
      });
      return failure("DB_ERROR", 500, { message: error.message });
    }

    await recordStateEvent(client, {
      eventType: "quiz_started",
      eventData: { session_uuid: body.sessionUuid, user_agent: body.userAgent ?? null },
    });

    return success({ success: true, sessionUuid: body.sessionUuid });
  } catch (error) {
    logApiError("/api/quiz/session", error);
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
