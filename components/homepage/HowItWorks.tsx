import { howItWorksSteps } from "@/lib/homepage/content";

export function HowItWorks() {
  return (
    <section className="px-5 py-16 md:px-8">
      <span id="how-it-works" />
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">How it works</p>
          <h2 className="mt-3 font-heading text-4xl text-eonic-text">A clear reset path, not a catalog.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {howItWorksSteps.map(({ number, title, body }) => (
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
