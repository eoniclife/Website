import { QuizStepClient } from "@/components/quiz/QuizStepClient";

export default function QuizStepPage({ params }: { params: { step: string } }) {
  return <QuizStepClient step={params.step} />;
}
