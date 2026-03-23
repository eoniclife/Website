import { baseIngredients } from "@/lib/recommendation/ingredients";
import { Button } from "@/components/shared/Button";

export function ResearchPreview() {
  const featured = baseIngredients.slice(0, 3);

  return (
    <section id="science" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">The research engine</p>
          <h2 className="mt-3 font-heading text-4xl text-eonic-text">You should be able to inspect the protocol, not just trust the branding.</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {featured.map((ingredient) => (
            <article key={ingredient.name} className="surface-panel rounded-card p-6">
              <p className="font-mono text-sm text-eonic-teal">{ingredient.name}</p>
              <p className="mt-4 text-lg text-eonic-text">{ingredient.purpose}</p>
              <p className="mt-3 text-sm leading-6 text-eonic-text-2">{ingredient.why}</p>
              <div className="mt-5 border-t border-eonic-border pt-4 text-sm text-eonic-gold">
                See the research ↓
              </div>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Button href="/quiz">Build your protocol →</Button>
        </div>
      </div>
    </section>
  );
}
