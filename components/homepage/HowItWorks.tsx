const steps = [
  ["01", "Take the adaptive quiz", "Usually 2–4 minutes, depending on what your answers point to."],
  ["02", "See your protocol", "Your archetype, your modules, and the ingredients that made the cut."],
  ["03", "Reserve your first 90-day stack", "AM strip plus PM sachet, with the price and next step stated clearly."],
  ["04", "We confirm personally", "For this first cohort, we follow up on WhatsApp within 24 hours to complete the handoff."],
];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-eonic-text">A direct path from what you feel to what goes into the protocol.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-4">
          {steps.map(([number, title, body]) => (
            <div key={number} className="surface-panel rounded-card p-6">
              <div className="font-mono text-sm text-eonic-teal">{number}</div>
              <h3 className="mt-5 text-xl text-eonic-text">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-eonic-text-2">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
