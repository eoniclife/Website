"use client";

import { useState } from "react";
import type { Ingredient } from "@/lib/recommendation/types";
import { cn } from "@/lib/utils";

export function IngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="surface-panel rounded-card p-5">
      <button type="button" className="w-full text-left" onClick={() => setOpen((value) => !value)}>
        <div className="font-mono text-sm text-eonic-teal">{ingredient.name}</div>
        <div className="mt-2 text-base text-eonic-text">{ingredient.purpose}</div>
        <p className="mt-3 text-sm leading-6 text-eonic-text-2">{ingredient.why}</p>
        <div className="mt-4 flex items-center justify-between border-t border-eonic-border pt-4 text-sm">
          <span className="text-eonic-gold">{ingredient.timing}</span>
          <span className="text-eonic-text-2">{open ? "▲ Close" : "▼ See the research"}</span>
        </div>
      </button>
      <div className={cn("grid transition-all duration-300", open ? "grid-rows-[1fr] pt-4" : "grid-rows-[0fr]")}>
        <div className="overflow-hidden">
          <div className="rounded-card border border-eonic-border bg-eonic-bg px-4 py-4 text-sm leading-6 text-eonic-text-2">
            <p className="font-medium text-eonic-text">Study: {ingredient.research.citation}</p>
            <p className="mt-2">{ingredient.research.tested}</p>
            <p className="mt-2">{ingredient.research.found}</p>
            <p className="mt-2 text-eonic-text">{ingredient.research.meaning}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
