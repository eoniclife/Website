"use client";

import { getIngredientBreakdown } from "@/lib/protocol/ingredients";
import type { RecommendationResult } from "@/lib/quiz/types";

export function IngredientBreakdown({ recommendation }: { recommendation: RecommendationResult }) {
  const groups = getIngredientBreakdown(recommendation);

  return (
    <section className="space-y-6">
      <div className="space-y-3">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">What is actually in your stack</p>
        <h2 className="font-heading text-4xl text-eonic-text md:text-5xl">Ingredient by ingredient, with the reason it is here.</h2>
        <p className="max-w-3xl text-base leading-7 text-eonic-text-2">
          This is your 90-day protocol broken down the useful way: what is foundational, what is here because of your archetype, and what got added because of the modules you flagged.
        </p>
      </div>

      <div className="space-y-8">
        {groups.map((group) => (
          <section key={group.id} className="space-y-4">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-teal">{group.label}</p>
              <p className="max-w-3xl text-sm leading-6 text-eonic-text-muted">{group.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {group.ingredients.map((ingredient) => (
                <article key={`${group.id}-${ingredient.key}`} className="surface-panel rounded-card p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="space-y-2">
                      <p className="font-mono text-xs uppercase tracking-[0.28em] text-eonic-gold">{ingredient.name}</p>
                      <h3 className="text-xl text-eonic-text">{ingredient.form}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-full border border-eonic-border bg-eonic-bg px-3 py-1 font-mono uppercase tracking-[0.2em] text-eonic-teal">
                        {ingredient.dose}
                      </span>
                      <span className="rounded-full border border-eonic-border bg-eonic-bg px-3 py-1 font-mono uppercase tracking-[0.2em] text-eonic-text-2">
                        {ingredient.timing}
                      </span>
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-7 text-eonic-text-2">{ingredient.rationale}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
