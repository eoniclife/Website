const items = [
  {
    icon: "⌘",
    title: "Every ingredient, justified.",
    body: "Not by marketing. By research. Every compound in your protocol links to the studies behind it, with plain English first and full citation if you want it.",
  },
  {
    icon: "⌬",
    title: "India-calibrated, not globally generic.",
    body: "The baseline starts from the realities of urban Indian life instead of assuming a globally average micronutrient profile.",
  },
  {
    icon: "◎",
    title: "36 questions. One protocol.",
    body: "We map energy, focus, stress, sleep, and metabolic patterns, then build around what your biology specifically needs.",
  },
];

export function TrustAnchors() {
  return (
    <section id="science" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.title} className="surface-panel rounded-card p-7">
            <div className="font-mono text-2xl text-eonic-gold">{item.icon}</div>
            <h2 className="mt-5 text-2xl font-medium text-eonic-text">{item.title}</h2>
            <p className="mt-4 text-base leading-7 text-eonic-text-2">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
