import { Button } from "@/components/shared/Button";
import { Footer } from "@/components/shared/Footer";
import { Nav } from "@/components/shared/Nav";

const formRows = [
  {
    nutrient: "Magnesium",
    commonForm: "Oxide",
    recommendedForm: "Glycinate (sleep/stress) or Threonate (cognitive targets)",
    why: "Oxide absorbs at roughly 4%. Glycinate is well-absorbed and gut-gentle. Threonate crosses the blood-brain barrier — specifically selected for sleep and cognitive protocols.",
  },
  {
    nutrient: "Vitamin B12",
    commonForm: "Cyanocobalamin",
    recommendedForm: "Methylcobalamin",
    why: "Methylcobalamin is the active, pre-converted form — usable directly. Cyanocobalamin requires a conversion step that a meaningful proportion of people handle poorly due to a common MTHFR polymorphism.",
  },
  {
    nutrient: "Omega-3",
    commonForm: "Fish oil, ethyl ester form",
    recommendedForm: "Triglyceride form (algae-derived for vegetarians)",
    why: "Triglyceride-form omega-3 absorbs roughly 70% better than the cheaper ethyl ester form most commonly sold in India. Algae-derived provides equivalent EPA/DHA and is appropriate for vegetarian protocols.",
  },
  {
    nutrient: "Iron",
    commonForm: "Ferrous sulfate",
    recommendedForm: "Ferrous bisglycinate",
    why: "Bisglycinate absorbs 3–4x more efficiently than sulfate and causes significantly fewer GI side effects. GI intolerance is the primary reason most people stop taking iron supplements.",
  },
  {
    nutrient: "Vitamin D",
    commonForm: "D2 (ergocalciferol)",
    recommendedForm: "D3 (cholecalciferol)",
    why: "D3 raises serum 25(OH)D levels approximately twice as effectively as D2 at equivalent doses. This is well-established in clinical nutrition and not meaningfully disputed.",
  },
];

const markerCards = [
  {
    marker: "VITAMIN D",
    normal: '"Normal" threshold: > 20 ng/mL (flags deficiency)',
    target: "Functional target: 60–80 ng/mL",
    body: "Research on cognitive function, immune regulation, and mood consistently points to 60–80 ng/mL as the functional range. Most urban Indians who get tested land between 15–35 ng/mL. Technically not flagged as deficient. Not where you'd want to be.",
  },
  {
    marker: "VITAMIN B12",
    normal: '"Normal" threshold: > 200 pg/mL',
    target: "Functional target: > 400 pg/mL",
    body: 'Neurological research points to 400+ pg/mL for optimal nerve conduction and cognitive function. People between 200–400 pg/mL are "normal" on a standard lab report. Fatigue and brain fog in that range often resolve when levels are corrected.',
  },
  {
    marker: "MAGNESIUM",
    normal: "Note: Serum test is unreliable",
    target: "",
    body: "Serum magnesium is a poor proxy — only 1% of body magnesium circulates in the blood. RBC magnesium is more informative but rarely ordered. The practical result: functional depletion is common without a single test flagging it. Symptoms — poor sleep, muscle tension, stress sensitivity — appear before the number moves.",
  },
];

const clusters = [
  ["Energy & recovery", "Persistent low energy, post-exertion fatigue, slow physical recovery"],
  ["Cognitive performance", "Focus difficulty, mental fatigue, memory and processing speed"],
  ["Stress & mood", "Chronic stress load, anxiety patterns, emotional regulation"],
  ["Sleep architecture", "Trouble falling asleep, non-restorative sleep, circadian disruption"],
  ["Gut & absorption", "Digestive irregularity, bloating, absorption signals"],
  ["Metabolic function", "Blood sugar patterns, weight regulation, hormonal balance signals"],
];

const modelItems = [
  "We don't have house blends with hidden doses. Every ingredient, its form, its dose, and its rationale is visible on your protocol page.",
  "We don't inflate the protocol. The quiz gates what goes in. An ingredient only appears if the logic that generated your protocol selected it specifically.",
  "We don't have financial relationships with ingredient suppliers. The formulation decisions are based on research evidence, not margin.",
  "We don't claim the quiz is equivalent to bloodwork. It produces a strong starting baseline. A version that incorporates biomarker data is in development — we'll be explicit about what that version can and can't tell you when it exists.",
];

export default function SciencePage() {
  return (
    <main className="min-h-screen bg-eonic-bg text-eonic-text">
      <Nav />
      <div className="mx-auto max-w-7xl space-y-20 px-5 py-12 md:px-8 md:py-16">
        <section className="max-w-4xl space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE RESEARCH</p>
          <h1 className="font-display text-5xl text-eonic-text md:text-7xl">What we looked at before recommending anything.</h1>
          <p className="max-w-3xl text-lg leading-8 text-eonic-text-2">
            Most supplement advice is calibrated for a global average person. Urban Indian physiology has specific patterns —
            different deficiency rates, different dietary baselines, different stressors. We started there rather than
            adapting something designed elsewhere.
          </p>
        </section>

        <section className="max-w-5xl space-y-6">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE BASELINE PROBLEM</p>
          <h2 className="font-display text-4xl text-eonic-text md:text-5xl">The person most supplements were designed for is not you.</h2>
          <div className="space-y-5 text-base leading-8 text-eonic-text-2">
            <p>
              Standard supplement recommendations are derived largely from research on Western populations with different
              dietary patterns, different sun exposure profiles, and different baseline micronutrient levels. When that
              research gets turned into product formulations, those assumptions come with it.
            </p>
            <p>
              Three deficiencies show up reliably in urban Indian populations at rates significantly higher than global
              averages. Vitamin D deficiency affects an estimated 70–100% of urban Indians across age groups — not because
              India lacks sun, but because office hours, pollution-filtered UVB, and high-SPF use mean that sun exposure
              doesn&apos;t translate to synthesis the way it&apos;s assumed to. B12 deficiency is structurally elevated in any
              population with a large vegetarian proportion. Magnesium depletion accelerates under chronic stress and is
              frequently missed because serum magnesium is a poor proxy for cellular magnesium.
            </p>
            <p>Starting from these facts changes the baseline. And the baseline changes the protocol.</p>
          </div>
          <p className="text-sm text-eonic-text-muted">
            Ritu &amp; Gupta, Indian Journal of Community Medicine, 2014 — Vitamin D status across 25,787 Indian subjects.
            Deficiency prevalence: 70–100% across age groups.
          </p>
        </section>

        <section className="space-y-6">
          <div className="max-w-5xl space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE FORM PROBLEM</p>
            <h2 className="font-display text-4xl text-eonic-text md:text-5xl">The ingredient matters. The form of it matters more.</h2>
            <p className="text-base leading-8 text-eonic-text-2">
              Two products can both list &quot;Magnesium 300mg&quot; on the label and deliver completely different outcomes based on
              which magnesium compound is in the capsule. Absorption rates, tolerability, and target tissue differ
              significantly across forms. We specify the form for every ingredient in the protocol and select for the form
              with the best evidence profile for that use case.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-1">
            {formRows.map((row) => (
              <article
                key={row.nutrient}
                className="surface-panel rounded-card p-5 xl:grid xl:grid-cols-[0.9fr_0.9fr_1.2fr_2.2fr] xl:items-start xl:gap-6"
              >
                <div>
                  <p className="font-mono text-sm text-eonic-teal">{row.nutrient}</p>
                </div>
                <div className="mt-3 xl:mt-0">
                  <p className="text-sm text-eonic-text-muted">Common form sold</p>
                  <p className="mt-1 text-base text-eonic-text-2">{row.commonForm}</p>
                </div>
                <div className="mt-3 xl:mt-0">
                  <p className="text-sm text-eonic-text-muted">What we use</p>
                  <p className="mt-1 text-base text-eonic-text">{row.recommendedForm}</p>
                </div>
                <div className="mt-3 xl:mt-0">
                  <p className="text-sm text-eonic-text-muted">Why it matters</p>
                  <p className="mt-1 text-sm leading-7 text-eonic-text-2">{row.why}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-5xl space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE NUMBERS PROBLEM</p>
            <h2 className="font-display text-4xl text-eonic-text md:text-5xl">
              Lab &quot;normal&quot; and physiologically optimal are not the same number.
            </h2>
            <p className="text-base leading-8 text-eonic-text-2">
              Lab reference ranges tell you whether you&apos;re deficient enough to be symptomatic. They don&apos;t tell you where
              you&apos;d actually function well. This gap — between &quot;not technically deficient&quot; and &quot;running at a reasonable
              level&quot; — is where most people sit, and where most supplement advice misses.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {markerCards.map((card) => (
              <article key={card.marker} className="surface-panel rounded-card p-6">
                <p className="font-mono text-sm text-eonic-teal">{card.marker}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-2xl text-eonic-text">{card.normal}</p>
                  {card.target ? <p className="text-2xl text-eonic-gold">{card.target}</p> : null}
                </div>
                <p className="mt-5 text-sm leading-7 text-eonic-text-2">{card.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-5xl space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE ADAPTIVE QUIZ</p>
            <h2 className="font-display text-4xl text-eonic-text md:text-5xl">Symptoms point to patterns. The quiz maps the pattern.</h2>
            <div className="space-y-5 text-base leading-8 text-eonic-text-2">
              <p>
                Low energy can originate from iron deficiency, thyroid dysregulation, chronic stress, poor sleep
                architecture, or gut absorption problems. Supplementing for the wrong root cause doesn&apos;t help. The
                adaptive quiz identifies co-occurring signals across six pattern clusters and routes accordingly. What you
                flag shapes which questions you see. Which questions you see shapes which ingredients make it into the
                protocol.
              </p>
              <p>
                The quiz is 5–15 questions depending on where your answers point. Users who aren&apos;t flagging specific
                symptom clusters get a distinct, shorter optimization path rather than being walked through irrelevant
                sections.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {clusters.map(([title, body]) => (
              <article key={title} className="surface-panel rounded-card p-5">
                <h3 className="text-lg text-eonic-text">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-eonic-text-2">{body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="max-w-5xl space-y-5">
            <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">THE MODEL</p>
            <h2 className="font-display text-4xl text-eonic-text md:text-5xl">What we don&apos;t do.</h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {modelItems.map((item) => (
              <article key={item} className="surface-panel rounded-card p-6">
                <p className="text-base leading-8 text-eonic-text-2">{item}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-8 py-12 text-center">
          <h2 className="font-display text-4xl text-eonic-text md:text-5xl">See what the quiz recommends for you.</h2>
          <Button href="/quiz" className="mt-8">
            Find your protocol →
          </Button>
          <p className="mt-4 text-sm text-eonic-text-muted">Usually 2–4 minutes. No account required. No payment upfront.</p>
        </section>
      </div>
      <Footer />
    </main>
  );
}
