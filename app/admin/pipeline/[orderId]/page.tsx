import Link from "next/link";
import { createServerClient } from "@/lib/supabase/server";
import { isValidUUID } from "@/lib/validation";

interface AdminOrderPageProps {
  params: Promise<{ orderId: string }>;
}

function ErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-10">
      <section className="surface-panel max-w-2xl rounded-[28px] px-8 py-12 text-center">
        <p className="font-display text-4xl italic text-eonic-text">Order not found</p>
        <p className="mt-4 text-lg leading-8 text-eonic-text-2">
          We couldn&apos;t find that admin order detail record. Check the order ID and try again.
        </p>
      </section>
    </main>
  );
}

export default async function AdminOrderDetailPage({ params }: AdminOrderPageProps) {
  const { orderId } = await params;
  if (!isValidUUID(orderId)) {
    return <ErrorState />;
  }

  const client = createServerClient();
  const { data: order, error } = await client
    .from("orders")
    .select("id, status, archetype, protocol_config, order_date")
    .eq("id", orderId)
    .maybeSingle();

  if (error || !order) {
    return <ErrorState />;
  }

  const status = typeof order.status === "string" ? order.status : "intent";
  const protocolConfig = (order.protocol_config as Record<string, unknown>) ?? {};
  const archetype =
    typeof order.archetype === "string"
      ? order.archetype
      : typeof protocolConfig.archetype === "string"
        ? (protocolConfig.archetype as string)
        : "Unspecified";

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="surface-panel rounded-[28px] px-7 py-10">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-eonic-text-2">Admin detail</p>
          <h1 className="mt-4 font-display text-4xl text-eonic-text">Order {order.id}</h1>
          <p className="mt-3 text-sm text-eonic-text-2">Status: {status}</p>
          <p className="mt-2 text-sm text-eonic-text-2">Archetype: {archetype}</p>
          <p className="mt-2 text-sm text-eonic-text-2">Order date: {String(order.order_date)}</p>
          <div className="mt-6">
            <Link href={`/protocol/${order.id}`} target="_blank" rel="noreferrer" className="text-eonic-teal">
              View protocol page →
            </Link>
          </div>
        </section>

        <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 px-7 py-8">
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-eonic-gold">Debug context</p>
          <pre className="mt-3 overflow-x-auto rounded-[16px] border border-eonic-border bg-eonic-bg p-4 text-sm text-eonic-text-2">
            {JSON.stringify(order, null, 2)}
          </pre>
        </section>
      </div>
    </main>
  );
}
