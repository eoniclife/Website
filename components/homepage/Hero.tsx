import { Button } from "@/components/shared/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-3xl font-heading text-5xl leading-tight text-balance text-eonic-text md:text-7xl">
              Know what your system
              <br />
              is asking for.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-eonic-text-2 md:text-xl">
              Eonic turns an adaptive quiz into a 90-day supplement protocol, then shows you the ingredients, timing, and rationale clearly enough to judge it for yourself.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/quiz">Find your protocol →</Button>
            <Button href="/science" variant="secondary">
              See what&apos;s in it
            </Button>
          </div>
          <p className="text-sm text-eonic-text-muted">Usually takes 2–4 minutes. No account required. No payment upfront.</p>
        </div>

        <div className="surface-panel rounded-[28px] p-8">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">Sample protocol</p>
          <p className="mt-3 font-heading text-xl text-eonic-text">Restorer + Focus stack</p>
          <p className="mt-1 text-sm text-eonic-text-muted">9 archetypes · personalised to your answers</p>

          <div className="mt-6 space-y-5">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-eonic-teal">AM Strip</p>
              <div className="mt-3 space-y-2">
                {["Vitamin D3 + K2 (MK-7)", "Methylcobalamin B12", "Omega-3 (TG form)"].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-eonic-teal" />
                    <span className="font-mono text-sm text-eonic-text-2">{name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-eonic-gold">PM Sachet</p>
              <div className="mt-3 space-y-2">
                {["Magnesium Glycinate", "Ashwagandha KSM-66"].map((name) => (
                  <div key={name} className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-eonic-gold" />
                    <span className="font-mono text-sm text-eonic-text-2">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-eonic-border pt-4">
            <span className="text-xs text-eonic-text-muted">5 ingredients · 90 days</span>
            <span className="font-mono text-xs text-eonic-teal">→ yours will differ</span>
          </div>
        </div>
      </div>
    </section>
  );
}
