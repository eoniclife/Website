"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArchetypeCard } from "@/components/recommendation/ArchetypeCard";
import { EmailCapture } from "@/components/recommendation/EmailCapture";
import { ModuleSection } from "@/components/recommendation/ModuleSection";
import { baseIngredients } from "@/lib/recommendation/ingredients";
import { archetypes } from "@/lib/recommendation/archetypes";
import { modules } from "@/lib/recommendation/modules";
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
  const activeModules = [recommendation.primaryModule, recommendation.secondaryModule]
    .filter(Boolean)
    .map((moduleId) => modules[moduleId as string]);

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <div className="mx-auto max-w-5xl space-y-10">
        <header className="space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Your Eonic protocol</p>
          <h1 className="font-display text-5xl text-eonic-text">{archetype.name}</h1>
          <p className="max-w-3xl text-lg leading-8 text-eonic-text-2">{archetype.description}</p>
        </header>

        <ModuleSection
          title="Your Eonic Baseline"
          subhead="Everyone starts here. This is what your biology needs regardless of everything else."
          ingredients={baseIngredients}
        />

        {activeModules.map((module) => (
          <ModuleSection
            key={module.id}
            title={module.name}
            subhead={`Based on your answers, we've added ${module.name} to your protocol.`}
            ingredients={module.ingredients}
          />
        ))}

        <ArchetypeCard name={archetype.name} description={archetype.description} />
        <EmailCapture recommendation={recommendation} />
      </div>
    </main>
  );
}
