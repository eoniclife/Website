import type { DimensionScores } from "@/lib/quiz/types";
import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidQuestionId, isValidScore, isValidUUID } from "@/lib/validation";
import { logApiError, logServerEvent } from "@/lib/observability";

interface RequestBody {
  sessionUuid: string;
  questionId: string;
  answerId: string;
  answerText: string;
  score: 0 | 1 | 2;
  flags?: string[];
  dimensionOverrides?: Partial<DimensionScores>;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    const invalidFields: string[] = [];
    if (!isValidUUID(body.sessionUuid)) invalidFields.push("sessionUuid");
    if (!isValidQuestionId(body.questionId)) invalidFields.push("questionId");
    if (!body.answerId) invalidFields.push("answerId");
    if (!isValidScore(body.score)) invalidFields.push("score");
    if (invalidFields.length > 0) {
      logServerEvent("warn", {
        event: "quiz_answer_validation_failed",
        route: "/api/quiz/answer",
        details: { sessionUuid: body.sessionUuid ?? null, questionId: body.questionId ?? null, invalidFields },
      });
      return failure("VALIDATION_ERROR", 400, { fields: invalidFields });
    }

    const client = createServerClient();
    const { data: session, error: fetchError } = await client
      .from("quiz_sessions")
      .select("raw_answers")
      .eq("session_uuid", body.sessionUuid)
      .maybeSingle();

    if (fetchError || !session) {
      logServerEvent("warn", {
        event: "quiz_answer_session_missing",
        route: "/api/quiz/answer",
        details: { sessionUuid: body.sessionUuid, questionId: body.questionId, message: fetchError?.message ?? null },
      });
      return failure("SESSION_NOT_FOUND", 400);
    }

    const mergedAnswers = {
      ...(session.raw_answers ?? {}),
      [body.questionId]: {
        id: body.answerId,
        text: body.answerText,
        score: body.score,
        flags: body.flags,
        dimensionOverrides: body.dimensionOverrides,
      },
    };

    const { error: updateError } = await client
      .from("quiz_sessions")
      .update({ raw_answers: mergedAnswers })
      .eq("session_uuid", body.sessionUuid);

    if (updateError) {
      logServerEvent("error", {
        event: "quiz_answer_update_failed",
        route: "/api/quiz/answer",
        details: { sessionUuid: body.sessionUuid, questionId: body.questionId, message: updateError.message },
      });
      return failure("DB_ERROR", 500, { message: updateError.message });
    }

    return success({ success: true });
  } catch (error) {
    logApiError("/api/quiz/answer", error);
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
