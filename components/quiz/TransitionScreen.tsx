"use client";

import { ProgressBar } from "@/components/quiz/ProgressBar";
import type { TransitionContent } from "@/lib/quiz/types";

export function TransitionScreen({
  content,
  progress,
  onContinue,
}: {
  content: TransitionContent;
  progress: number;
  onContinue: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar value={progress} />
      <button
        type="button"
        onClick={onContinue}
        className="surface-panel mt-10 w-full rounded-[28px] px-8 py-14 text-center transition hover:border-eonic-border-active"
      >
        <p className="mx-auto max-w-2xl font-display text-4xl leading-tight text-balance text-eonic-text md:text-5xl">
          {content.headline}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-eonic-text-2">{content.body}</p>
        <p className="mt-8 text-sm uppercase tracking-[0.3em] text-eonic-text-muted">Tap to continue</p>
      </button>
    </div>
  );
}
