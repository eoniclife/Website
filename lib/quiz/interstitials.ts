import { calculateScores } from "@/lib/quiz/scoring";
import type { InterstitialDefinition, StoredAnswer } from "@/lib/quiz/types";

export const interstitials: Record<string, InterstitialDefinition> = {
  INT1: {
    id: "INT1",
    type: "interstitial",
    variant: "threshold",
    cluster: "energy",
    threshold: 8,
    contentHigh: {
      icon: "⚡",
      headline: "The pattern makes sense.",
      body: "Afternoon energy crashes and waking up already tired often point to subclinical B12 or D3 deficiency, or post-meal blood sugar instability. A few more questions will help narrow it down.",
    },
    contentLow: {
      icon: "✓",
      headline: "Your energy looks relatively stable.",
      body: "That's a solid baseline to work from. We'll look at focus, stress, and sleep to understand where there's room to sharpen things.",
    },
  },
  INT2: {
    id: "INT2",
    type: "interstitial",
    variant: "threshold",
    cluster: "focus",
    threshold: 6,
    contentHigh: {
      icon: "🧠",
      headline: "This isn't a willpower problem.",
      body: "Brain fog and afternoon mental fatigue are often about acetylcholine signaling and cellular energy production, not discipline. You're not imagining it. Let's keep building the picture.",
    },
    contentLow: {
      icon: "✓",
      headline: "Your cognitive function looks solid.",
      body: "We'll check a couple more areas to complete the picture.",
    },
  },
  INT3: {
    id: "INT3",
    type: "interstitial",
    variant: "threshold",
    cluster: "stress",
    threshold: 7,
    contentHigh: {
      icon: "🌿",
      headline: "Your nervous system is spending too much time in high-alert mode.",
      body: "The inability to switch off, slow recovery, and sleep disruption often come from the same root pattern. Almost there.",
    },
    contentLow: {
      icon: "✓",
      headline: "Your stress response looks well-managed.",
      body: "That's useful information. We'll focus your protocol elsewhere.",
    },
  },
  INT4: {
    id: "INT4",
    type: "interstitial",
    variant: "specific",
    specificCheck: (answers) => answers.Q25?.id === "often" && answers.Q26?.id === "mind-running",
    contentSpecific: {
      icon: "🌙",
      headline: "Waking with a running mind at 2–4am is a specific pattern.",
      body: "This often points to stress-driven sleep disruption rather than random restlessness. Your protocol will address that pattern directly.",
    },
    contentGeneral: {
      icon: "🌙",
      headline: "Your sleep quality is affecting more than you might realize.",
      body: "Sleep compounds and stress compounds are tightly linked. Your protocol will address both ends of it.",
    },
  },
  INT5: {
    id: "INT5",
    type: "interstitial",
    variant: "metabolic-gut",
    contentMetabolic: {
      icon: "⚙️",
      headline: "Post-meal fatigue is often about cellular energy production, not just diet.",
      body: "When your cells don't convert fuel to energy efficiently, you feel it as that heavy, crashing feeling after eating. It's measurable and addressable.",
    },
    contentGut: {
      icon: "🔬",
      headline: "Your gut affects far more than digestion.",
      body: "Bloating, unpredictability, and energy dips after food are often signs of an ecosystem that needs rebuilding. The downstream effects usually reach mood, immunity, and energy.",
    },
  },
};

export function getInterstitialContent(id: string, answers: Record<string, StoredAnswer>) {
  const definition = interstitials[id];
  if (!definition) {
    return null;
  }

  if (definition.variant === "threshold" && definition.cluster && definition.threshold !== undefined) {
    const scores = calculateScores(answers);
    return scores[definition.cluster] >= definition.threshold ? definition.contentHigh : definition.contentLow;
  }

  if (definition.variant === "specific") {
    return definition.specificCheck?.(answers) ? definition.contentSpecific : definition.contentGeneral;
  }

  const scores = calculateScores(answers);
  return scores.metabolic >= scores.gut ? definition.contentMetabolic : definition.contentGut;
}
