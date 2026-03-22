"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { buildAdaptiveSequence, DEFAULT_SEQUENCE } from "@/lib/quiz/sequence";
import type { RecommendationResult, StoredAnswer, TriageSelections } from "@/lib/quiz/types";

interface QuizState {
  hasHydrated: boolean;
  sessionUuid: string | null;
  answers: Record<string, StoredAnswer>;
  currentStep: string;
  triageSelections: TriageSelections;
  adaptiveSequence: string[];
  completed: boolean;
  recommendation: RecommendationResult | null;
  userId: string | null;
  setSession: (uuid: string) => void;
  setAnswer: (questionId: string, answer: StoredAnswer) => void;
  setStep: (step: string) => void;
  setCompleted: (result: RecommendationResult) => void;
  setUserId: (userId: string) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
  setTriage: (selections: TriageSelections) => void;
  resetToTriage: () => void;
  resetQuiz: () => void;
}

type PersistedQuizState = Pick<
  QuizState,
  | "sessionUuid"
  | "answers"
  | "currentStep"
  | "triageSelections"
  | "adaptiveSequence"
  | "completed"
  | "recommendation"
  | "userId"
>;

const STORAGE_VERSION = 2;

function getDefaultPersistedState(): PersistedQuizState {
  return {
    sessionUuid: null,
    answers: {},
    currentStep: "QT1",
    triageSelections: [],
    adaptiveSequence: [...DEFAULT_SEQUENCE],
    completed: false,
    recommendation: null,
    userId: null,
  };
}

function hasLegacyQuestionState(state: Partial<PersistedQuizState> | undefined) {
  if (!state) {
    return false;
  }

  const currentStep = state.currentStep ?? "";
  if (/^Q([1-9]|[12]\d|3[0-6])$/.test(currentStep)) {
    return true;
  }

  return Object.keys(state.answers ?? {}).some((key) => /^Q([1-9]|[12]\d|3[0-6])$/.test(key));
}

function getRetainedPreTriageAnswers(answers: Record<string, StoredAnswer>) {
  return Object.fromEntries(
    Object.entries(answers).filter(([questionId]) => questionId === "QT1" || questionId === "QT2"),
  );
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set) => ({
      hasHydrated: false,
      ...getDefaultPersistedState(),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setSession: (uuid) => set({ sessionUuid: uuid }),
      setAnswer: (questionId, answer) =>
        set((state) => ({
          answers: { ...state.answers, [questionId]: answer },
        })),
      setStep: (step) => set({ currentStep: step }),
      setCompleted: (result) => set({ completed: true, recommendation: result }),
      setUserId: (userId) => set({ userId }),
      setTriage: (selections) =>
        set((state) => ({
          triageSelections: selections,
          adaptiveSequence: buildAdaptiveSequence(selections),
          answers: {
            ...state.answers,
            QT3: {
              id: selections.join("|") || "none",
              text: selections.join(", "),
              score: 0,
              flags: selections,
            },
          },
        })),
      resetToTriage: () =>
        set((state) => ({
          answers: getRetainedPreTriageAnswers(state.answers),
          currentStep: "QT3",
          triageSelections: [],
          adaptiveSequence: [...DEFAULT_SEQUENCE],
          completed: false,
          recommendation: null,
        })),
      resetQuiz: () =>
        set({
          hasHydrated: true,
          ...getDefaultPersistedState(),
        }),
    }),
    {
      name: "eonic-quiz-state",
      version: STORAGE_VERSION,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<PersistedQuizState> | undefined;
        if (!state || version < STORAGE_VERSION || hasLegacyQuestionState(state)) {
          return getDefaultPersistedState();
        }

        return {
          ...getDefaultPersistedState(),
          ...state,
          adaptiveSequence:
            state.adaptiveSequence && state.adaptiveSequence.length > 0
              ? state.adaptiveSequence
              : state.triageSelections && state.triageSelections.length > 0
                ? buildAdaptiveSequence(state.triageSelections)
                : [...DEFAULT_SEQUENCE],
        };
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        sessionUuid: state.sessionUuid,
        answers: state.answers,
        currentStep: state.currentStep,
        triageSelections: state.triageSelections,
        adaptiveSequence: state.adaptiveSequence,
        completed: state.completed,
        recommendation: state.recommendation,
        userId: state.userId,
      }),
    },
  ),
);
