"use client";

import { useEffect, useState } from "react";

interface ProtocolShareLinkProps {
  orderId: string;
}

export function ProtocolShareLink({ orderId }: ProtocolShareLinkProps) {
  const [shareUrl, setShareUrl] = useState(`/protocol/${orderId}`);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setShareUrl(`${window.location.origin}/protocol/${orderId}`);
  }, [orderId]);

  async function copyToClipboard() {
    setError(null);

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setError("Copy failed. Please manually copy the link.");
    }
  }

  return (
    <section className="rounded-[20px] border border-eonic-border bg-eonic-bg-2 px-6 py-6">
      <p className="font-mono text-sm uppercase tracking-[0.28em] text-eonic-text-2">Share your protocol</p>
      <p className="mt-2 text-sm font-medium text-eonic-text">Your protocol link:</p>
      <p className="mt-2 break-all font-mono text-sm text-eonic-text">{shareUrl}</p>
      <div className="mt-4 flex items-center gap-3">
        <button
          type="button"
          onClick={copyToClipboard}
          className="rounded-full border border-eonic-border px-4 py-2 text-sm transition hover:border-eonic-text/40"
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        {error ? <span className="text-sm text-eonic-gold">{error}</span> : null}
      </div>
    </section>
  );
}
