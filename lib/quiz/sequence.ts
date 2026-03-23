import type { ClusterKey, TriageSelections } from "@/lib/quiz/types";

const TRIAGE_STEPS = ["QT1", "QT2", "QT3"];
const CLUSTER_ORDER: ClusterKey[] = ["energy", "focus", "stress", "sleep", "gut", "metabolic"];
const CLUSTER_QUESTION_IDS: Record<ClusterKey, string[]> = {
  energy: ["QE1", "QE2", "QE3", "QE4", "QE5", "QEP"],
  focus: ["QF1", "QF2", "QF3", "QF4", "QF5", "QFP"],
  stress: ["QS1", "QS2", "QS3", "QS4", "QS5", "QSP"],
  sleep: ["QSL1", "QSL2", "QSL3", "QSL4", "QSL5", "QSLP"],
  gut: ["QG1", "QG2", "QG3", "QG4", "QGP"],
  metabolic: ["QM1", "QM2", "QM3", "QM4", "QM5", "QMP"],
};

export const optimizerSequence: string[] = ["QE2", "QE4", "QF1", "QF3", "QS3", "QS5", "QSL3", "QSL4", "QG1", "QG4", "QM2", "QM4"];
const NON_QUESTION_STEPS = new Set([
  "TRIAGE_END",
  "CLUSTER_INTRO_ENERGY",
  "CLUSTER_INTRO_FOCUS",
  "CLUSTER_INTRO_STRESS",
  "CLUSTER_INTRO_SLEEP",
  "CLUSTER_INTRO_GUT",
  "CLUSTER_INTRO_METABOLIC",
  "INT_ENERGY",
  "INT_FOCUS",
  "INT_STRESS",
  "INT_SLEEP",
  "INT_GUT",
  "INT_METABOLIC",
  "LOADING",
]);

export const DEFAULT_SEQUENCE = TRIAGE_STEPS;

function normalizeSelections(selections: TriageSelections): ClusterKey[] {
  return CLUSTER_ORDER.filter((cluster) => selections.includes(cluster));
}

function clusterIntroId(cluster: ClusterKey) {
  return `CLUSTER_INTRO_${cluster.toUpperCase()}`;
}

function clusterInterstitialId(cluster: ClusterKey) {
  return `INT_${cluster.toUpperCase()}`;
}

export function buildAdaptiveSequence(triageSelections: TriageSelections): string[] {
  if (triageSelections.includes("optimizer")) {
    return [...TRIAGE_STEPS, ...optimizerSequence, "QDIET", "LOADING"];
  }

  const selectedClusters = normalizeSelections(triageSelections);
  if (selectedClusters.length === 0) {
    return [...DEFAULT_SEQUENCE];
  }

  const sequence: string[] = [...TRIAGE_STEPS, "TRIAGE_END"];

  selectedClusters.forEach((cluster, index) => {
    sequence.push(clusterIntroId(cluster));

    const questionIds = [...CLUSTER_QUESTION_IDS[cluster]];

    if (cluster === "gut" && selectedClusters.includes("metabolic")) {
      const mergedIndex = questionIds.indexOf("QG2");
      if (mergedIndex !== -1) {
        questionIds.splice(mergedIndex, 1);
      }
    }

    const probeId = questionIds.pop();
    sequence.push(...questionIds);

    if (index === 0) {
      sequence.push("QDIET");
    }

    if (probeId) {
      sequence.push(probeId);
    }

    sequence.push(clusterInterstitialId(cluster));
  });

  sequence.push("LOADING");
  return sequence;
}

export function getNextStep(currentStep: string, sequence: string[]): string | null {
  const idx = sequence.indexOf(currentStep);
  if (idx === -1 || idx === sequence.length - 1) {
    return null;
  }

  return sequence[idx + 1];
}

export function getPrevStep(currentStep: string, sequence: string[]): string | null {
  const idx = sequence.indexOf(currentStep);
  if (idx <= 0) {
    return null;
  }

  return sequence[idx - 1];
}

export function getPrevQuestionStep(currentStep: string, sequence: string[]): string | null {
  const idx = sequence.indexOf(currentStep);
  if (idx <= 0) {
    return null;
  }

  let prev = idx - 1;
  while (prev >= 0 && NON_QUESTION_STEPS.has(sequence[prev])) {
    prev -= 1;
  }

  return prev >= 0 ? sequence[prev] : null;
}

export function getProgressPercent(currentStep: string, sequence: string[]): number {
  const questionSteps = sequence.filter(isQuestionStep);
  const currentQuestionIndex = questionSteps.indexOf(currentStep);
  if (currentQuestionIndex === -1) {
    return 100;
  }

  return Math.round(((currentQuestionIndex + 1) / questionSteps.length) * 100);
}

export function getQuestionPosition(currentStep: string, sequence: string[]) {
  const questionSteps = sequence.filter(isQuestionStep);
  const currentQuestionIndex = questionSteps.indexOf(currentStep);

  return {
    index: currentQuestionIndex === -1 ? questionSteps.length : currentQuestionIndex + 1,
    total: questionSteps.length,
  };
}

export function isQuestionStep(step: string): boolean {
  return /^Q(?:T[123]|E(?:[1-5]|P)|F(?:[1-5]|P)|S(?:[1-5]|P|L(?:[1-5]|P))|G(?:[1-4]|P)|M(?:[1-5]|P)|DIET)$/.test(step);
}
