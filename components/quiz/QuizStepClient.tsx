"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Interstitial } from "@/components/quiz/Interstitial";
import { LoadingScreen } from "@/components/quiz/LoadingScreen";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { TriageMultiSelect } from "@/components/quiz/TriageMultiSelect";
import { TransitionScreen } from "@/components/quiz/TransitionScreen";
import { trackEvent } from "@/lib/analytics";
import { getRecommendation, saveAnswerToDb } from "@/lib/quiz/api";
import { getInterstitialContent, getTransitionContent } from "@/lib/quiz/interstitials";
import { questionsById, triageQuestions } from "@/lib/quiz/questions";
import {
  buildAdaptiveSequence,
  getNextStep,
  getPrevQuestionStep,
  getProgressPercent,
  getQuestionPosition,
} from "@/lib/quiz/sequence";
import { useQuizStore } from "@/lib/quiz/store";
import type { StoredAnswer } from "@/lib/quiz/types";

const RESET_CONFIRMATION = "This will clear your answers and restart the quiz.";

export function QuizStepClient({ step }: { step: string }) {
  const router = useRouter();
  const hasCompletedLoading = useRef(false);
  const trackedStepViews = useRef<Set<string>>(new Set());
  const [direction, setDirection] = useState(1);
  const {
    hasHydrated,
    answers,
    currentStep,
    sessionUuid,
    adaptiveSequence,
    triageSelections,
    setAnswer,
    setStep,
    setCompleted,
    setTriage,
    resetToTriage,
  } = useQuizStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!sessionUuid) {
      router.replace("/quiz");
      return;
    }

    const validSteps = adaptiveSequence.length > 0 ? adaptiveSequence : ["QT1", "QT2", "QT3"];
    if (!validSteps.includes(step)) {
      router.replace(`/quiz/${currentStep}`);
      return;
    }

    setStep(step);
  }, [adaptiveSequence, currentStep, hasHydrated, router, sessionUuid, setStep, step]);

  const question = questionsById[step];
  const selected = question ? answers[question.id] : undefined;
  const { index: questionIndex, total: questionTotal } = getQuestionPosition(step, adaptiveSequence);
  const progress = getProgressPercent(step, adaptiveSequence);

  useEffect(() => {
    if (!hasHydrated || !sessionUuid || !step || !question) {
      return;
    }

    const key = `${sessionUuid}:${step}`;
    if (trackedStepViews.current.has(key)) {
      return;
    }

    trackedStepViews.current.add(key);
    trackEvent({
      event: "quiz_step_viewed",
      sessionUuid,
      data: {
        step,
        question_index: questionIndex,
        question_total: questionTotal,
      },
    });
  }, [hasHydrated, question, questionIndex, questionTotal, sessionUuid, step]);

  const advance = useCallback(
    (fromStep: string, sequence = adaptiveSequence) => {
      const next = getNextStep(fromStep, sequence);
      if (!next) {
        router.push("/protocol");
        return;
      }

      setDirection(1);
      setStep(next);
      router.push(`/quiz/${next}`);
    },
    [adaptiveSequence, router, setStep],
  );

  async function handleAnswer(answer: StoredAnswer) {
    if (!question || !sessionUuid) {
      return;
    }

    setAnswer(question.id, answer);
    advance(step);

    saveAnswerToDb(sessionUuid, question.id, answer).catch((error) => {
      console.error("Background save failed:", error);
      trackEvent({
        event: "quiz_answer_save_failed_client",
        sessionUuid,
        data: {
          question_id: question.id,
          answer_id: answer.id,
          message: error instanceof Error ? error.message : String(error),
        },
      });
    });
  }

  async function handleTriageSubmit(selections: string[]) {
    if (!sessionUuid) {
      return;
    }

    const nextSequence = buildAdaptiveSequence(selections);
    const selectionMap = new Map(triageQuestions[2].options.map((option) => [option.id, option.text]));
    const storedAnswer: StoredAnswer = {
      id: selections.join("|") || "none",
      text: selections.map((selection) => selectionMap.get(selection) ?? selection).join(" • "),
      score: 0,
      flags: selections,
    };

    setTriage(selections);
    setStep(nextSequence[3] ?? "LOADING");
    router.push(`/quiz/${nextSequence[3] ?? "LOADING"}`);

    saveAnswerToDb(sessionUuid, "QT3", storedAnswer).catch((error) => {
      console.error("Background save failed:", error);
    });
  }

  function handleBack() {
    const previous = getPrevQuestionStep(step, adaptiveSequence);
    if (!previous) {
      router.push("/quiz");
      return;
    }

    if (previous === "QT3" && step !== "QT3") {
      if (window.confirm(RESET_CONFIRMATION)) {
        resetToTriage();
        setDirection(-1);
        router.push("/quiz/QT3");
      }
      return;
    }

    setDirection(-1);
    setStep(previous);
    router.push(`/quiz/${previous}`);
  }

  async function handleLoadingComplete() {
    if (!sessionUuid || hasCompletedLoading.current) {
      return;
    }

    hasCompletedLoading.current = true;
    const response = await getRecommendation(sessionUuid, answers);
    setCompleted(response.result);
    router.replace("/protocol");
  }

  const interstitialContent = step.startsWith("INT_") ? getInterstitialContent(step, answers, triageSelections) : null;
  const transitionContent =
    step === "TRIAGE_END" || step.startsWith("CLUSTER_INTRO_")
      ? getTransitionContent(step, triageSelections)
      : null;
  const handleTransitionContinue = useCallback(() => {
    advance(step);
  }, [advance, step]);

  return (
    <section className="min-h-screen bg-eonic-bg px-5 py-8 md:px-8 md:py-10">
      {!hasHydrated ? null : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {question && step !== "QT3" ? (
              <QuestionCard
                question={question}
                questionIndex={questionIndex}
                questionTotal={questionTotal}
                progress={progress}
                selected={selected}
                onBack={handleBack}
                onAnswer={handleAnswer}
              />
            ) : null}

            {step === "QT3" ? (
              <TriageMultiSelect
                question={triageQuestions[2]}
                progress={progress}
                questionIndex={questionIndex}
                questionTotal={questionTotal}
                initialSelections={answers.QT3?.flags ?? triageSelections}
                onBack={handleBack}
                onSubmit={handleTriageSubmit}
              />
            ) : null}

            {transitionContent ? (
              <TransitionScreen
                content={transitionContent}
                progress={progress}
                onContinue={handleTransitionContinue}
              />
            ) : null}

            {interstitialContent ? (
              <Interstitial
                content={interstitialContent}
                progress={progress}
                onContinue={() => advance(step)}
              />
            ) : null}

            {step === "LOADING" ? <LoadingScreen onComplete={handleLoadingComplete} /> : null}
          </motion.div>
        </AnimatePresence>
      )}
    </section>
  );
}
