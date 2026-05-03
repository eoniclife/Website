"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { faqCopy } from "@/lib/homepage/content";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-5 py-16 md:px-8 md:pb-24">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">FAQ</p>
          <h2 className="mt-3 font-heading text-4xl text-eonic-text">What people ask before they start.</h2>
        </div>
        <div className="space-y-4">
          {faqCopy.map(([question, answer], index) => {
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
