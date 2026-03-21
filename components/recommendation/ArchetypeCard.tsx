export function ArchetypeCard({ name, description }: { name: string; description: string }) {
  return (
    <section className="rounded-[28px] border border-eonic-border-active bg-[linear-gradient(180deg,rgba(0,201,167,0.08),rgba(22,27,39,0.96))] px-7 py-8">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Your profile</p>
      <h2 className="mt-4 font-display text-4xl text-eonic-text">{name}</h2>
      <p className="mt-5 text-base leading-8 text-eonic-text-2">{description}</p>
    </section>
  );
}
