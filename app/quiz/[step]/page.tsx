import { QuizStepClient } from "@/components/quiz/QuizStepClient";

export default async function QuizStepPage({
  params,
}: {
  params: Promise<{ step: string }>;
}) {
  const { step } = await params;
  return <QuizStepClient step={step} />;
}
