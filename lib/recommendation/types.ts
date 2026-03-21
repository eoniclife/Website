export interface ResearchCitation {
  citation: string;
  tested: string;
  found: string;
  meaning: string;
}

export interface Ingredient {
  name: string;
  dose: string;
  purpose: string;
  why: string;
  research: ResearchCitation;
  timing: string;
}

export interface ModuleDefinition {
  id: string;
  name: string;
  tagline: string;
  ingredients: Ingredient[];
}
