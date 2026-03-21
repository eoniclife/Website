"use client";

import { motion } from "framer-motion";
import type { StoredAnswer } from "@/lib/quiz/types";
import { cn } from "@/lib/utils";

interface AnswerOptionProps {
  option: StoredAnswer;
  selected?: boolean;
  onSelect: (answer: StoredAnswer) => void;
}

export function AnswerOption({ option, selected, onSelect }: AnswerOptionProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.995 }}
      onClick={() => onSelect(option)}
      className={cn(
        "flex min-h-16 w-full items-center justify-between gap-4 rounded-card border px-5 py-4 text-left transition",
        selected
          ? "border-eonic-border-active bg-eonic-teal/10 text-eonic-text"
          : "border-eonic-border bg-eonic-surface text-eonic-text-2 hover:border-eonic-border-active hover:bg-eonic-teal/5 hover:text-eonic-text",
      )}
    >
      <div className="flex items-center gap-4">
        <span className="text-lg text-eonic-gold">{selected ? "✓" : "○"}</span>
        <span className="text-base">{option.text}</span>
      </div>
      <span className={cn("text-eonic-teal transition", selected ? "opacity-100" : "opacity-0 group-hover:opacity-100")}>→</span>
    </motion.button>
  );
}
