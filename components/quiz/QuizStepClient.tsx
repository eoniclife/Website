"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Interstitial } from "@/components/quiz/Interstitial";
import { LoadingScreen } from "@/components/quiz/LoadingScreen";
import { QuestionCard } from "@/components/quiz/QuestionCard";
import { getRecommendation, saveAnswerToDb } from "@/lib/quiz/api";
import { getInterstitialContent } from "@/lib/quiz/interstitials";
import { questionsById } from "@/lib/quiz/questions";
import { getNextStep, getPrevStep, getProgressPercent, isQuestionStep } from "@/lib/quiz/sequence";
import { useQuizStore } from "@/lib/quiz/store";
import type { StoredAnswer } from "@/lib/quiz/types";

export function QuizStepClient({ step }: { step: string }) {
  const router = useRouter();
  const hasCompletedLoading = useRef(false);
  const [direction, setDirection] = useState(1);
  const { answers, currentStep, sessionUuid, setAnswer, setStep, setCompleted } = useQuizStore();

  useEffect(() => {
    if (!sessionUuid) {
      router.replace("/quiz");
      return;
    }

    if (!questionsById[step] && !["INT1", "INT2", "INT3", "INT4", "INT5", "LOADING"].includes(step)) {
      router.replace("/quiz");
      return;
    }

    setStep(step);
  }, [router, sessionUuid, setStep, step]);

  const question = questionsById[step];
  const selected = question ? answers[question.id] : undefined;
  const questionIndex = useMemo(() => (question ? Number(question.id.slice(1)) : 36), [question]);
  const progress = getProgressPercent(step);

  async function handleAnswer(answer: StoredAnswer) {
    if (!question || !sessionUuid) {
      return;
    }

    setAnswer(question.id, answer);

    const next = getNextStep(step);
    if (next) {
      setDirection(1);
      setStep(next);
      router.push(`/quiz/${next}`);
    }

    saveAnswerToDb(sessionUuid, question.id, answer).catch((error) => {
      console.error("Background save failed:", error);
    });
  }

  function handleBack() {
    const previous = getPrevStep(step);
    if (!previous) {
      router.push("/quiz");
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

  const interstitialContent = step.startsWith("INT") ? getInterstitialContent(step, answers) : null;

  return (
    <section className="min-h-screen bg-eonic-bg px-5 py-8 md:px-8 md:py-10">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: direction > 0 ? 30 : -30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -30 : 30 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {question ? (
            <QuestionCard
              question={question}
              questionIndex={questionIndex}
              progress={progress}
              selected={selected}
              onBack={handleBack}
              onAnswer={handleAnswer}
            />
          ) : null}

          {!question && interstitialContent ? (
            <Interstitial
              content={interstitialContent}
              progress={progress}
              onContinue={() => {
                const next = getNextStep(step);
                if (!next) {
                  router.push("/protocol");
                  return;
                }
                setDirection(1);
                setStep(next);
                router.push(`/quiz/${next}`);
              }}
            />
          ) : null}

          {step === "LOADING" ? <LoadingScreen onComplete={handleLoadingComplete} /> : null}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
