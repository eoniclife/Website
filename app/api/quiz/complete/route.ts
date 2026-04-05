import { buildRecommendation } from "@/lib/quiz/scoring";
import type { StoredAnswer } from "@/lib/quiz/types";
import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";
import { logServerEvent } from "@/lib/observability";

interface RequestBody {
  sessionUuid: string;
  clientAnswers?: Record<string, StoredAnswer>;
}

export async function POST(request: Request) {
  let sessionId: string | null = null;

  try {
    const body = await parseJson<RequestBody>(request);
    sessionId = body.sessionUuid ?? null;
    logServerEvent("info", {
      event: "quiz_complete_started",
      route: "/api/quiz/complete",
      details: { sessionId },
    });

    if (!isValidUUID(body.sessionUuid)) {
      return failure("VALIDATION_ERROR", 400, { fields: ["sessionUuid"] });
    }

    const client = createServerClient();
    const { data: session, error } = await client
      .from("quiz_sessions")
      .select("id, user_id, raw_answers")
      .eq("session_uuid", body.sessionUuid)
      .maybeSingle();

    if (error || !session) {
      return failure("SESSION_NOT_FOUND", 400);
    }

    const rawAnswers = (session.raw_answers ?? {}) as Record<string, StoredAnswer>;
    const clientAnswerCount = Object.keys(body.clientAnswers ?? {}).length;
    const rawAnswerCount = Object.keys(rawAnswers).length;
    const answersToScore =
      rawAnswerCount >= 36
        ? rawAnswers
        : { ...(body.clientAnswers ?? {}), ...rawAnswers };

    if (Object.keys(answersToScore).length === 0) {
      return failure("SESSION_INCOMPLETE", 400);
    }

    if (rawAnswerCount < 36 && clientAnswerCount > 0) {
      logServerEvent("warn", {
        event: "quiz_complete_fallback_used",
        route: "/api/quiz/complete",
        details: {
          sessionId,
          reason: "db_answers_incomplete",
          clientAnswerCount,
        },
      });
    }

    const result = buildRecommendation(answersToScore);

    const { error: updateError } = await client
      .from("quiz_sessions")
      .update({
        completed_at: new Date().toISOString(),
        scores: result.scores,
        archetype: result.archetype,
        primary_module: result.primaryModule,
        secondary_module: result.secondaryModule,
        is_vegetarian: result.isVegetarian,
      })
      .eq("session_uuid", body.sessionUuid);

    if (updateError) {
      return failure("DB_ERROR", 500, { message: updateError.message });
    }

    await recordStateEvent(client, {
      userId: session.user_id,
      eventType: "quiz_completed",
      eventData: {
        archetype: result.archetype,
        primary_module: result.primaryModule,
        secondary_module: result.secondaryModule,
        scores: result.scores,
      },
    });

    logServerEvent("info", {
      event: "quiz_complete_scored",
      route: "/api/quiz/complete",
      details: {
        sessionId,
        archetype: result.archetype,
        primaryModule: result.primaryModule,
        secondaryModule: result.secondaryModule,
        answerCount: Object.keys(answersToScore).length,
      },
    });

    return success({ success: true, result });
  } catch (error) {
    logServerEvent("error", {
      event: "quiz_complete_error",
      route: "/api/quiz/complete",
      details: {
        sessionId,
        error: error instanceof Error ? error.message : "Unknown error",
      },
    });
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
