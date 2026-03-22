import { buildRecommendation } from "@/lib/quiz/scoring";
import type { StoredAnswer } from "@/lib/quiz/types";
import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";

interface RequestBody {
  sessionUuid: string;
  clientAnswers?: Record<string, StoredAnswer>;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
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
    const answersToScore =
      Object.keys(rawAnswers).length >= 36
        ? rawAnswers
        : { ...(body.clientAnswers ?? {}), ...rawAnswers };

    if (Object.keys(answersToScore).length === 0) {
      return failure("SESSION_INCOMPLETE", 400);
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

    return success({ success: true, result });
  } catch (error) {
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
