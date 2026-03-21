"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition duration-300",
        scrolled ? "border-eonic-border bg-eonic-bg/90 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-8">
        <Link href="/" className="font-display text-3xl italic text-eonic-teal">
          eonic
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/shop" className="text-sm text-eonic-text-2 transition hover:text-eonic-text">
            Shop
          </Link>
          <Link href="#science" className="text-sm text-eonic-text-2 transition hover:text-eonic-text">
            The Science
          </Link>
          <Button href="/quiz">Start Quiz</Button>
        </nav>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-eonic-border text-eonic-text md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle navigation"
        >
          <span className="text-lg">{open ? "×" : "≡"}</span>
        </button>
      </div>

      {open ? (
        <div className="border-t border-eonic-border bg-eonic-bg-2 px-5 py-5 md:hidden">
          <div className="flex flex-col gap-4">
            <Link href="/shop" onClick={() => setOpen(false)} className="text-eonic-text-2">
              Shop
            </Link>
            <Link href="#science" onClick={() => setOpen(false)} className="text-eonic-text-2">
              The Science
            </Link>
            <Button href="/quiz" className="w-full" onClick={() => setOpen(false)}>
              Start Quiz
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
