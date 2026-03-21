"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { createSession } from "@/lib/quiz/api";
import { useQuizStore } from "@/lib/quiz/store";

function createUuid() {
  return crypto.randomUUID();
}

export default function QuizEntryPage() {
  const router = useRouter();
  const { hasHydrated, sessionUuid, completed, recommendation, currentStep, setSession, setStep, resetQuiz } =
    useQuizStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (completed && recommendation) {
      router.replace("/protocol");
      return;
    }

    if (sessionUuid && !completed && currentStep !== "Q1") {
      router.replace(`/quiz/${currentStep}`);
    }
  }, [completed, currentStep, hasHydrated, recommendation, router, sessionUuid]);

  async function handleBegin() {
    const nextSession = completed ? createUuid() : sessionUuid ?? createUuid();

    if (completed) {
      resetQuiz();
    }

    setSession(nextSession);
    setStep("Q1");

    try {
      await createSession(nextSession);
    } catch (error) {
      console.error(error);
    }

    router.push("/quiz/Q1");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-12">
      <section className="surface-panel w-full max-w-3xl rounded-[32px] px-8 py-14 text-center">
        <p className="font-display text-5xl italic text-eonic-text md:text-6xl">
          Let&apos;s understand how your body actually functions.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-eonic-text-2">
          36 questions. Honest answers only. We&apos;re building your protocol as you go.
        </p>
        <Button className="mt-10" onClick={handleBegin}>
          Begin →
        </Button>
      </section>
    </main>
  );
}
