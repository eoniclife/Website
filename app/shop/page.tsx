import Link from "next/link";
import { ReservationForm } from "@/components/shop/ReservationForm";
import { archetypes } from "@/lib/recommendation/archetypes";
import { getOrderById } from "@/lib/orders";
import { getCondensedIngredientSummary } from "@/lib/protocol/ingredients";
import type { RecommendationResult } from "@/lib/quiz/types";

export const dynamic = "force-dynamic";

interface ShopPageProps {
  searchParams: Promise<{
    order?: string;
  }>;
}

function buildRecommendationFromOrder(archetype: string, protocolConfig: Record<string, unknown>): RecommendationResult {
  return {
    scores: {
      energy: 0,
      focus: 0,
      stress: 0,
      sleep: 0,
      metabolic: 0,
      gut: 0,
      recovery: 0,
    },
    hiddenDimensions: [],
    triageSelections: [],
    archetype,
    primaryModule: typeof protocolConfig.primaryModule === "string" ? protocolConfig.primaryModule : null,
    secondaryModule: typeof protocolConfig.secondaryModule === "string" ? protocolConfig.secondaryModule : null,
    isVegetarian: Boolean(protocolConfig.isVegetarian),
  };
}

function ErrorState() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-eonic-bg px-5 py-10">
      <section className="surface-panel max-w-2xl rounded-[28px] px-8 py-12 text-center">
        <h1 className="font-heading text-4xl text-eonic-text">We couldn&apos;t find that reservation.</h1>
        <p className="mt-4 text-lg leading-8 text-eonic-text-2">
          The link may be incomplete or expired. Start from the quiz and we&apos;ll take you back to the right place.
        </p>
        <Link href="/quiz" className="mt-8 inline-block text-eonic-teal">
          Return to the quiz
        </Link>
      </section>
    </main>
  );
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const { order: orderId } = await searchParams;
  if (!orderId) {
    return <ErrorState />;
  }

  const order = await getOrderById(orderId);
  if (!order || !order.users) {
    return <ErrorState />;
  }

  const archetypeId = order.archetype ?? order.protocol_config.archetype ?? "FOUNDATION_BUILDER";
  const archetype = archetypes[archetypeId] ?? archetypes.FOUNDATION_BUILDER;
  const recommendation = buildRecommendationFromOrder(archetypeId, order.protocol_config as Record<string, unknown>);
  const summary = getCondensedIngredientSummary(recommendation, 5);
  const isConfirmed = order.status === "reserved" || order.status === "paid";
  const heading = isConfirmed ? "You're confirmed. Watch for our WhatsApp message." : "Your protocol is reserved.";

  return (
    <main className="min-h-screen bg-eonic-bg px-5 py-10 md:px-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <section className="surface-panel rounded-[28px] px-8 py-10">
          <p className="font-mono text-sm uppercase tracking-[0.3em] text-eonic-gold">Early access order</p>
          <h1 className="mt-4 font-heading text-5xl text-eonic-text md:text-6xl">{heading}</h1>
          <div className="mt-6 grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-eonic-teal">Archetype</p>
                <h2 className="mt-2 text-2xl text-eonic-text">{archetype.name}</h2>
                <p className="mt-3 text-base leading-7 text-eonic-text-2">{archetype.description}</p>
              </div>

              <div>
                <p className="font-mono text-xs uppercase tracking-[0.28em] text-eonic-teal">Condensed stack summary</p>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-eonic-text-2">
                  {summary.items.map((ingredient) => (
                    <li key={ingredient.key}>
                      <span className="font-mono text-eonic-text">{ingredient.name}</span>
                      {" · "}
                      {ingredient.form}
                    </li>
                  ))}
                  {summary.remainingCount > 0 ? (
                    <li className="text-eonic-text-muted">and {summary.remainingCount} more</li>
                  ) : null}
                </ul>
              </div>
            </div>

            <div className="rounded-[24px] border border-eonic-border bg-eonic-bg-2 p-6">
              <p className="font-mono text-xs uppercase tracking-[0.28em] text-eonic-teal">Price</p>
              <p className="mt-3 font-heading text-4xl text-eonic-text">₹3,999</p>
              <p className="mt-6 text-sm leading-7 text-eonic-text-2">
                We&apos;re in early access. We&apos;ll send you a WhatsApp message within 24 hours to confirm your order and share payment details. Nothing is charged until you confirm.
              </p>
            </div>
          </div>
        </section>

        {isConfirmed ? (
          <section className="rounded-[24px] border border-eonic-border bg-eonic-bg-2 px-8 py-8">
            <h2 className="font-heading text-3xl text-eonic-text">You&apos;re confirmed. Watch for our WhatsApp message.</h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-eonic-text-2">
              We&apos;ll reach out on WhatsApp within 24 hours to confirm the order manually and share the payment details for this first cohort.
            </p>
          </section>
        ) : (
          <ReservationForm orderId={order.id} existingWhatsAppNumber={order.users.whatsapp_number} />
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
