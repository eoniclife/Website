import { ProtocolShareLink } from "@/components/shop/ProtocolShareLink";
import { createServerClient } from "@/lib/supabase/server";
import { isValidUUID } from "@/lib/validation";
import Link from "next/link";

interface ShopPageProps {
  searchParams: {
    order?: string;
  };
}

function ErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-10">
      <section className="surface-panel max-w-2xl rounded-[28px] px-8 py-12 text-center">
        <p className="font-display text-4xl italic text-eonic-text">We couldn&apos;t find that reservation.</p>
        <p className="mt-4 text-lg leading-8 text-eonic-text-2">
          The shop link may be missing an order id. Start with the quiz and reserve your protocol first.
        </p>
        <Link href="/quiz" className="mt-8 inline-block text-eonic-teal">
          Return to the quiz
        </Link>
      </section>
    </main>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const orderId = searchParams.order;
  if (!orderId || !isValidUUID(orderId)) {
    return <ErrorState />;
  }

  const client = createServerClient();
  const { data: order, error } = await client
    .from("orders")
    .select("id, status, archetype, protocol_config")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) {
    return <ErrorState />;
  }

  const orderStatus = (typeof order.status === "string" ? order.status : "intent").toLowerCase();
  const isConfirmed = orderStatus === "reserved" || orderStatus === "paid";
  const archetypeId = typeof order.archetype === "string" ? order.archetype : null;
  const protocolConfig = (order.protocol_config ?? {}) as Record<string, unknown>;
  const shareText = archetypeId ?? (typeof protocolConfig.archetype === "string" ? (protocolConfig.archetype as string) : "FOUNDATION_BUILDER");

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <div className="mx-auto max-w-3xl space-y-8">
        <section className="surface-panel rounded-[28px] px-8 py-12">
          <p className="font-mono text-sm uppercase tracking-[0.28em] text-eonic-text-2">Reservation confirmed</p>
          <h1 className="mt-4 font-display text-4xl text-eonic-text">
            {isConfirmed ? "You&apos;re confirmed." : "Reservation pending."}
          </h1>
          <p className="mt-4 text-lg leading-8 text-eonic-text-2">
            Order: {order.id}
            {shareText ? ` · ${shareText}` : ""}
          </p>
        </section>

        {isConfirmed ? (
          <ProtocolShareLink orderId={order.id as string} />
        ) : (
          <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-6 py-6">
            <p className="font-mono text-sm uppercase tracking-[0.28em] text-eonic-text-2">Share your protocol</p>
            <p className="mt-3 text-sm leading-7 text-eonic-text-2">
              Once your reservation is confirmed, we&apos;ll show a direct share link for this protocol.
            </p>
          </section>
        )}

        <div className="text-sm text-eonic-text-muted">
          <Link href="/quiz" className="transition-colors hover:text-eonic-text-2">
            Return to the quiz
          </Link>
        </div>
      </div>
    </main>
  );
}
