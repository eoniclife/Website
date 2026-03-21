"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const questions = [
  ["Do I need bloodwork to start?", "No. The quiz is designed to give you a strong starting baseline without requiring bloodwork first."],
  ["What if I'm vegetarian?", "The quiz routes vegetarian users so B12 priority can be elevated in the final protocol."],
  ["How is this different from buying supplements individually?", "The protocol combines baseline ingredients with a personalized module, timing system, and research context instead of leaving you to self-assemble."],
  ["What happens after 90 days?", "V1 logs your order intent and prepares the state needed for future check-ins and renewals."],
  ["Is this safe if I'm on medication?", "The launch copy should direct users on medication to review ingredients with their physician before starting any supplement regimen."],
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">FAQ</p>
          <h2 className="mt-3 font-display text-4xl text-eonic-text">What people ask before they start.</h2>
        </div>
        <div className="space-y-4">
          {questions.map(([question, answer], index) => {
            const active = open === index;
            return (
              <button
                key={question}
                type="button"
                className={cn(
                  "surface-panel block w-full rounded-card p-6 text-left transition",
                  active ? "border-eonic-border-active" : "",
                )}
                onClick={() => setOpen(active ? null : index)}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-lg text-eonic-text">{question}</span>
                  <span className="text-eonic-teal">{active ? "−" : "+"}</span>
                </div>
                {active ? <p className="mt-4 text-sm leading-6 text-eonic-text-2">{answer}</p> : null}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
