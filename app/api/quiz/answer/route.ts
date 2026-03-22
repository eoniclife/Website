import type { DimensionScores } from "@/lib/quiz/types";
import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidQuestionId, isValidScore, isValidUUID } from "@/lib/validation";

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
      return failure("VALIDATION_ERROR", 400, { fields: invalidFields });
    }

    const client = createServerClient();
    const { data: session, error: fetchError } = await client
      .from("quiz_sessions")
      .select("raw_answers")
      .eq("session_uuid", body.sessionUuid)
      .maybeSingle();

    if (fetchError || !session) {
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
      return failure("DB_ERROR", 500, { message: updateError.message });
    }

    return success({ success: true });
  } catch (error) {
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
