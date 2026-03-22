import { archetypes } from "@/lib/recommendation/archetypes";
import { modules } from "@/lib/recommendation/modules";
import type { RecommendationResult } from "@/lib/quiz/types";

type GroupKind = "foundation" | "archetype" | "module";

interface IngredientContext {
  archetype: string;
  modules: string[];
}

export interface ProtocolIngredientEntry {
  key: string;
  name: string;
  form: string;
  dose: string;
  timing: string;
  rationale: (context: IngredientContext) => string;
}

export interface ResolvedProtocolIngredient extends Omit<ProtocolIngredientEntry, "rationale"> {
  rationale: string;
}

export interface IngredientGroup {
  id: string;
  label: string;
  description: string;
  kind: GroupKind;
  ingredients: ResolvedProtocolIngredient[];
}

export interface CondensedIngredientSummary {
  items: ResolvedProtocolIngredient[];
  remainingCount: number;
}

const foundationIngredients: ProtocolIngredientEntry[] = [
  {
    key: "vitamin-d3-k2",
    name: "Vitamin D3 + K2",
    form: "2000IU D3 / 90mcg K2",
    dose: "1 softgel daily",
    timing: "Morning with food",
    rationale: () =>
      "Most adults are under-optimal here. D3 and K2 work together, and this is the baseline correction layer rather than a niche add-on.",
  },
  {
    key: "magnesium-glycinate",
    name: "Magnesium",
    form: "Glycinate",
    dose: "300mg daily",
    timing: "Evening",
    rationale: () =>
      "Magnesium is one of the most common gaps in high-output routines. The glycinate form is here specifically for steadier sleep quality and nervous-system recovery.",
  },
  {
    key: "b-complex",
    name: "B-Complex",
    form: "Methylated active forms",
    dose: "1 capsule daily",
    timing: "Morning",
    rationale: () =>
      "Active B vitamins support cellular energy production, and they get used up faster when work, training, or stress stay consistently high.",
  },
  {
    key: "omega-3",
    name: "Omega-3 EPA/DHA",
    form: "High-EPA fish oil",
    dose: "1000mg EPA+DHA daily",
    timing: "With food",
    rationale: () =>
      "This is the anti-inflammatory baseline. EPA and DHA support brain structure, joint recovery, and cardiovascular function at the same time.",
  },
];

const archetypeIngredients: Record<string, ProtocolIngredientEntry[]> = {
  FOUNDATION_BUILDER: [
    {
      key: "creatine-monohydrate",
      name: "Creatine",
      form: "Monohydrate",
      dose: "3g daily",
      timing: "Morning or post-workout",
      rationale: () =>
        "Your pattern looks more like missed fundamentals than a single dramatic weakness. Creatine supports day-to-day energy availability and cognitive output specifically.",
    },
    {
      key: "curcumin-phytosome",
      name: "Curcumin",
      form: "Phytosome complex",
      dose: "500mg daily",
      timing: "With lunch",
      rationale: () =>
        "This keeps the baseline stack from being purely nutritional. Curcumin adds a researched anti-inflammatory layer when the goal is to feel consistently good, not just less deficient.",
    },
  ],
  SHARPENED_MIND: [
    {
      key: "citicoline",
      name: "Citicoline",
      form: "CDP-Choline",
      dose: "250mg daily",
      timing: "Morning",
      rationale: () =>
        "Your answers point to a cognition-first pattern. Citicoline is here specifically for cleaner mental energy, attention quality, and recall under load.",
    },
    {
      key: "lions-mane",
      name: "Lion's Mane",
      form: "Dual-extract fruiting body",
      dose: "500mg daily",
      timing: "Morning",
      rationale: () =>
        "This archetype needs more than a stimulant feel. Lion's mane is included because the research points to longer-horizon support for cognitive maintenance and mental sharpness.",
    },
  ],
  METABOLIC_REBUILDER: [
    {
      key: "coq10-ubiquinol",
      name: "CoQ10",
      form: "Ubiquinol",
      dose: "100mg daily",
      timing: "Morning with food",
      rationale: () =>
        "Your energy pattern looks cellular rather than motivational. Ubiquinol supports mitochondrial energy production, which is exactly where this archetype tends to drag.",
    },
    {
      key: "chromium-picolinate",
      name: "Chromium",
      form: "Picolinate",
      dose: "200mcg daily",
      timing: "With your largest meal",
      rationale: () =>
        "This archetype often flags steadier energy after food as the real issue. Chromium is here to support glucose handling rather than force a temporary lift.",
    },
  ],
  RESILIENT_OPERATOR: [
    {
      key: "rhodiola-rosea",
      name: "Rhodiola",
      form: "3% rosavins extract",
      dose: "200mg daily",
      timing: "Morning",
      rationale: () =>
        "You can keep going, but the cost is showing up in your stress load. Rhodiola is here specifically to support output without leaning on a wired feeling.",
    },
    {
      key: "phosphatidylserine",
      name: "Phosphatidylserine",
      form: "Sunflower-derived",
      dose: "100mg daily",
      timing: "Evening",
      rationale: () =>
        "This archetype usually needs better downshift, not more force. Phosphatidylserine is included because the research points to a steadier cortisol response under chronic pressure.",
    },
  ],
  GUT_BRAIN_REBUILDER: [
    {
      key: "probiotic-complex",
      name: "Probiotic Complex",
      form: "Multi-strain 10B CFU",
      dose: "1 capsule daily",
      timing: "Morning before food",
      rationale: () =>
        "Your pattern suggests digestion and broader daily function are moving together. A broad-spectrum probiotic is here to rebuild that base rather than chase symptoms one by one.",
    },
    {
      key: "l-glutamine",
      name: "L-Glutamine",
      form: "Pure powder",
      dose: "3g daily",
      timing: "Evening away from meals",
      rationale: () =>
        "This archetype often needs gut-lining support, not just microbiome support. L-glutamine is included specifically for that repair-oriented role.",
    },
  ],
  REGENERATOR: [
    {
      key: "glycine",
      name: "Glycine",
      form: "Fermented amino acid",
      dose: "3g nightly",
      timing: "Night",
      rationale: () =>
        "Your output is outrunning your recovery. Glycine is here specifically because better sleep depth is usually the fastest way to change how this archetype feels.",
    },
    {
      key: "shilajit",
      name: "Shilajit",
      form: "High-fulvic extract",
      dose: "250mg daily",
      timing: "Morning",
      rationale: () =>
        "This archetype needs more than bedtime support. Shilajit adds a recovery-and-vitality layer aimed at helping you reload between demanding days.",
    },
  ],
  HIGH_PERFORMANCE_OPERATOR: [
    {
      key: "citicoline",
      name: "Citicoline",
      form: "CDP-Choline",
      dose: "250mg daily",
      timing: "Morning",
      rationale: () =>
        "You are carrying high demand and still trying to stay sharp. Citicoline is here to support cleaner focus without pretending stress is not part of the picture.",
    },
    {
      key: "rhodiola-rosea",
      name: "Rhodiola",
      form: "3% rosavins extract",
      dose: "200mg daily",
      timing: "Morning",
      rationale: () =>
        "This archetype needs stress resilience and cognitive steadiness at the same time. Rhodiola is included specifically for that overlap.",
    },
  ],
  SYSTEM_RESET: [
    {
      key: "berberine-hcl",
      name: "Berberine",
      form: "HCl",
      dose: "500mg daily",
      timing: "With your largest meal",
      rationale: () =>
        "Your answers suggest metabolic and digestive friction are feeding each other. Berberine is here because the research points to support for that exact loop.",
    },
    {
      key: "probiotic-complex",
      name: "Probiotic Complex",
      form: "Multi-strain 10B CFU",
      dose: "1 capsule daily",
      timing: "Morning before food",
      rationale: () =>
        "System reset needs both sides addressed. This probiotic layer is included because better gut signaling can make the rest of the protocol land more effectively.",
    },
  ],
  RECOVERY_ARCHITECT: [
    {
      key: "glycine",
      name: "Glycine",
      form: "Fermented amino acid",
      dose: "3g nightly",
      timing: "Night",
      rationale: () =>
        "Your pattern looks like stress and sleep are feeding each other. Glycine is here specifically to improve the quality of recovery, not just sleep onset.",
    },
    {
      key: "apigenin",
      name: "Apigenin",
      form: "Chamomile-derived extract",
      dose: "50mg nightly",
      timing: "Night",
      rationale: () =>
        "This archetype often feels tired but not fully downshifted. Apigenin is included for a calmer evening transition without blunt sedation.",
    },
  ],
};

const moduleIngredients: Record<string, ProtocolIngredientEntry[]> = {
  MODULE_A_FOCUS: [
    {
      key: "bacopa-monnieri",
      name: "Bacopa Monnieri",
      form: "45% bacosides",
      dose: "300mg daily",
      timing: "Morning with food",
      rationale: ({ modules }) =>
        `You specifically flagged a focus-heavy pattern, and ${getModuleCopy(modules, "MODULE_A_FOCUS")} points to memory consolidation and calmer attention rather than a quick stimulant effect.`,
    },
    {
      key: "l-theanine",
      name: "L-Theanine",
      form: "Pure amino acid",
      dose: "200mg daily",
      timing: "Morning or before demanding work",
      rationale: ({ modules }) =>
        `This sits in the focus add-on because ${getModuleCopy(modules, "MODULE_A_FOCUS")} often benefits from smoother attention control, not just more intensity.`,
    },
  ],
  MODULE_B_METABOLIC: [
    {
      key: "berberine-hcl",
      name: "Berberine",
      form: "HCl",
      dose: "500mg daily",
      timing: "With your largest meal",
      rationale: ({ modules }) =>
        `${getModuleCopy(modules, "MODULE_B_METABOLIC")} usually means steadier post-meal energy matters. Berberine is here specifically for that metabolic support role.`,
    },
    {
      key: "alpha-lipoic-acid",
      name: "Alpha-Lipoic Acid",
      form: "Stabilised ALA",
      dose: "300mg daily",
      timing: "Evening away from meals",
      rationale: ({ modules }) =>
        `This rounds out the metabolic layer because ${getModuleCopy(modules, "MODULE_B_METABOLIC")} tends to need glucose support plus oxidative-stress support, not just one or the other.`,
    },
  ],
  MODULE_C_STRESS: [
    {
      key: "rhodiola-rosea",
      name: "Rhodiola",
      form: "3% rosavins extract",
      dose: "200mg daily",
      timing: "Morning",
      rationale: ({ modules }) =>
        `${getModuleCopy(modules, "MODULE_C_STRESS")} usually means your system is carrying load early in the day. Rhodiola is here to help output stay steadier under pressure.`,
    },
    {
      key: "phosphatidylserine",
      name: "Phosphatidylserine",
      form: "Sunflower-derived",
      dose: "100mg daily",
      timing: "Evening",
      rationale: ({ modules }) =>
        `This is the evening half of the stress module. ${getModuleCopy(modules, "MODULE_C_STRESS")} tends to need better downshift, not just better coping in the moment.`,
    },
  ],
  MODULE_D_GUT: [
    {
      key: "probiotic-complex",
      name: "Probiotic Complex",
      form: "Multi-strain 10B CFU",
      dose: "1 capsule daily",
      timing: "Morning before food",
      rationale: ({ modules }) =>
        `${getModuleCopy(modules, "MODULE_D_GUT")} usually means gut signaling is affecting more than digestion. The probiotic layer is here because the research points to broad downstream effects.`,
    },
    {
      key: "prebiotic-fiber",
      name: "Prebiotic Fiber",
      form: "Inulin + FOS",
      dose: "3g daily",
      timing: "Evening with food",
      rationale: ({ modules }) =>
        `A gut module works better when the beneficial strains are actually fed. This is here specifically to make the probiotic layer more durable over time.`,
    },
  ],
  MODULE_E_RECOVERY: [
    {
      key: "glycine",
      name: "Glycine",
      form: "Fermented amino acid",
      dose: "3g nightly",
      timing: "Night",
      rationale: ({ modules }) =>
        `${getModuleCopy(modules, "MODULE_E_RECOVERY")} usually means recovery depth is the issue, not effort. Glycine is included because better sleep architecture changes the whole stack.`,
    },
    {
      key: "shilajit",
      name: "Shilajit",
      form: "High-fulvic extract",
      dose: "250mg daily",
      timing: "Morning",
      rationale: ({ modules }) =>
        `This gives the recovery module a daytime counterpart. ${getModuleCopy(modules, "MODULE_E_RECOVERY")} often needs better reload capacity, not just a calmer evening.`,
    },
  ],
};

function getArchetypeName(archetypeId: string) {
  return archetypes[archetypeId]?.name ?? "your profile";
}

function getModuleName(moduleId: string) {
  return modules[moduleId]?.name ?? "this module";
}

function getModuleCopy(moduleIds: string[], preferredModuleId: string) {
  const names = moduleIds.map(getModuleName);
  const preferredName = getModuleName(preferredModuleId);

  if (names.length <= 1) {
    return preferredName;
  }

  if (names.includes(preferredName)) {
    return `${preferredName} within the broader ${names.join(" + ")} pattern`;
  }

  return names.join(" + ");
}

function resolveEntries(
  entries: ProtocolIngredientEntry[],
  context: IngredientContext,
): ResolvedProtocolIngredient[] {
  return entries.map(({ rationale, ...entry }) => ({
    ...entry,
    rationale: rationale(context),
  }));
}

export function getIngredientBreakdown(recommendation: RecommendationResult): IngredientGroup[] {
  const moduleIds = [recommendation.primaryModule, recommendation.secondaryModule].filter(
    (moduleId): moduleId is string => Boolean(moduleId),
  );
  const context: IngredientContext = {
    archetype: recommendation.archetype,
    modules: moduleIds,
  };

  const foundation = resolveEntries(foundationIngredients, context);
  const archetypeGroup = resolveEntries(archetypeIngredients[recommendation.archetype] ?? [], context);
  const moduleGroups = moduleIds.map((moduleId) => ({
    id: moduleId,
    kind: "module" as const,
    label: `For ${getModuleName(moduleId)}`,
    description: `These are the targeted add-ons for your ${getModuleName(moduleId).toLowerCase()} pattern.`,
    ingredients: resolveEntries(moduleIngredients[moduleId] ?? [], context),
  }));

  const moduleKeys = new Set(moduleGroups.flatMap((group) => group.ingredients.map((ingredient) => ingredient.key)));
  const archetypeKeys = new Set(archetypeGroup.map((ingredient) => ingredient.key));

  const groups: IngredientGroup[] = [
    {
      id: "foundation",
      kind: "foundation",
      label: "Foundation",
      description: "The baseline ingredients that stay in every 90-day protocol.",
      ingredients: foundation.filter((ingredient) => !moduleKeys.has(ingredient.key) && !archetypeKeys.has(ingredient.key)),
    },
    {
      id: "archetype",
      kind: "archetype",
      label: `For your ${getArchetypeName(recommendation.archetype)}`,
      description: "This is the part of the stack that reflects your dominant pattern, not just your general baseline.",
      ingredients: archetypeGroup.filter((ingredient) => !moduleKeys.has(ingredient.key)),
    },
    ...moduleGroups,
  ];

  return groups.filter((group) => group.ingredients.length > 0);
}

export function getCondensedIngredientSummary(
  recommendation: RecommendationResult,
  maxItems = 5,
): CondensedIngredientSummary {
  const groups = getIngredientBreakdown(recommendation).filter((group) => group.kind !== "module");
  const flattened = groups.flatMap((group) => group.ingredients);
  const items = flattened.slice(0, maxItems);

  return {
    items,
    remainingCount: Math.max(flattened.length - items.length, 0),
  };
}
