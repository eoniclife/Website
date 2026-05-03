import { Button } from "@/components/shared/Button";
import { researchHeadline } from "@/lib/homepage/content";

export function ResearchPreview() {
  return (
    <section id="science" className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 max-w-2xl">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">{researchHeadline.kicker}</p>
          <h2 className="mt-3 font-heading text-4xl text-eonic-text">{researchHeadline.title}</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          <article className="surface-panel rounded-card p-6">
            <p className="font-mono text-sm text-eonic-teal">Signal mapping</p>
            <p className="mt-4 text-lg text-eonic-text">Symptoms + context first, not labels.</p>
            <p className="mt-3 text-sm leading-6 text-eonic-text-2">
              We start from what you report, then narrow to the highest-impact changes first.
            </p>
          </article>
          <article className="surface-panel rounded-card p-6">
            <p className="font-mono text-sm text-eonic-teal">Protocol structure</p>
            <p className="mt-4 text-lg text-eonic-text">Fixed rhythm, adaptive emphasis.</p>
            <p className="mt-3 text-sm leading-6 text-eonic-text-2">
              The sequence keeps things stable day-to-day so the plan is actually usable.
            </p>
          </article>
          <article className="surface-panel rounded-card p-6">
            <p className="font-mono text-sm text-eonic-teal">Escalation criteria</p>
            <p className="mt-4 text-lg text-eonic-text">Red flags stay visible.</p>
            <p className="mt-3 text-sm leading-6 text-eonic-text-2">
              If signals suggest a deeper issue, the next step is to escalate safely rather than over-commit.
            </p>
          </article>
        </div>
        <div className="mt-8">
          <Button href="/quiz">Build your protocol →</Button>
        </div>
      </div>
    </section>
  );
}
