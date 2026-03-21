'use client';

import { useState } from 'react';
import Button from './components/Button';
import Section from './components/Section';
import Container from './components/Container';
import FAQItem from './components/FAQItem';

export default function Home() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <main className="w-full bg-white">
      {/* ============ HERO ============ */}
      <Section className="bg-gradient-to-br from-white via-slate-50 to-white border-b border-slate-100">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            {/* Left: Text */}
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900">
                  Your Baseline, Handled.
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  A 90-day protocol for the 5–10% of health that pills actually influence. Stable energy, better sleep, clearer focus—built into daily habit.
                </p>
              </div>

              <p className="text-base text-slate-700 leading-relaxed">
                Most health advice is noise. Eonic Baseline is the opposite: a small, evidence-backed stack that works. No hype. No randomness. Just consistent support for your biochemical foundation.
              </p>

              {/* Hero Form */}
              <form
                action="https://example.com/waitlist"
                method="POST"
                className="flex flex-col gap-4 max-w-sm"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="hero-name" className="text-sm font-medium text-slate-700">
                    Your name
                  </label>
                  <input
                    id="hero-name"
                    type="text"
                    name="name"
                    placeholder="e.g., Priya"
                    required
                    className="px-4 py-3 border border-slate-200 rounded-lg text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="hero-email" className="text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    id="hero-email"
                    type="email"
                    name="email"
                    placeholder="priya@example.com"
                    required
                    className="px-4 py-3 border border-slate-200 rounded-lg text-base text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full mt-2">
                  Join the Waitlist
                </Button>
              </form>

              <p className="text-xs text-slate-500">
                We'll email you when the early cohort opens. No spam, ever.
              </p>
            </div>

            {/* Right: Product Visual (Placeholder) */}
            <div className="hidden lg:flex flex-col items-center justify-center">
              <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-slate-100 to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <p className="text-sm font-medium mb-2">Baseline Kit Visual</p>
                  <p className="text-xs">(Illustration/Product Mockup)</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ THE PROBLEM ============ */}
      <Section>
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16">
              The three things we're all ignoring
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Energy */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Energy that crashes by 3 PM
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  You're reaching for coffee, sugar, or stimulants because your baseline is unstable. Most supplements don't address this. We do.
                </p>
              </div>

              {/* Sleep */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Sleep that doesn't feel restorative
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  You're logging 7–8 hours but waking up foggy. The issue isn't quantity; it's quality. Your baseline biochemistry is scattered.
                </p>
              </div>

              {/* Focus */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-md transition-shadow">
                <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                  Attention that fragments too easily
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  You're context-switching, losing momentum, and blaming yourself. Your nervous system is missing baseline inputs. Eonic addresses this.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ WHAT IS EONIC BASELINE ============ */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Visual */}
              <div className="hidden lg:flex flex-col items-center justify-center">
                <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <p className="text-sm font-medium mb-2">Baseline Kit</p>
                    <p className="text-xs">(3–4 bottles/packs)</p>
                  </div>
                </div>
              </div>

              {/* Right: Text */}
              <div className="flex flex-col gap-8">
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-900">
                  The Eonic Baseline: Your 90-day health OS
                </h2>

                <div className="flex flex-col gap-6">
                  <p className="text-lg text-slate-700 leading-relaxed">
                    The Baseline is not a vitamin bottle. It's a <strong>protocol</strong>: a small, daily stack of evidence-backed ingredients designed to stabilize your core biochemistry over 90 days. Think of it as an operating system for your baseline health—the foundation everything else runs on.
                  </p>

                  <p className="text-base text-slate-600 leading-relaxed">
                    When your baseline is solid, you feel it. Sleep improves. Energy steadies. Focus sharpens. And because it's a <em>system</em>, not random supplements, you actually stay consistent.
                  </p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-8">
                  <h3 className="text-xl font-semibold text-slate-900 mb-6">
                    The Baseline Kit includes:
                  </h3>
                  <ul className="flex flex-col gap-4">
                    <li className="flex gap-3 text-slate-700">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>A-grade multivitamin complex (calibrated for India)</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Omega-3 (plant-based)</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Magnesium + cofactors (sleep + nervous system)</span>
                    </li>
                    <li className="flex gap-3 text-slate-700">
                      <span className="text-teal-600 font-bold">•</span>
                      <span>Optional: Adaptogens (depending on your intake assessment)</span>
                    </li>
                  </ul>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Duration</p>
                    <p className="text-lg font-semibold text-slate-900">90 days</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Daily habit</p>
                    <p className="text-lg font-semibold text-slate-900">2–4 minutes</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Estimated cost</p>
                    <p className="text-lg font-semibold text-slate-900">₹3,500–4,500</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-sm text-slate-500 uppercase tracking-wide">Per day</p>
                    <p className="text-lg font-semibold text-slate-900">₹38–50</p>
                  </div>
                </div>

                <Button variant="primary" className="w-full md:w-auto">
                  Explore the Baseline
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ HOW IT WORKS ============ */}
      <Section>
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16">
              Your 90-day journey
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 text-teal-700 font-bold text-xl">
                  1
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">Intake</h3>
                  <p className="text-sm text-slate-600">
                    We ask about your sleep, energy, digestion, stress, and current habits. Not a medical questionnaire—just understanding your baseline.
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Week 1</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 text-teal-700 font-bold text-xl">
                  2
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">Design</h3>
                  <p className="text-sm text-slate-600">
                    Based on your intake, we design your personal stack from the Baseline kit. Small tweaks for your specific needs.
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Week 2</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 text-teal-700 font-bold text-xl">
                  3
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">Execute</h3>
                  <p className="text-sm text-slate-600">
                    You take your stack daily. We send weekly micro-guidance: optimization tips, tracking reminders, nothing overbearing.
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Weeks 3–12</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-teal-100 text-teal-700 font-bold text-xl">
                  4
                </div>
                <div className="flex flex-col gap-3">
                  <h3 className="text-xl font-semibold text-slate-900">Review</h3>
                  <p className="text-sm text-slate-600">
                    You reflect on changes: sleep quality, energy steadiness, focus clarity. And you decide what comes next.
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Week 13</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ WHY EONIC IS DIFFERENT ============ */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-6">
              We're an OS, not a SKU catalogue
            </h2>
            <p className="text-xl text-slate-600 text-center max-w-3xl mx-auto mb-16">
              Most supplement brands are SKU-first: they show you 20 products and hope you find the right combo. We're protocol-first.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Differentiator 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  System, Not Random Bottles
                </h3>
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>One coherent protocol instead of 'pick and mix'</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Ingredients chosen to work together, not in isolation</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>You stay consistent because there's no decision paralysis</span>
                  </li>
                </ul>
              </div>

              {/* Differentiator 2 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Evidence-First, India-Calibrated
                </h3>
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Every ingredient backed by research</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Formulated for actual Indian nutrition baselines</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Third-party tested, GMP-certified, transparent sourcing</span>
                  </li>
                </ul>
              </div>

              {/* Differentiator 3 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Built for the Skeptic
                </h3>
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>We don't claim miracles. We support baseline stability.</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>No disease claims, no hype language</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>You're in control; we're a system, not a lifestyle brand</span>
                  </li>
                </ul>
              </div>

              {/* Differentiator 4 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                  Just the Start
                </h3>
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Coming soon: integration with lab testing (blood work, microbiome)</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>Wearable sync (sleep, HRV, movement data)</span>
                  </li>
                  <li className="flex gap-3 text-slate-700">
                    <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                    <span>This is version 1 of an OS upgrade, not a one-off product</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ WHO WE ARE ============ */}
      <Section>
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-12">
              Built by people who care about this, not just profit from it
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
              <div className="lg:col-span-2">
                <div className="flex flex-col gap-8 text-lg text-slate-700 leading-relaxed">
                  <p>
                    Eonic was built because we were frustrated. Most supplement brands are either hype-driven or clinical-to-the-point-of-cold. We wanted something honest: a protocol that works, explained clearly, with real people behind it.
                  </p>

                  <p>
                    Our founder spent 10+ years in health tech and biotech. The team includes a nutritional biochemist, a physician, and people obsessed with clear communication. We use the Baseline ourselves. We've tested it with early cohorts. And we're building this with the long-term intention of making health data and supplementation actually <em>integrated</em>—something no one else is doing yet.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-slate-100 rounded-xl aspect-square flex items-center justify-center border border-slate-200">
                  <p className="text-center text-slate-400 text-sm">
                    Founder photo <br />
                    (optional)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ ROADMAP ============ */}
      <Section className="bg-slate-50 border-y border-slate-100">
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16">
              This is just phase 1
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Phase 1 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 mt-2">
                  Baseline
                </h3>
                <p className="text-slate-600 mb-4">
                  A coherent 90-day protocol. Evidence-first. India-calibrated.
                </p>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">Now</p>
              </div>

              {/* Phase 2 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 mt-2">
                  Testing
                </h3>
                <p className="text-slate-600 mb-4">
                  Integrate blood work, microbiome, and other biomarkers. Your labs inform your stack.
                </p>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">Q2/Q3 2025</p>
              </div>

              {/* Phase 3 */}
              <div className="bg-white border border-slate-200 rounded-xl p-8 relative">
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="text-2xl font-semibold text-slate-900 mb-3 mt-2">
                  AI OS
                </h3>
                <p className="text-slate-600 mb-4">
                  Real-time integration: wearables (sleep, HRV, stress) + labs + behavior → AI-guided protocol updates.
                </p>
                <p className="text-xs text-teal-600 font-semibold uppercase tracking-wide">Q4 2025 onward</p>
              </div>
            </div>

            <p className="text-center text-lg text-slate-700 max-w-2xl mx-auto">
              Right now, supplements are static. Your health isn't. We're building a system that evolves with you.
            </p>
          </div>
        </Container>
      </Section>

      {/* ============ FAQ ============ */}
      <Section>
        <Container>
          <div className="py-20 lg:py-32">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 text-center mb-16">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              <FAQItem
                id="safety"
                question="Is this safe? Do I need a doctor's permission?"
                isExpanded={expandedFAQ === 'safety'}
                onToggle={() => toggleFAQ('safety')}
              >
                Yes, the Baseline is safe for healthy adults. All ingredients are recognized, well-studied, and included at evidence-backed doses. If you have a medical condition, take medications, or are pregnant/nursing, consult your doctor first. We're also designing integration with healthcare providers so your doctor can see your Baseline data.
              </FAQItem>

              <FAQItem
                id="medications"
                question="Can I take this with my medications?"
                isExpanded={expandedFAQ === 'medications'}
                onToggle={() => toggleFAQ('medications')}
              >
                Generally, the Baseline ingredients (multivitamins, magnesium, omega-3s) don't interact with common medications. But individual interactions vary. We'll ask about your medications during intake, and we always recommend confirming with your doctor.
              </FAQItem>

              <FAQItem
                id="vegan"
                question="Is it vegetarian/vegan?"
                isExpanded={expandedFAQ === 'vegan'}
                onToggle={() => toggleFAQ('vegan')}
              >
                The base Baseline is vegan-friendly (plant-based omega-3, no animal-derived ingredients). We'll note any capsule or filler sourcing during intake.
              </FAQItem>

              <FAQItem
                id="cost"
                question="How much does it cost?"
                isExpanded={expandedFAQ === 'cost'}
                onToggle={() => toggleFAQ('cost')}
              >
                Baseline kits start at ₹3,500–4,500 for 90 days, depending on customization. That works out to ₹38–50/day—less than a coffee. We're finalizing pricing and will confirm in your intake.
              </FAQItem>

              <FAQItem
                id="results"
                question="What if I don't see changes in 90 days?"
                isExpanded={expandedFAQ === 'results'}
                onToggle={() => toggleFAQ('results')}
              >
                90 days is the standard because that's how long it takes for most biomarkers to shift. But changes vary (sleep improves in 2–3 weeks; energy takes 4–6; focus is often last). We'll track this in your review and adjust. If no changes, we offer a refund (conditions apply).
              </FAQItem>

              <FAQItem
                id="notfor"
                question="Who is this NOT for?"
                isExpanded={expandedFAQ === 'notfor'}
                onToggle={() => toggleFAQ('notfor')}
              >
                <ul className="flex flex-col gap-3">
                  <li className="flex gap-3">
                    <span className="text-slate-400 flex-shrink-0">•</span>
                    <span>Pregnant or nursing (we'll have a separate protocol later)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-400 flex-shrink-0">•</span>
                    <span>Active medical conditions (work with your doctor first)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-400 flex-shrink-0">•</span>
                    <span>People looking for a "cure" (we support baseline; we don't treat disease)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-slate-400 flex-shrink-0">•</span>
                    <span>Anyone who won't take it daily (consistency is core)</span>
                  </li>
                </ul>
              </FAQItem>

              <FAQItem
                id="duration"
                question="How long do I take this?"
                isExpanded={expandedFAQ === 'duration'}
                onToggle={() => toggleFAQ('duration')}
              >
                The initial Baseline is 90 days. Many people continue because they feel the difference. Some adjust seasonally or based on life changes. It's your call.
              </FAQItem>

              <FAQItem
                id="quality"
                question="How do you ensure quality?"
                isExpanded={expandedFAQ === 'quality'}
                onToggle={() => toggleFAQ('quality')}
              >
                GMP-certified manufacturing, third-party testing for purity and potency, supply chain transparency. We publish test results (coming soon on the site). No shortcuts.
              </FAQItem>

              <FAQItem
                id="doctors"
                question="Do you work with doctors?"
                isExpanded={expandedFAQ === 'doctors'}
                onToggle={() => toggleFAQ('doctors')}
              >
                Yes, we're building integrations so your healthcare provider can access your Baseline protocol and data (with your consent). We're not replacing medical care; we're complementing it.
              </FAQItem>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ FINAL CTA ============ */}
      <Section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Container>
          <div className="py-20 lg:py-32">
            <div className="max-w-2xl mx-auto text-center flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <h2 className="text-4xl lg:text-5xl font-bold text-white">
                  Ready to put your baseline on autopilot?
                </h2>
                <p className="text-xl text-slate-100">
                  Join the early cohort. 90 days to a more stable you.
                </p>
              </div>

              <p className="text-base text-slate-300 leading-relaxed">
                We're launching with a limited first cohort. Early members get access to the full protocol, weekly guidance and micro-adjustments, and a direct feedback loop to our team (your input shapes what we build next).
              </p>

              {/* Final CTA Form */}
              <form
                action="https://example.com/waitlist"
                method="POST"
                className="flex flex-col gap-4 max-w-md mx-auto w-full"
              >
                <div className="flex flex-col gap-2">
                  <label htmlFor="final-name" className="text-sm font-medium text-slate-200">
                    Your name
                  </label>
                  <input
                    id="final-name"
                    type="text"
                    name="name"
                    placeholder="e.g., Priya"
                    required
                    className="px-4 py-3 border border-slate-600 rounded-lg text-base bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="final-email" className="text-sm font-medium text-slate-200">
                    Email
                  </label>
                  <input
                    id="final-email"
                    type="email"
                    name="email"
                    placeholder="priya@example.com"
                    required
                    className="px-4 py-3 border border-slate-600 rounded-lg text-base bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="final-message" className="text-sm font-medium text-slate-200">
                    Any questions? (optional)
                  </label>
                  <textarea
                    id="final-message"
                    name="message"
                    placeholder="Tell us what's on your mind..."
                    rows={3}
                    className="px-4 py-3 border border-slate-600 rounded-lg text-base bg-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
                  />
                </div>

                <Button type="submit" variant="primary" className="w-full mt-2">
                  Join the Early Cohort
                </Button>
              </form>

              <p className="text-xs text-slate-400">
                We'll email you when the early cohort opens. No spam, ever.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-white border-t border-slate-200">
        <Container>
          <div className="py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold text-slate-900">EONIC</p>
              <p className="text-xs text-slate-500">Your baseline, handled.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 md:gap-12">
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Links</p>
                <ul className="flex flex-col gap-2">
                  <li>
                    <a href="/privacy" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="/terms" className="text-sm text-slate-600 hover:text-slate-900 transition-colors">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide">Contact</p>
                <p className="text-sm text-slate-600">hello@eonic.health</p>
              </div>
            </div>
          </div>

          <div className="py-6 border-t border-slate-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-slate-500">
              © 2025 Eonic Health. All rights reserved.
            </p>
            <p className="text-xs text-slate-500">
              Made with care, backed by science.
            </p>
          </div>
        </Container>
      </footer>
    </main>
  );
}
