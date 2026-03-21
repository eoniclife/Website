"use client";

import { buildRecommendation } from "@/lib/quiz/scoring";
import type { RecommendationResult, StoredAnswer } from "@/lib/quiz/types";

export async function createSession(sessionUuid: string) {
  const response = await fetch("/api/quiz/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionUuid,
      startedAt: new Date().toISOString(),
      userAgent: typeof navigator === "undefined" ? undefined : navigator.userAgent,
    }),
  });

  if (!response.ok && response.status !== 409) {
    throw new Error("SESSION_CREATE_FAILED");
  }

  return response.json();
}

export async function saveAnswerToDb(sessionUuid: string, questionId: string, answer: StoredAnswer) {
  const response = await fetch("/api/quiz/answer", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionUuid,
      questionId,
      answerId: answer.id,
      answerText: answer.text,
      score: answer.score,
      flags: answer.flags,
    }),
  });

  if (!response.ok) {
    throw new Error("ANSWER_SAVE_FAILED");
  }
}

export async function getRecommendation(sessionUuid: string, answers: Record<string, StoredAnswer>) {
  try {
    const response = await fetch("/api/quiz/complete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionUuid }),
    });

    if (!response.ok) {
      throw new Error(await response.text());
    }

    const payload = await response.json();
    return payload as { success: true; result: RecommendationResult; fallback?: boolean };
  } catch (error) {
    console.error("Server scoring failed, running client-side fallback", error);
    return {
      success: true as const,
      result: buildRecommendation(answers),
      fallback: true,
    };
  }
}
