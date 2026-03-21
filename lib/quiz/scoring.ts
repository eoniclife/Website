import type { DimensionScores, RecommendationResult, StoredAnswer } from "@/lib/quiz/types";

export const QUESTION_WEIGHTS: Record<string, Partial<DimensionScores>> = {
  Q4: { energy: 1 },
  Q5: { energy: 2, metabolic: 1 },
  Q6: { energy: 1 },
  Q7: { energy: 1, metabolic: 1 },
  Q8: { energy: 2, sleep: 1 },
  Q9: { energy: 1 },
  Q10: { energy: 2 },
  Q11: { focus: 2 },
  Q12: { focus: 2 },
  Q13: { focus: 1 },
  Q14: { focus: 2 },
  Q15: { focus: 1 },
  Q16: { focus: 2 },
  Q17: { stress: 2 },
  Q18: { stress: 2 },
  Q19: { stress: 1 },
  Q20: { stress: 1 },
  Q21: { stress: 2 },
  Q22: { stress: 1, sleep: 1 },
  Q23: { stress: 2 },
  Q24: { sleep: 2 },
  Q25: { sleep: 2 },
  Q26: { sleep: 1, stress: 1 },
  Q27: { sleep: 1 },
  Q28: { sleep: 2 },
  Q29: { sleep: 1 },
  Q30: { metabolic: 2 },
  Q31: { gut: 2 },
  Q32: {},
  Q33: { metabolic: 1 },
  Q34: { metabolic: 1 },
  Q35: { recovery: 2 },
  Q36: { gut: 1 },
};

export const MODULE_SCORE_KEYS: Record<string, keyof DimensionScores> = {
  MODULE_A_FOCUS: "focus",
  MODULE_B_METABOLIC: "metabolic",
  MODULE_C_STRESS: "stress",
  MODULE_D_GUT: "gut",
  MODULE_E_RECOVERY: "recovery",
};

export const ARCHETYPE_MAP: Record<string, string> = {
  "null|null": "FOUNDATION_BUILDER",
  "MODULE_A_FOCUS|null": "SHARPENED_MIND",
  "MODULE_B_METABOLIC|null": "METABOLIC_REBUILDER",
  "MODULE_C_STRESS|null": "RESILIENT_OPERATOR",
  "MODULE_D_GUT|null": "GUT_BRAIN_REBUILDER",
  "MODULE_E_RECOVERY|null": "REGENERATOR",
  "MODULE_A_FOCUS|MODULE_B_METABOLIC": "HIGH_PERFORMANCE_OPERATOR",
  "MODULE_A_FOCUS|MODULE_C_STRESS": "HIGH_PERFORMANCE_OPERATOR",
  "MODULE_A_FOCUS|MODULE_D_GUT": "HIGH_PERFORMANCE_OPERATOR",
  "MODULE_A_FOCUS|MODULE_E_RECOVERY": "HIGH_PERFORMANCE_OPERATOR",
  "MODULE_B_METABOLIC|MODULE_C_STRESS": "RESILIENT_OPERATOR",
  "MODULE_B_METABOLIC|MODULE_D_GUT": "SYSTEM_RESET",
  "MODULE_B_METABOLIC|MODULE_E_RECOVERY": "SYSTEM_RESET",
  "MODULE_C_STRESS|MODULE_D_GUT": "RECOVERY_ARCHITECT",
  "MODULE_C_STRESS|MODULE_E_RECOVERY": "RECOVERY_ARCHITECT",
  "MODULE_D_GUT|MODULE_E_RECOVERY": "SYSTEM_RESET",
};

export function emptyScores(): DimensionScores {
  return {
    energy: 0,
    focus: 0,
    stress: 0,
    sleep: 0,
    metabolic: 0,
    gut: 0,
    recovery: 0,
  };
}

export function calculateScores(answers: Record<string, Pick<StoredAnswer, "score">>): DimensionScores {
  const scores = emptyScores();

  for (const [questionId, answer] of Object.entries(answers)) {
    const weights = QUESTION_WEIGHTS[questionId];
    if (!weights || answer.score === undefined) {
      continue;
    }

    for (const [dimension, weight] of Object.entries(weights) as [keyof DimensionScores, number][]) {
      scores[dimension] += answer.score * weight;
    }
  }

  return scores;
}

export function determineModules(scores: DimensionScores, answers: Record<string, Partial<StoredAnswer>>) {
  const isVegetarian = answers.Q32?.id === "vegetarian";
  const modules = Object.entries(MODULE_SCORE_KEYS)
    .map(([moduleId, key]) => ({ moduleId, score: scores[key] }))
    .sort((a, b) => b.score - a.score);

  const top = modules[0];
  const second = modules[1];
  const threshold = 4;
  const dualRatio = 0.8;

  if (!top || top.score < threshold) {
    return { primary: null, secondary: null, isVegetarian };
  }

  const hasDual = second && second.score >= threshold && second.score >= top.score * dualRatio;

  return {
    primary: top.moduleId,
    secondary: hasDual ? second.moduleId : null,
    isVegetarian,
  };
}

export function assignArchetype(primary: string | null, secondary: string | null) {
  const [first, second] = [primary ?? "null", secondary ?? "null"].sort();
  return ARCHETYPE_MAP[`${first}|${second}`] ?? "FOUNDATION_BUILDER";
}

export function buildRecommendation(answers: Record<string, StoredAnswer>): RecommendationResult {
  const scores = calculateScores(answers);
  const { primary, secondary, isVegetarian } = determineModules(scores, answers);
  const archetype = assignArchetype(primary, secondary);

  return {
    scores,
    archetype,
    primaryModule: primary,
    secondaryModule: secondary,
    isVegetarian,
  };
}
