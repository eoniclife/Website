export interface QuizOption {
  id: string;
  text: string;
  icon?: string;
  score?: 0 | 1 | 2;
  flag?: string;
}

export interface QuizQuestion {
  id: string;
  cluster: string;
  text: string;
  options: QuizOption[];
}

export interface InterstitialContent {
  icon: string;
  headline: string;
  body: string;
}

export interface InterstitialDefinition {
  id: string;
  type: "interstitial";
  variant: "threshold" | "specific" | "metabolic-gut";
  cluster?: keyof DimensionScores;
  threshold?: number;
  specificCheck?: (answers: Record<string, StoredAnswer>) => boolean;
  contentHigh?: InterstitialContent;
  contentLow?: InterstitialContent;
  contentSpecific?: InterstitialContent;
  contentGeneral?: InterstitialContent;
  contentMetabolic?: InterstitialContent;
  contentGut?: InterstitialContent;
}

export interface StoredAnswer {
  id: string;
  text: string;
  score: 0 | 1 | 2;
  flags?: string[];
}

export interface DimensionScores {
  energy: number;
  focus: number;
  stress: number;
  sleep: number;
  metabolic: number;
  gut: number;
  recovery: number;
}

export interface RecommendationResult {
  scores: DimensionScores;
  archetype: string;
  primaryModule: string | null;
  secondaryModule: string | null;
  isVegetarian: boolean;
}
