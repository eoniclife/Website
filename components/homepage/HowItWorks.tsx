const steps = [
  ["01", "Take the adaptive quiz", "Usually 2–4 minutes, depending on your path."],
  ["02", "See your protocol", "Archetype, modules, ingredients, and exactly why each one is there."],
  ["03", "Reserve your first 90-day stack", "AM strip plus PM sachet, priced clearly before anything is charged."],
  ["04", "We confirm manually", "For this first cohort, we follow up on WhatsApp within 24 hours to confirm the order."],
];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-eonic-text">A clearer path from symptoms to a stack you can actually evaluate.</h2>
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
