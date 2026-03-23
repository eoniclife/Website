import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";
import { logApiError } from "@/lib/observability";

interface RequestBody {
  event: string;
  sessionUuid?: string | null;
  userId?: string | null;
  orderId?: string | null;
  data?: Record<string, unknown>;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    if (!body.event || typeof body.event !== "string") {
      return failure("VALIDATION_ERROR", 400, { fields: ["event"] });
    }

    const userId = body.userId && isValidUUID(body.userId) ? body.userId : null;
    const orderId = body.orderId && isValidUUID(body.orderId) ? body.orderId : null;

    const client = createServerClient();
    await recordStateEvent(client, {
      userId,
      orderId,
      eventType: body.event,
      eventData: {
        ...(body.data ?? {}),
        session_uuid: body.sessionUuid ?? null,
        source: "client_analytics",
      },
    });

    return success({ success: true });
  } catch (error) {
    logApiError("/api/analytics/event", error);
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
