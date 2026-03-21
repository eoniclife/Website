"use client";

import { useEffect, useState } from "react";
import { ProgressBar } from "@/components/quiz/ProgressBar";

const steps = [
  "Mapping your energy pattern...",
  "Cross-referencing with Indian micronutrient data...",
  "Selecting your add-on module...",
  "Pulling research references...",
  "Building your protocol...",
];

export function LoadingScreen({
  onComplete,
  duration = 3000,
}: {
  onComplete: () => void;
  duration?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const stepDuration = duration / steps.length;
    const interval = window.setInterval(() => {
      setIndex((value) => Math.min(value + 1, steps.length - 1));
    }, stepDuration);
    const timeout = window.setTimeout(onComplete, duration);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [duration, onComplete]);

  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar value={100} />
      <div className="surface-panel mt-12 rounded-[28px] px-8 py-16 text-center">
        <div className="mx-auto flex max-w-xs items-center justify-between">
          {steps.map((_, stepIndex) => (
            <div
              key={stepIndex}
              className={`h-4 w-4 rounded-full transition ${stepIndex <= index ? "bg-eonic-teal shadow-glow-teal" : "bg-eonic-border"}`}
            />
          ))}
        </div>
        <p className="mt-10 text-xl text-eonic-text-2">{steps[index]}</p>
      </div>
    </div>
  );
}
