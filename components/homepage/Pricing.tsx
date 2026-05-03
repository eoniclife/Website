"use client";

import { Button } from "@/components/shared/Button";
import { trackEvent } from "@/lib/analytics";
import { pricingCopy } from "@/lib/homepage/content";

const features = [
  "Guided reset with daily support",
  "Personalized to your quiz results",
  "Free shipping where available",
  "Early-access cohort, confirmed manually",
  "No payment until your protocol confirmation",
];

export function Pricing() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-8 py-10 text-center shadow-card">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Your 90-day reset</p>
        <div className="mt-5 text-6xl font-heading text-eonic-text">₹3,999</div>
        <div className="mt-8 space-y-3 text-eonic-text-2">
          {features.map((feature) => (
            <p key={feature}>{feature}</p>
          ))}
        </div>
        <Button
          href="/quiz"
          className="mt-8"
          onClick={() =>
            trackEvent({
              event: "homepage_cta_clicked",
              data: { source: "pricing_primary" },
            })
          }
        >
          {pricingCopy.cta} →
        </Button>
        <p className="mt-4 text-sm text-eonic-text-muted">
          {pricingCopy.note}
        </p>
      </div>
    </section>
  );
}
