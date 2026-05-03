"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { createSession } from "@/lib/quiz/api";
import { useQuizStore } from "@/lib/quiz/store";
import { trackEvent } from "@/lib/analytics";

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

    if (sessionUuid && !completed && currentStep !== "QT1") {
      router.replace(`/quiz/${currentStep}`);
    }
  }, [completed, currentStep, hasHydrated, recommendation, router, sessionUuid]);

  async function handleBegin() {
    const nextSession = completed ? createUuid() : sessionUuid ?? createUuid();
    const sessionId = nextSession;
    trackEvent({
      event: "quiz_started",
      sessionUuid: sessionId,
      data: { resumed: completed || Boolean(sessionUuid) },
    });

    if (completed) {
      resetQuiz();
    }

    setSession(nextSession);
    setStep("QT1");

    try {
      await createSession(nextSession);
      trackEvent({
        event: "quiz_session_created",
        sessionUuid: sessionId,
      });
    } catch (error) {
      console.error(error);
      trackEvent({
        event: "quiz_session_create_failed",
        sessionUuid: sessionId,
        data: { message: error instanceof Error ? error.message : "Unknown error" },
      });
    }

    router.push("/quiz/QT1");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-12">
      <section className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="font-display text-3xl italic text-eonic-teal">
            eonic
          </Link>
          <Button href="/" variant="secondary">
            Home
          </Button>
        </div>
        <div className="surface-panel rounded-[32px] px-8 py-14 text-center">
        <p className="font-heading text-5xl text-eonic-text md:text-6xl">
          Let&apos;s understand how your body actually functions.
        </p>
        <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-eonic-text-2">
          A few focused questions. Honest answers only. Most people finish in under 3 minutes.
        </p>
        <Button className="mt-10" onClick={handleBegin}>
          Begin →
        </Button>
        </div>
      </section>
    </main>
  );
}
