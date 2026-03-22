export type ClusterKey = "energy" | "focus" | "stress" | "sleep" | "gut" | "metabolic";

export interface DimensionScores {
  energy: number;
  focus: number;
  stress: number;
  sleep: number;
  metabolic: number;
  gut: number;
  recovery: number;
}

export type DimensionMaxScores = DimensionScores;
export type TriageSelections = string[];

export interface QuizOption {
  id: string;
  text: string;
  icon?: string;
  score?: 0 | 1 | 2;
  flag?: string;
  dimensionOverrides?: Partial<DimensionScores>;
}

export interface QuizQuestion {
  id: string;
  cluster: string;
  text: string;
  options: QuizOption[];
  weights?: Partial<DimensionScores>;
}

export interface InterstitialContent {
  icon?: string;
  headline: string;
  body: string;
  kicker?: string;
}

export interface TransitionContent {
  headline: string;
  body: string;
}

export interface StoredAnswer {
  id: string;
  text: string;
  score: 0 | 1 | 2;
  flags?: string[];
  dimensionOverrides?: Partial<DimensionScores>;
}

export interface RecommendationResult {
  scores: DimensionScores;
  hiddenDimensions: string[];
  triageSelections: string[];
  archetype: string;
  primaryModule: string | null;
  secondaryModule: string | null;
  isVegetarian: boolean;
}
