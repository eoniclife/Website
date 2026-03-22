import type { RecommendationResult } from "@/lib/quiz/types";

interface InsightTemplate {
  whatWeFound: string;
  whyThisHappens: string;
  bridge: string;
}

const HIDDEN_DIMENSION_LINES: Record<string, string> = {
  sleep:
    "Your answers also pointed to a sleep quality pattern — not necessarily in duration, but in depth and recovery. Poor sleep is one of the most consistent amplifiers of everything else you described.",
  stress:
    "Your answers also showed a stress-response pattern that's likely compounding what you flagged. The nervous system being in a low-grade elevated state is a background tax on cognitive and physical performance.",
  focus:
    "Your answers also indicated cognitive fatigue patterns beyond what you flagged as primary. When energy or stress systems are under load, the brain is usually one of the first places it shows.",
  energy:
    "Your answers also showed energy patterns worth noting. Even without an acute crash, cellular energy efficiency affects recovery, focus, and resilience in ways that compound quietly.",
  gut:
    "Your answers also flagged some gut signals worth noting. The gut-brain axis means gut disruption often surfaces as fatigue or mood issues rather than obvious digestive symptoms.",
};

function getInsightTemplate(result: RecommendationResult): InsightTemplate {
  switch (result.archetype) {
    case "SHARPENED_MIND":
      return {
        whatWeFound:
          "Cognitive performance is the main pattern — difficulty locking in, afternoon mental flatness, and the effort it takes to do what used to feel automatic. This is real, and it's not a discipline problem.",
        whyThisHappens:
          "The most likely reasons are one or a combination of: sustained mental load depleting acetylcholine precursors over time; sleep that's not deep enough to complete overnight neural repair; or B-vitamin and choline levels that have drifted below optimal. These compound — poor sleep makes focus worse, and cognitive strain depletes the building blocks that focus depends on.",
        bridge:
          "Cognitive function responds well to targeted support. Most people notice a meaningful shift within 3–4 weeks. Your protocol prioritises this directly, alongside the stress and recovery factors that are likely feeding it.",
      };
    case "RESILIENT_OPERATOR":
      return {
        whatWeFound:
          "Your stress response is the dominant pattern. The difficulty switching off, the slow recovery from pressure, the physical tension — this is your nervous system spending too much time in high-alert mode rather than cycling properly between activation and recovery.",
        whyThisHappens:
          "This typically develops from sustained high-output work without adequate recovery blocks, a diet that's shifted toward convenience (particularly low in magnesium and B vitamins), or a sleep cycle that isn't deep enough to allow proper cortisol regulation overnight. Once the pattern locks in, it becomes self-reinforcing: stress disrupts sleep, poor sleep amplifies the stress response.",
        bridge:
          "You don't need to fix everything at once. Adaptogenic and mineral support can meaningfully reduce the physiological cost of stress while you work on the structural causes. That's the starting point — making the system less reactive so the longer-term changes have room to work.",
      };
    case "METABOLIC_REBUILDER":
      return {
        whatWeFound:
          "Your metabolic signals are the central story — post-meal fatigue, the body composition changes you mentioned, and the slower physical recovery all trace back to the same underlying pattern.",
        whyThisHappens:
          "The most likely cause is cellular energy inefficiency: your mitochondria are processing fuel but not converting it as cleanly as they should be. Processed food in the diet accelerates this by affecting insulin sensitivity and gut function. The afternoon crash that feels dietary is actually about how your cells are using the food — not just what you're eating.",
        bridge:
          "Metabolic function responds well to targeted nutritional support. CoQ10, B-complex, and magnesium work at the cellular level regardless of where your diet currently stands. Your protocol addresses this directly, and the lifestyle changes that help long-term — diet and movement — amplify what the protocol starts.",
      };
    case "GUT_BRAIN_REBUILDER":
      return {
        whatWeFound:
          "Gut function is the central pattern. What you described — bloating, post-meal discomfort, irregular digestion — isn't just a digestive inconvenience. Your gut microbiome is directly connected to energy production, immune regulation, and mood, and the downstream effects are probably showing up in areas you wouldn't immediately connect to digestion.",
        whyThisHappens:
          "The most common causes are microbiome disruption from a diet that's shifted toward processed or low-fibre foods, chronic stress affecting gut motility through the gut-brain axis, or the cumulative effect of periods of poor sleep or antibiotic use. These effects compound quietly over months before becoming noticeable.",
        bridge:
          "Rebuilding gut function is reliable when you're consistent — typically 8–12 weeks for meaningful change. Your protocol provides the specific probiotic and prebiotic support the research points to, and the dietary changes that reinforce it don't need to be dramatic to help.",
      };
    case "REGENERATOR":
      return {
        whatWeFound:
          "Your recovery capacity is the main signal — soreness that lingers longer than it should, physical fatigue that doesn't fully resolve with sleep, and the slow bounce-back from demanding days. Your output system is working; your repair system is lagging behind.",
        whyThisHappens:
          "This typically comes from one or a combination of: chronic low-grade inflammation from sustained stress or dietary factors; micronutrient gaps — particularly magnesium, zinc, and omega-3s — that are essential for tissue repair; or sleep that isn't deep enough to complete the cellular repair cycle fully. High-output people often deplete these faster than a standard diet replaces them.",
        bridge:
          "Recovery support is one of the most direct and well-evidenced areas for supplementation. The building blocks your body needs for repair are specific and your protocol targets them precisely. Most people in this pattern notice physical improvement within 4–6 weeks.",
      };
    case "HIGH_PERFORMANCE_OPERATOR": {
      const secondaryLabel =
        result.secondaryModule === "MODULE_C_STRESS"
          ? "stress"
          : result.secondaryModule === "MODULE_D_GUT"
            ? "gut"
            : result.secondaryModule === "MODULE_E_RECOVERY"
              ? "recovery"
              : "energy";

      return {
        whatWeFound: `You're running a high-output system and it's showing the cumulative cost. The cognitive fatigue and ${secondaryLabel} pattern you described aren't separate problems — they're the same system under sustained pressure from multiple directions.`,
        whyThisHappens:
          "High-performers often hit a compounding pattern: the brain consumes more energy under sustained cognitive load, depleting the same nutrients that support stress recovery, physical energy, and immune function. The body starts prioritising immediate output and deferring repair. What looks like a focus problem and an energy problem is often the same depletion, surfacing in two places.",
        bridge:
          "Your protocol is built for exactly this pattern — it addresses the foundation systems that feed multiple outputs simultaneously, rather than treating each symptom separately. When the foundation improves, several things tend to move at once.",
      };
    }
    case "RECOVERY_ARCHITECT": {
      const secondaryLabel = result.secondaryModule === "MODULE_D_GUT" ? "gut" : "recovery";
      const linkedPattern =
        secondaryLabel === "gut"
          ? "can't-switch-off + gut disruption"
          : "slow recovery + persistent tension";

      return {
        whatWeFound: `Your stress and ${secondaryLabel} patterns are linked in a specific way. The ${linkedPattern} you described typically comes from the same source.`,
        whyThisHappens:
          "Chronic stress directly impairs gut function through the gut-brain axis — cortisol alters gut motility, microbiome composition, and gut permeability. Going the other way, an inflamed gut amplifies stress reactivity. Similarly, elevated cortisol disrupts overnight tissue repair. These systems reinforce each other, which is why improving one from a single angle rarely holds.",
        bridge:
          "Your protocol addresses both ends simultaneously, which is the only way to reliably break the loop. The compounding also works in reverse — when one improves, the other tends to follow faster than it would alone.",
      };
    }
    case "SYSTEM_RESET":
      return {
        whatWeFound:
          "Multiple systems are flagging at once. What you described across digestion, metabolism, and recovery points to something more foundational than any single issue — the base layer has been running below optimal for a while.",
        whyThisHappens:
          "This pattern usually means the foundation — gut health, cellular energy production, and micronutrient status — has been quietly depleted over time. Sustained stress, a diet that's shifted toward convenience, or periods of poor sleep can each accelerate this, and when the foundation goes, multiple systems surface symptoms simultaneously.",
        bridge:
          "There's significant leverage in addressing a system-level pattern. When the foundation improves, multiple things move together. Your protocol is built around that reset logic — the base layer first, then the specific modules on top.",
      };
    default:
      return result.triageSelections.includes("optimizer")
        ? {
            whatWeFound:
              "You're starting from a strong baseline. Nothing here suggests a dramatic deficit — what we see instead is room for cleaner output, steadier recovery, and more precise support than a generic stack can offer.",
            whyThisHappens:
              "When things are mostly fine, the useful work is usually about small inefficiencies: a little less cognitive sharpness than you'd like, recovery that isn't quite complete, or energy that is good but not fully stable. These are usually easier to move than obvious dysfunction because the foundation is already there.",
            bridge:
              "The good news is that optimization from a stable base responds well to specificity. Your protocol is built to raise the ceiling without treating you like you're starting from a deficit.",
          }
        : {
            whatWeFound:
              "Your systems are functioning well — no acute deficits across the areas we looked at. What you're experiencing is more likely baseline drift: the slow accumulation of high-output living without matched recovery investment.",
            whyThisHappens:
              "High-functioning people often ignore low-grade signals — the slightly slower morning starts, the 4pm dip that's manageable but present — until they compound into something harder to ignore. It's not dysfunction; it's a baseline that's been running slightly undercharged for a while.",
            bridge:
              "Your starting point is strong. What your protocol addresses is optimization and protection — shoring up the foundations before small deficits become real ones. People at your baseline tend to notice the difference earlier and more clearly than those coming from a deeper deficit.",
          };
      }
}

export function InsightLayer({ recommendation }: { recommendation: RecommendationResult }) {
  const content = getInsightTemplate(recommendation);
  const hiddenDimensionLines = recommendation.hiddenDimensions
    .map((dimension) => HIDDEN_DIMENSION_LINES[dimension])
    .filter(Boolean);

  return (
    <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-7 py-8">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">What we found</p>
      <div className="mt-5 space-y-6">
        <div>
          <h2 className="font-display text-3xl text-eonic-text">What we found</h2>
          <p className="mt-3 text-base leading-8 text-eonic-text-2">{content.whatWeFound}</p>
        </div>
        <div>
          <h2 className="font-display text-3xl text-eonic-text">Why this is happening</h2>
          <p className="mt-3 text-base leading-8 text-eonic-text-2">{content.whyThisHappens}</p>
        </div>

        {hiddenDimensionLines.length > 0 ? (
          <div className="rounded-card border border-eonic-border bg-eonic-surface px-5 py-5">
            <p className="font-mono text-sm uppercase tracking-[0.2em] text-eonic-gold">One more thing we picked up</p>
            <div className="mt-3 space-y-3">
              {hiddenDimensionLines.map((line) => (
                <p key={line} className="text-base leading-8 text-eonic-text-2">
                  {line}
                </p>
              ))}
            </div>
          </div>
        ) : null}

        <div>
          <h2 className="font-display text-3xl text-eonic-text">The good news</h2>
          <p className="mt-3 text-base leading-8 text-eonic-text-2">{content.bridge}</p>
        </div>
      </div>
    </section>
  );
}
