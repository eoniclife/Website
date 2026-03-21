export const QUIZ_SEQUENCE: string[] = [
  "Q1", "Q2", "Q3",
  "Q4", "Q5", "Q6", "Q7", "Q8", "Q9", "Q10",
  "INT1",
  "Q11", "Q12", "Q13", "Q14", "Q15", "Q16",
  "INT2",
  "Q17", "Q18", "Q19", "Q20", "Q21", "Q22", "Q23",
  "INT3",
  "Q24", "Q25", "Q26", "Q27", "Q28", "Q29",
  "INT4",
  "Q30", "Q31", "Q32", "Q33", "Q34", "Q35", "Q36",
  "INT5",
  "LOADING",
];

const NON_QUESTION_STEPS = new Set(["INT1", "INT2", "INT3", "INT4", "INT5", "LOADING"]);

export function getNextStep(currentStep: string): string | null {
  const idx = QUIZ_SEQUENCE.indexOf(currentStep);
  if (idx === -1 || idx === QUIZ_SEQUENCE.length - 1) {
    return null;
  }

  return QUIZ_SEQUENCE[idx + 1];
}

export function getPrevStep(currentStep: string): string | null {
  const idx = QUIZ_SEQUENCE.indexOf(currentStep);
  if (idx <= 0) {
    return null;
  }

  let prev = idx - 1;
  while (prev >= 0 && NON_QUESTION_STEPS.has(QUIZ_SEQUENCE[prev])) {
    prev -= 1;
  }

  return prev >= 0 ? QUIZ_SEQUENCE[prev] : null;
}

export function getProgressPercent(currentStep: string): number {
  const questionSteps = QUIZ_SEQUENCE.filter((step) => step.startsWith("Q"));
  const currentQuestionIndex = questionSteps.indexOf(currentStep);
  if (currentQuestionIndex === -1) {
    return 100;
  }

  return Math.round(((currentQuestionIndex + 1) / questionSteps.length) * 100);
}

export function isQuestionStep(step: string): boolean {
  return /^Q([1-9]|[12]\d|3[0-6])$/.test(step);
}
