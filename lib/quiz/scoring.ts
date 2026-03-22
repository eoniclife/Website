import { questionsById } from "@/lib/quiz/questions";
import type {
  DimensionMaxScores,
  DimensionScores,
  RecommendationResult,
  StoredAnswer,
  TriageSelections,
} from "@/lib/quiz/types";

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

const THRESHOLD_RATIO = 0.35;
const DUAL_RATIO = 0.8;
const TRIAGE_DIMENSIONS = new Set(["energy", "focus", "stress", "sleep", "gut", "metabolic"]);
const PROBE_IDS = new Set(["QEP", "QFP", "QSP", "QSLP", "QGP", "QMP"]);

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

function getMaxOverrides(questionId: string) {
  const question = questionsById[questionId];
  const maxOverrides = emptyScores();

  if (!question) {
    return maxOverrides;
  }

  for (const option of question.options) {
    if (!option.dimensionOverrides) {
      continue;
    }

    for (const [dimension, value] of Object.entries(option.dimensionOverrides) as [keyof DimensionScores, number][]) {
      maxOverrides[dimension] = Math.max(maxOverrides[dimension], value);
    }
  }

  return maxOverrides;
}

export function calculateScores(answers: Record<string, StoredAnswer>): {
  scores: DimensionScores;
  maxScores: DimensionMaxScores;
  probeScores: DimensionScores;
} {
  const scores = emptyScores();
  const maxScores = emptyScores();
  const probeScores = emptyScores();

  for (const [questionId, answer] of Object.entries(answers)) {
    const question = questionsById[questionId];
    if (!question) {
      continue;
    }

    if (answer.dimensionOverrides) {
      const maxOverrides = getMaxOverrides(questionId);

      for (const [dimension, value] of Object.entries(answer.dimensionOverrides) as [keyof DimensionScores, number][]) {
        scores[dimension] += value;
        if (PROBE_IDS.has(questionId)) {
          probeScores[dimension] += value;
        }
      }

      for (const [dimension, value] of Object.entries(maxOverrides) as [keyof DimensionScores, number][]) {
        maxScores[dimension] += value;
      }

      continue;
    }

    const weights = question.weights ?? {};
    for (const [dimension, weight] of Object.entries(weights) as [keyof DimensionScores, number][]) {
      scores[dimension] += answer.score * weight;
      maxScores[dimension] += 2 * weight;
    }
  }

  return { scores, maxScores, probeScores };
}

export function determineModules(scores: DimensionScores, maxScores: DimensionMaxScores, answers: Record<string, Partial<StoredAnswer>>) {
  const isVegetarian = answers.QDIET?.flags?.includes("vegetarian") ?? false;
  const modules = Object.entries(MODULE_SCORE_KEYS)
    .map(([moduleId, key]) => ({
      moduleId,
      score: scores[key],
      ratio: maxScores[key] > 0 ? scores[key] / maxScores[key] : 0,
    }))
    .sort((a, b) => b.ratio - a.ratio);

  const top = modules[0];
  const second = modules[1];

  if (!top || top.ratio < THRESHOLD_RATIO) {
    return { primary: null, secondary: null, isVegetarian };
  }

  const hasDual =
    !!second && second.ratio >= THRESHOLD_RATIO && second.ratio >= top.ratio * DUAL_RATIO;

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

export function extractTriageSelections(answers: Record<string, StoredAnswer>): TriageSelections {
  return answers.QT3?.flags ?? [];
}

export function buildRecommendation(answers: Record<string, StoredAnswer>): RecommendationResult {
  const triageSelections = extractTriageSelections(answers);
  const { scores, maxScores, probeScores } = calculateScores(answers);
  const { primary, secondary, isVegetarian } = determineModules(scores, maxScores, answers);
  const archetype = assignArchetype(primary, secondary);
  const flaggedDimensions = new Set(triageSelections.filter((selection) => TRIAGE_DIMENSIONS.has(selection)));
  const hiddenDimensions = (Object.entries(probeScores) as [keyof DimensionScores, number][])
    .filter(([dimension, score]) => score >= 1 && !flaggedDimensions.has(dimension))
    .map(([dimension]) => dimension);

  return {
    scores,
    hiddenDimensions,
    triageSelections,
    archetype,
    primaryModule: primary,
    secondaryModule: secondary,
    isVegetarian,
  };
}
