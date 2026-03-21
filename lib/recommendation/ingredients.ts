import type { Ingredient } from "@/lib/recommendation/types";

export const baseIngredients: Ingredient[] = [
  {
    name: "Vitamin D3 + K2 (MK-7)",
    dose: "2000 IU D3 + 100mcg K2",
    purpose: "Energy, immunity, hormone balance",
    why: "Indoor work and low sunlight exposure leave a large share of urban Indians running low on vitamin D. Correcting that baseline matters.",
    research: {
      citation: "Ritu & Gupta, Indian Journal of Community Medicine, 2014",
      tested: "Vitamin D status across 98 studies involving 25,787 Indian subjects",
      found: "Deficiency prevalence of 70–100% across age groups in India",
      meaning: "For many urban Indians, this is baseline correction rather than fine-tuning.",
    },
    timing: "AM — with food",
  },
  {
    name: "Methylcobalamin B12",
    dose: "500mcg",
    purpose: "Energy, nerve function, cognitive clarity",
    why: "B12 intake is often low in vegetarian-heavy diets. It supports nerve function and the specific kind of energy that sleep alone does not fix.",
    research: {
      citation: "Yajnik et al., British Journal of Nutrition, 2006",
      tested: "B12 status in urban Indian populations across dietary patterns",
      found: "Deficiency rates were materially higher in vegetarians",
      meaning: "Methylcobalamin is an active form used directly by the body.",
    },
    timing: "AM — with food",
  },
  {
    name: "Magnesium Glycinate",
    dose: "300mg elemental",
    purpose: "Sleep quality, stress recovery, muscle function",
    why: "Magnesium is involved in hundreds of enzymatic processes and often gets depleted under stress. The glycinate form is well tolerated.",
    research: {
      citation: "Abbasi et al., Journal of Research in Medical Sciences, 2012",
      tested: "Magnesium supplementation vs placebo on insomnia outcomes",
      found: "Sleep onset and quality improved in the supplementation group",
      meaning: "This is the PM anchor ingredient in the baseline stack.",
    },
    timing: "PM — in your evening sachet",
  },
  {
    name: "Omega-3 (EPA + DHA)",
    dose: "1g EPA/DHA combined",
    purpose: "Anti-inflammatory support, brain, cardiovascular",
    why: "Many diets are structurally low in omega-3. This supports systemic balance beyond one narrow outcome.",
    research: {
      citation: "Simopoulos, Nutrients, 2016",
      tested: "Population-level omega-6/omega-3 ratios and inflammatory outcomes",
      found: "Lower ratios were associated with better health outcomes",
      meaning: "This is a broad foundation ingredient rather than a narrow fix.",
    },
    timing: "AM — with food",
  },
  {
    name: "Ashwagandha KSM-66",
    dose: "600mg",
    purpose: "Stress resilience, recovery, hormonal balance",
    why: "This is one of the most studied ashwagandha extracts. It supports stress response calibration rather than simple sedation.",
    research: {
      citation: "Chandrasekhar et al., Indian Journal of Psychological Medicine, 2012",
      tested: "KSM-66 vs placebo in adults under chronic stress",
      found: "Stress scores and serum cortisol improved in the supplementation group",
      meaning: "Placed in the PM stack to support evening downshift and recovery.",
    },
    timing: "PM — in your evening sachet",
  },
  {
    name: "Zinc Bisglycinate",
    dose: "15mg elemental",
    purpose: "Immune function, endocrine support, antioxidant activity",
    why: "Zinc supports immune function and many enzymatic processes. The bisglycinate form is better absorbed than lower-quality forms.",
    research: {
      citation: "Prasad, Molecular Medicine, 2008",
      tested: "Zinc's role in immune function in deficient populations",
      found: "Deficiency directly impaired immune function",
      meaning: "Useful foundational support when diet intake is inconsistent.",
    },
    timing: "AM — with food",
  },
];
