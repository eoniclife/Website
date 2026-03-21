const steps = [
  ["01", "Take the quiz", "Four minutes. Honest answers only."],
  ["02", "We build your protocol", "Energy, focus, stress, sleep, metabolism."],
  ["03", "Your 90-day system arrives", "AM strip plus PM sachet."],
  ["04", "We check in and adjust", "Structured follow-up begins after the first order."],
];

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">How it works</p>
          <h2 className="mt-3 font-display text-4xl text-eonic-text">A protocol system, not a supplement shelf.</h2>
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
