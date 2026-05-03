export function ProtocolFormat() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="surface-panel relative min-h-[320px] rounded-card p-8">
          <div className="grid h-full gap-5 md:grid-cols-2">
            <div className="rounded-card border border-eonic-border bg-eonic-bg px-5 py-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">Morning rhythm</div>
              <div className="mt-6 space-y-3">
                {[1, 2, 3, 4].map((n) => (
                  <div key={n} className="h-8 rounded-full border border-eonic-border bg-eonic-surface" />
                ))}
              </div>
            </div>
            <div className="rounded-card border border-eonic-border bg-eonic-bg px-5 py-6">
              <div className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-gold">Evening rhythm</div>
              <div className="mt-6 h-40 rounded-[24px] border border-dashed border-eonic-border-active bg-eonic-teal/10" />
            </div>
          </div>
        </div>
        <div className="max-w-xl space-y-5">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Protocol format</p>
          <h2 className="font-heading text-4xl text-eonic-text">A structure you can run, consistently.</h2>
          <p className="text-lg leading-8 text-eonic-text-2">
            The reset keeps the rhythm simple, then layers modules as needed based on what your answers show.
          </p>
          <p className="text-lg leading-8 text-eonic-text-2">
            No pill counting. No big system overhaul. Just the priorities that matter for the next 90 days.
          </p>
        </div>
      </div>
    </section>
  );
}
