"use client";

import { useMemo, useState } from "react";
import { Brain, Leaf, Moon, Target, TrendingUp, Wind, Zap } from "lucide-react";
import { Button } from "@/components/shared/Button";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import { cn } from "@/lib/utils";
import type { QuizQuestion, TriageSelections } from "@/lib/quiz/types";

const CLUSTER_META = {
  energy: { icon: Zap, label: "Energy & recovery" },
  focus: { icon: Brain, label: "Cognitive performance" },
  stress: { icon: Wind, label: "Stress & mood" },
  sleep: { icon: Moon, label: "Sleep architecture" },
  gut: { icon: Leaf, label: "Gut & absorption" },
  metabolic: { icon: TrendingUp, label: "Metabolic function" },
} as const;

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
  const gridOptions = question.options.filter((option) => option.id !== "optimizer");
  const optimizerOption = question.options.find((option) => option.id === "optimizer");

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
        <h1 className="text-center font-heading text-4xl leading-tight text-balance text-eonic-text md:text-5xl">
          {question.text}
        </h1>

        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">
          {gridOptions.map((option) => {
            const meta = CLUSTER_META[option.id as keyof typeof CLUSTER_META];
            const selected = selections.includes(option.id);
            const disabled = !selected && disabledOptions.has(option.id);
            const Icon = meta?.icon ?? Zap;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => toggleSelection(option.id)}
                disabled={disabled}
                className={cn(
                  "flex flex-col items-start gap-3 rounded-card border p-5 text-left transition",
                  selected
                    ? "border-eonic-border-active bg-eonic-teal-dim text-eonic-text"
                    : "border-eonic-border bg-eonic-bg-2 text-eonic-text-2 hover:border-eonic-border-active hover:text-eonic-text",
                  disabled ? "cursor-not-allowed opacity-40" : "",
                )}
              >
                <span className={cn("transition", selected ? "text-eonic-teal" : "text-eonic-text-muted")}>
                  <Icon size={28} />
                </span>
                <div>
                  <p className="text-sm font-medium leading-tight text-eonic-text">{meta?.label ?? option.text}</p>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-eonic-text-muted">{option.text.replace(/^My \w+ — /, "")}</p>
                </div>
              </button>
            );
          })}
        </div>

        {optimizerOption ? (() => {
          const selected = selections.includes("optimizer");
          const disabled = !selected && disabledOptions.has("optimizer");

          return (
            <button
              key="optimizer"
              type="button"
              onClick={() => toggleSelection("optimizer")}
              disabled={disabled}
              className={cn(
                "mt-3 flex w-full items-center gap-4 rounded-card border px-5 py-4 text-left transition",
                selected
                  ? "border-eonic-border-active bg-eonic-teal-dim text-eonic-text"
                  : "border-eonic-border bg-eonic-bg-2 text-eonic-text-2 hover:border-eonic-border-active hover:text-eonic-text",
                disabled ? "cursor-not-allowed opacity-40" : "",
              )}
            >
              <span className={cn("flex-shrink-0 transition", selected ? "text-eonic-teal" : "text-eonic-text-muted")}>
                <Target size={22} />
              </span>
              <div>
                <p className="text-sm font-medium text-eonic-text">Optimizer path</p>
                <p className="mt-0.5 text-xs text-eonic-text-muted">{optimizerOption.text.replace(/^Everything's mostly fine — /, "")}</p>
              </div>
            </button>
          );
        })() : null}

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
