"use client";

import { AnswerOption } from "@/components/quiz/AnswerOption";
import { ProgressBar } from "@/components/quiz/ProgressBar";
import type { QuizQuestion, StoredAnswer } from "@/lib/quiz/types";

interface QuestionCardProps {
  question: QuizQuestion;
  questionIndex: number;
  progress: number;
  selected?: StoredAnswer;
  onBack: () => void;
  onAnswer: (answer: StoredAnswer) => void;
}

export function QuestionCard({
  question,
  questionIndex,
  progress,
  selected,
  onBack,
  onAnswer,
}: QuestionCardProps) {
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
        <p className="text-sm text-eonic-text-muted">Q{questionIndex} of 36</p>
      </div>

      <div className="mt-12">
        <h1 className="text-center font-display text-4xl leading-tight text-balance text-eonic-text md:text-5xl">
          {question.text}
        </h1>

        <div className="mt-10 space-y-4">
          {question.options.map((option) => (
            <AnswerOption
              key={option.id}
              option={{
                id: option.id,
                text: option.text,
                score: option.score ?? 0,
                flags: option.flag ? [option.flag] : undefined,
              }}
              selected={selected?.id === option.id}
              onSelect={onAnswer}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
