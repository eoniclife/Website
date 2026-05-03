"use client";

import { Button } from "@/components/shared/Button";
import { trackEvent } from "@/lib/analytics";
import { heroCopy, heroSamplePoints } from "@/lib/homepage/content";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-3xl font-heading text-5xl leading-tight text-balance text-eonic-text md:text-7xl">
              {heroCopy.title}
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-eonic-text-2 md:text-xl">
              {heroCopy.description}
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              href="/quiz"
              onClick={() =>
                trackEvent({
                  event: "homepage_cta_clicked",
                  data: { source: "hero_primary" },
                })
              }
            >
              {heroCopy.primaryCta} →
            </Button>
            <Button href="/#how-it-works" variant="secondary">
              {heroCopy.secondaryCta}
            </Button>
          </div>
          <p className="text-sm text-eonic-text-muted">{heroCopy.assurance}</p>
        </div>

        <div className="surface-panel rounded-[28px] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">What this check-in is for</p>
          <p className="mt-3 font-heading text-xl text-eonic-text">Guided reset, not random supplementation</p>
          <p className="mt-1 text-sm text-eonic-text-muted">Pattern recognition first, then structured action.</p>
          <div className="mt-6 space-y-5">
            {heroSamplePoints.map((item) => (
              <div key={item.title}>
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-eonic-teal">{item.title}</p>
                <p className="mt-2 text-sm text-eonic-text-2">{item.detail}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-eonic-border pt-4">
            <span className="text-xs text-eonic-text-muted">90-day guided reset</span>
            <span className="font-mono text-xs text-eonic-teal">→ structured and personal</span>
          </div>
        </div>
      </div>
    </section>
  );
}
