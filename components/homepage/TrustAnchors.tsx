import { trustAnchors } from "@/lib/homepage/content";

export function TrustAnchors() {
  return (
    <section id="science" className="px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
        {trustAnchors.map((item) => (
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
