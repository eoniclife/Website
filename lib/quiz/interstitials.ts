import { calculateScores } from "@/lib/quiz/scoring";
import { buildAdaptiveSequence, isQuestionStep } from "@/lib/quiz/sequence";
import type { ClusterKey, InterstitialContent, StoredAnswer, TransitionContent, TriageSelections } from "@/lib/quiz/types";

const CLUSTER_LABELS: Record<ClusterKey, string> = {
  energy: "energy",
  focus: "focus",
  stress: "stress",
  sleep: "sleep",
  gut: "gut",
  metabolic: "metabolism",
};

const CLUSTER_INTROS: Record<ClusterKey, TransitionContent> = {
  energy: {
    headline: "First, let's look at how steady your energy actually is.",
    body: "The research says energy patterns are often clearer in the timing than in the severity.",
  },
  focus: {
    headline: "Now let's look at how your brain is holding up under real cognitive load.",
    body: "What's happening here is usually more biological than motivational.",
  },
  stress: {
    headline: "Now let's look at whether this is pressure you can recover from or a system that's staying activated.",
    body: "The distinction matters because the protocol changes depending on which pattern shows up.",
  },
  sleep: {
    headline: "Now let's look at whether sleep is the cause, the consequence, or both.",
    body: "Sleep quality affects almost everything else, but the pattern tells us where the loop starts.",
  },
  gut: {
    headline: "Let's look at whether digestion is part of the broader pattern.",
    body: "Gut issues rarely stay in the gut. They usually show up elsewhere first.",
  },
  metabolic: {
    headline: "Now let's look at how efficiently your system is actually converting fuel into usable energy.",
    body: "Post-meal patterns are often more specific than they seem.",
  },
};

function getClusterAreas(triageSelections: TriageSelections) {
  return triageSelections.filter((selection) => selection !== "optimizer").map((selection) => CLUSTER_LABELS[selection as ClusterKey] ?? selection);
}

function formatAreas(areas: string[]) {
  if (areas.length <= 1) {
    return areas[0] ?? "these areas";
  }

  if (areas.length === 2) {
    return `${areas[0]} and ${areas[1]}`;
  }

  return `${areas.slice(0, -1).join(", ")}, and ${areas.at(-1)}`;
}

export function getTransitionContent(step: string, triageSelections: TriageSelections): TransitionContent | null {
  if (step === "TRIAGE_END") {
    const selectionSet = new Set(triageSelections);
    const areas = getClusterAreas(triageSelections);
    const clusterCount = areas.length;

    let opening = "You've flagged several areas.";
    let insight =
      "That's more common than you'd think — most multi-system patterns trace back to 1–2 root causes. Let's find yours.";

    if (selectionSet.has("optimizer")) {
      opening = "You're starting from a strong position.";
      insight =
        "Optimization without a clear deficit is about precision — knowing exactly where your ceiling is and how to raise it.";
    } else if (clusterCount >= 3) {
      opening = "You've flagged several areas.";
      insight =
        "That's more common than you'd think — most multi-system patterns trace back to 1–2 root causes. Let's find yours.";
    } else if (selectionSet.has("energy") && selectionSet.has("focus")) {
      opening = "Energy and focus often come from the same place.";
      insight =
        "Cognitive performance and cellular energy production are tightly linked — addressing one usually moves the other.";
    } else if (selectionSet.has("stress") && selectionSet.has("sleep")) {
      opening = "Stress and sleep run in a loop.";
      insight = "Each one makes the other worse. Your protocol will need to address both ends to break it.";
    } else if (selectionSet.has("gut") && selectionSet.has("metabolic")) {
      opening = "Your gut and your metabolism are deeply connected.";
      insight =
        "The microbiome affects insulin sensitivity, energy conversion, and appetite signalling — more than most people realise.";
    } else if (selectionSet.has("focus") && selectionSet.has("stress")) {
      opening = "Cognitive fatigue and chronic stress share biology.";
      insight = "When the nervous system stays activated, the brain is one of the first things to suffer.";
    } else if (selectionSet.has("energy") && selectionSet.has("stress")) {
      opening = "Stress is one of the most common drivers of energy depletion.";
      insight =
        "Your adrenal system and your mitochondria are in a resource tug-of-war when both are under load.";
    } else if (selectionSet.has("sleep") && selectionSet.has("gut")) {
      opening = "Sleep and gut health influence each other more than you'd expect.";
      insight = "The gut produces melatonin precursors. Poor sleep alters the microbiome. It goes both ways.";
    }

    const questionCount = buildAdaptiveSequence(triageSelections).filter(
      (sequenceStep) => isQuestionStep(sequenceStep) && !["QT1", "QT2", "QT3"].includes(sequenceStep),
    ).length;
    const duration = triageSelections.includes("optimizer") ? "2" : clusterCount >= 3 ? "4" : "3";

    return {
      headline: opening,
      body: `${insight} We'll ask you ${questionCount} focused questions across ${formatAreas(areas)}. Most people finish in under ${duration} minutes.`,
    };
  }

  if (step.startsWith("CLUSTER_INTRO_")) {
    const cluster = step.replace("CLUSTER_INTRO_", "").toLowerCase() as ClusterKey;
    return CLUSTER_INTROS[cluster] ?? null;
  }

  return null;
}

function getClusterRatio(answers: Record<string, StoredAnswer>, cluster: ClusterKey) {
  const { scores, maxScores } = calculateScores(answers);
  const maxScore = maxScores[cluster];
  return maxScore > 0 ? scores[cluster] / maxScore : 0;
}

function hasOtherFlaggedClusters(triageSelections: TriageSelections, cluster: ClusterKey) {
  return triageSelections.filter((selection) => selection !== "optimizer" && selection !== cluster).length > 0;
}

export function getInterstitialContent(
  step: string,
  answers: Record<string, StoredAnswer>,
  triageSelections: TriageSelections,
): InterstitialContent | null {
  switch (step) {
    case "INT_ENERGY": {
      const ratio = getClusterRatio(answers, "energy");
      if (ratio >= 0.35) {
        return {
          headline: "The pattern you're describing makes biological sense.",
          body: "Afternoon crashes and waking up already tired are two of the clearest signals for subclinical B12, D3, or mitochondrial function issues. Since you flagged this as a priority, your protocol will address the root rather than the symptom.",
        };
      }

      return {
        headline: "Your energy baseline looks fairly stable.",
        body: triageSelections.includes("optimizer")
          ? "That's a useful data point. Optimization from a stable baseline is about precision rather than repair."
          : hasOtherFlaggedClusters(triageSelections, "energy")
            ? "That's a useful data point. We'll focus your protocol on what you did flag."
            : "That's a useful data point. We'll keep building the picture from here.",
      };
    }
    case "INT_FOCUS": {
      const ratio = getClusterRatio(answers, "focus");
      if (ratio >= 0.35) {
        return {
          headline: "This isn't a willpower or discipline problem.",
          body: "Brain fog and afternoon mental flatness are about acetylcholine signalling and cellular energy supply, not effort. The pattern you described is specific enough to address directly.",
        };
      }

      return {
        headline: "Your cognitive function reads as solid.",
        body: triageSelections.includes("optimizer")
          ? "We'll refine from here."
          : hasOtherFlaggedClusters(triageSelections, "focus")
            ? "That makes the other patterns you mentioned more likely to be the primary drivers."
            : "We'll refine from here.",
      };
    }
    case "INT_STRESS": {
      const ratio = getClusterRatio(answers, "stress");
      if (ratio >= 0.35) {
        return {
          headline: "Your nervous system is spending too much time in activation mode.",
          body: "The inability to switch off, slow recovery, and physical symptoms like tension or disrupted sleep aren't separate things — they're one pattern. We're almost there.",
        };
      }

      return {
        headline: "Your stress response looks well-regulated.",
        body: triageSelections.includes("optimizer")
          ? "A well-managed stress response is a significant performance asset — your protocol will protect it."
          : hasOtherFlaggedClusters(triageSelections, "stress")
            ? "We'll direct the protocol toward what you did flag."
            : "We'll build from here.",
      };
    }
    case "INT_SLEEP": {
      const ratio = getClusterRatio(answers, "sleep");
      if (answers.QSL2?.id === "often" && answers.QSLP?.id === "mood-patience") {
        return {
          headline: "Waking during the night and carrying it into the next day is a specific pattern.",
          body: "It usually points to stress-driven sleep disruption rather than a primary sleep issue. Your protocol will address that loop directly.",
        };
      }

      if (ratio >= 0.35) {
        return {
          headline: "Sleep quality affects more systems than most people realise.",
          body: "What you're describing has downstream effects on focus, stress recovery, and metabolism that go well beyond feeling tired.",
        };
      }

      return {
        headline: "Your sleep baseline looks reasonable.",
        body: "We'll build from here.",
      };
    }
    case "INT_GUT": {
      const ratio = getClusterRatio(answers, "gut");
      if (ratio >= 0.35) {
        return {
          headline: "Your gut signals are doing more downstream damage than the discomfort alone suggests.",
          body: "The gut-brain axis means what you described — bloating, post-meal fatigue, irregular digestion — typically shows up as energy dips, mood shifts, and immune vulnerability too. All of which are addressable.",
        };
      }

      return {
        headline: "Your gut function reads as relatively stable.",
        body: triageSelections.includes("optimizer")
          ? "A stable gut baseline is actually an advantage for the optimization work ahead."
          : hasOtherFlaggedClusters(triageSelections, "gut")
            ? "We'll prioritise what you flagged."
            : "We'll build from here.",
      };
    }
    case "INT_METABOLIC": {
      const ratio = getClusterRatio(answers, "metabolic");
      if (ratio >= 0.35) {
        return {
          headline: "Post-meal fatigue and weight changes often point to cellular energy efficiency, not just diet.",
          body: "When mitochondrial function is suboptimal, you feel it as that heavy, sluggish feeling after eating — your body is processing food but not converting it to usable energy cleanly. That's specific and addressable.",
        };
      }

      return {
        headline: "Your metabolic signals look relatively stable.",
        body: triageSelections.includes("optimizer")
          ? "Metabolic optimization from a stable base is about fine-tuning conversion efficiency, not correction."
          : hasOtherFlaggedClusters(triageSelections, "metabolic")
            ? "Noted — we'll direct the protocol accordingly."
            : "We'll build from here.",
      };
    }
    default:
      return null;
  }
}
