"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/shared/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { cn } from "@/lib/utils";
import type { QuizQuestion, TriageSelections } from "@/lib/quiz/types";

interface TriageMultiSelectProps {
  question: QuizQuestion;
  progress: number;
  questionIndex: number;
  questionTotal: number;
  initialSelections: TriageSelections;
  onBack: () => void;
  onSubmit: (selections: TriageSelections) => void;
}

export function TriageMultiSelect({
  question,
  progress,
  questionIndex,
  questionTotal,
  initialSelections,
  onBack,
  onSubmit,
}: TriageMultiSelectProps) {
  const [selections, setSelections] = useState<TriageSelections>(initialSelections);

  const hasOptimizer = selections.includes("optimizer");
  const symptomSelections = selections.filter((selection) => selection !== "optimizer");

  const disabledOptions = useMemo(() => {
    if (hasOptimizer) {
      return new Set(question.options.filter((option) => option.id !== "optimizer").map((option) => option.id));
    }

    if (symptomSelections.length >= 3) {
      return new Set(
        question.options
          .filter((option) => option.id !== "optimizer" && !symptomSelections.includes(option.id))
          .map((option) => option.id),
      );
    }

    return new Set<string>();
  }, [hasOptimizer, question.options, symptomSelections]);

  function toggleSelection(optionId: string) {
    setSelections((current) => {
      const alreadySelected = current.includes(optionId);

      if (alreadySelected) {
        return current.filter((value) => value !== optionId);
      }

      if (optionId === "optimizer") {
        return ["optimizer"];
      }

      const withoutOptimizer = current.filter((value) => value !== "optimizer");
      if (withoutOptimizer.length >= 3) {
        return withoutOptimizer;
      }

      return [...withoutOptimizer, optionId];
    });
  }

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar value={progress} />
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-eonic-border text-eonic-text-2 transition hover:border-eonic-border-active hover:text-eonic-text"
          aria-label="Go back"
        >
          ←
        </button>
        <p className="text-sm text-eonic-text-muted">Q{questionIndex} of {questionTotal}</p>
      </div>

      <div className="mt-12">
        <h1 className="text-center font-display text-4xl leading-tight text-balance text-eonic-text md:text-5xl">
          {question.text}
        </h1>

        <div className="mt-10 grid gap-4">
          {question.options.map((option) => {
            const selected = selections.includes(option.id);
            const disabled = !selected && disabledOptions.has(option.id);

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSelection(option.id)}
                disabled={disabled}
                className={cn(
                  "flex min-h-[76px] w-full items-center justify-between gap-4 rounded-card border px-5 py-4 text-left transition",
                  selected
                    ? "border-eonic-border-active bg-eonic-teal/10 text-eonic-text"
                    : "border-eonic-border bg-eonic-surface text-eonic-text-2 hover:border-eonic-border-active hover:bg-eonic-teal/5 hover:text-eonic-text",
                  disabled ? "cursor-not-allowed opacity-45 hover:border-eonic-border hover:bg-eonic-surface hover:text-eonic-text-2" : "",
                )}
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 text-lg text-eonic-gold">{selected ? "✓" : "○"}</span>
                  <span className="text-base leading-7">{option.text}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between text-sm text-eonic-text-muted">
          <span>{hasOptimizer ? "Optimizer path selected" : `Pick up to 3 areas (${symptomSelections.length}/3 selected)`}</span>
          {hasOptimizer ? null : <span>{symptomSelections.length === 3 ? "Maximum selected" : "You can deselect anytime"}</span>}
        </div>

        <Button className="mt-8 w-full" onClick={() => onSubmit(selections)} disabled={selections.length === 0}>
          Continue
        </Button>
      </div>
    </div>
  );
}
