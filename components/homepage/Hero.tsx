import { Button } from "@/components/shared/Button";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="grain-overlay" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-3xl font-display text-5xl italic leading-tight text-balance text-eonic-text md:text-7xl">
              No health noise.
              <br />
              Just health outcomes.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-eonic-text-2 md:text-xl">
              A 90-day supplement protocol built around your biology, not a generic formula designed for everyone.
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/quiz">Find your protocol →</Button>
            <Button href="#science" variant="secondary">
              See what&apos;s in it
            </Button>
          </div>
          <p className="text-sm text-eonic-text-muted">Takes 4 minutes. No account required.</p>
        </div>

        <div className="relative min-h-[360px] rounded-[28px] border border-eonic-border bg-[radial-gradient(circle_at_25%_25%,rgba(0,201,167,0.16),transparent_24%),radial-gradient(circle_at_75%_35%,rgba(201,168,76,0.16),transparent_18%),linear-gradient(180deg,rgba(17,21,32,0.9),rgba(10,13,18,0.98))] shadow-glow-teal">
          <div className="absolute inset-8 rounded-full border border-eonic-border/80 animate-drift" />
          <div className="absolute inset-[18%] rounded-full border border-eonic-teal/20" />
          <div className="absolute inset-[28%] rounded-full border border-eonic-gold/20" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-eonic-teal/20 blur-2xl" />
          <div className="absolute bottom-8 left-8 right-8 flex items-center justify-between rounded-card border border-eonic-border bg-eonic-bg/70 px-4 py-3">
            <div>
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">Research Engine</div>
              <div className="mt-1 text-sm text-eonic-text-2">Adaptive protocol assembly in progress</div>
            </div>
            <div className="h-2 w-24 overflow-hidden rounded-full bg-eonic-border">
              <div className="h-full w-2/3 rounded-full bg-eonic-teal" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
