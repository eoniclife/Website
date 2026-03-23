export function ProtocolFormat() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="surface-panel relative min-h-[320px] rounded-card p-8">
          <div className="grid h-full gap-5 md:grid-cols-2">
            <div className="rounded-card border border-eonic-border bg-eonic-bg px-5 py-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">AM strip</div>
              <div className="mt-6 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-8 rounded-full border border-eonic-border bg-eonic-surface" />
                ))}
              </div>
            </div>
            <div className="rounded-card border border-eonic-border bg-eonic-bg px-5 py-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">PM sachet</div>
              <div className="mt-6 h-40 rounded-[24px] border border-dashed border-eonic-border-active bg-eonic-teal/10" />
            </div>
          </div>
        </div>
        <div className="max-w-xl space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Protocol format</p>
          <h2 className="font-heading text-4xl text-eonic-text">AM strip. PM sachet. That&apos;s it.</h2>
          <p className="text-lg leading-8 text-eonic-text-2">
            Your morning strip holds the ingredients that fit best with food. Your evening sachet is a warm-water ritual
            for the compounds that belong later in the day.
          </p>
          <p className="text-lg leading-8 text-eonic-text-2">
            No pill counting. No scheduling chaos. A system designed to stay in your life.
          </p>
        </div>
      </div>
    </section>
  );
}
