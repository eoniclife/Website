const items = [
  {
    icon: "⌘",
    title: "Every ingredient, justified.",
    body: "You see what is in the stack, why it is there, and what the research actually points to. No mystery blends. No vague promises.",
  },
  {
    icon: "⌬",
    title: "India-calibrated, not globally generic.",
    body: "The baseline starts from the realities of urban Indian life rather than assuming a globally average diet, schedule, or micronutrient profile.",
  },
  {
    icon: "◎",
    title: "Adaptive quiz. One protocol.",
    body: "We look at energy, focus, stress, sleep, gut, and metabolic patterns, then build around what your answers specifically suggest is under strain.",
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
