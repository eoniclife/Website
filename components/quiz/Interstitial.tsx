import { ProgressBar } from "@/components/quiz/ProgressBar";
import type { InterstitialContent } from "@/lib/quiz/types";

export function Interstitial({
  content,
  progress,
  onContinue,
}: {
  content: InterstitialContent;
  progress: number;
  onContinue: () => void;
}) {
  return (
    <div className="mx-auto max-w-3xl">
      <ProgressBar value={progress} />
      <div className="surface-panel mt-10 rounded-[28px] px-8 py-12 text-center">
        <div className="text-4xl">{content.icon}</div>
        <h1 className="mt-6 font-heading text-4xl text-eonic-text">{content.headline}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-eonic-text-2">{content.body}</p>
        <button
          type="button"
          onClick={onContinue}
          className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-button bg-eonic-teal px-6 py-3 text-sm font-medium text-eonic-bg shadow-glow-teal"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
