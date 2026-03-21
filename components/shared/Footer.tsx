import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-eonic-border bg-eonic-bg-2">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-10 md:flex-row md:items-end md:justify-between md:px-8">
        <div className="space-y-2">
          <div className="font-display text-3xl italic text-eonic-teal">eonic</div>
          <p className="max-w-sm text-sm text-eonic-text-2">Built on research. Designed for your life.</p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-eonic-text-2">
          <Link href="#science">The Science</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="mailto:hello@eonic.in">Contact</Link>
          <Link href="https://instagram.com">Instagram</Link>
          <Link href="https://linkedin.com">LinkedIn</Link>
        </div>
      </div>
    </footer>
  );
}
