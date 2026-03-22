import { Button } from "@/components/shared/Button";

const features = [
  "AM capsule strip + PM powder sachet",
  "Personalized to your quiz results",
  "Free shipping across India",
  "Research references for every ingredient",
  "Early-access cohort with manual order confirmation",
];

export function Pricing() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-3xl rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-8 py-10 text-center shadow-card">
        <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Your 90-day protocol</p>
        <div className="mt-5 text-6xl font-display text-eonic-text">₹3,999</div>
        <div className="mt-8 space-y-3 text-eonic-text-2">
          {features.map((feature) => (
            <p key={feature}>{feature}</p>
          ))}
        </div>
        <Button href="/quiz" className="mt-8">
          Start your quiz — it&apos;s free
        </Button>
        <p className="mt-4 text-sm text-eonic-text-muted">
          We&apos;ll confirm your order on WhatsApp before taking payment. Nothing is charged the moment you click.
        </p>
      </div>
    </section>
  );
}
