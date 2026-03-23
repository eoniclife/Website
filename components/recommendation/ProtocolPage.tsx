"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Nav } from "@/components/shared/Nav";
import { ArchetypeCard } from "@/components/recommendation/ArchetypeCard";
import { EmailCapture } from "@/components/recommendation/EmailCapture";
import { IngredientBreakdown } from "@/components/recommendation/IngredientBreakdown";
import { InsightLayer } from "@/components/recommendation/InsightLayer";
import { archetypes } from "@/lib/recommendation/archetypes";
import { useQuizStore } from "@/lib/quiz/store";

export function ProtocolPage() {
  const router = useRouter();
  const { hasHydrated, recommendation, completed } = useQuizStore();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!recommendation || !completed) {
      router.replace("/quiz");
    }
  }, [completed, hasHydrated, recommendation, router]);

  if (!hasHydrated || !recommendation || !completed) {
    return null;
  }

  const archetype = archetypes[recommendation.archetype] ?? archetypes.FOUNDATION_BUILDER;

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <Nav />
      <div className="mx-auto max-w-5xl space-y-10 pt-6">
        <header className="space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Your Eonic protocol</p>
          <h1 className="font-heading text-5xl text-eonic-text">{archetype.name}</h1>
          <p className="max-w-3xl text-lg leading-8 text-eonic-text-2">{archetype.description}</p>
        </header>

        <InsightLayer recommendation={recommendation} />
        <IngredientBreakdown recommendation={recommendation} />
        <ArchetypeCard name={archetype.name} description={archetype.description} />
        <EmailCapture recommendation={recommendation} />
        <button
          onClick={() => {
            useQuizStore.getState().resetQuiz();
            router.push("/quiz");
          }}
          className="mx-auto block text-sm text-eonic-text-muted transition-colors hover:text-eonic-text-2"
        >
          Retake the quiz
        </button>
      </div>
    </main>
  );
}
