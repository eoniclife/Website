"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RecommendationResult, StoredAnswer } from "@/lib/quiz/types";

interface QuizState {
  hasHydrated: boolean;
  sessionUuid: string | null;
  answers: Record<string, StoredAnswer>;
  currentStep: string;
  completed: boolean;
  recommendation: RecommendationResult | null;
  userId: string | null;
  setSession: (uuid: string) => void;
  setAnswer: (questionId: string, answer: StoredAnswer) => void;
  setStep: (step: string) => void;
  setCompleted: (result: RecommendationResult) => void;
  setUserId: (userId: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  resetQuiz: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      sessionUuid: null,
      answers: {},
      currentStep: "Q1",
      completed: false,
      recommendation: null,
      userId: null,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setSession: (uuid) => set({ sessionUuid: uuid }),
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),
      setStep: (step) => set({ currentStep: step }),
      setCompleted: (result) => set({ completed: true, recommendation: result }),
      setUserId: (userId) => set({ userId }),
      resetQuiz: () =>
        set({
          hasHydrated: true,
          sessionUuid: null,
          answers: {},
          currentStep: "Q1",
          completed: false,
          recommendation: null,
          userId: null,
        }),
    }),
    {
      name: "eonic-quiz-state",
      version: 1,
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        sessionUuid: state.sessionUuid,
        answers: state.answers,
        currentStep: state.currentStep,
        completed: state.completed,
        recommendation: state.recommendation,
        userId: state.userId,
      }),
    },
  ),
);
