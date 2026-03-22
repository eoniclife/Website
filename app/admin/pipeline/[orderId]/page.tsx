import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/orders";
import { archetypes } from "@/lib/recommendation/archetypes";
import { modules } from "@/lib/recommendation/modules";
import { getIngredientBreakdown } from "@/lib/protocol/ingredients";
import type { RecommendationResult } from "@/lib/quiz/types";

export const dynamic = "force-dynamic";

interface AdminOrderDetailPageProps {
  params: Promise<{
    orderId: string;
  }>;
}

function buildRecommendation(archetype: string, protocolConfig: Record<string, unknown>): RecommendationResult {
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

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminOrderDetailPage({ params }: AdminOrderDetailPageProps) {
  const { orderId } = await params;
  const order = await getOrderById(orderId);

  if (!order || !order.users) {
    notFound();
  }

  const archetypeId = order.archetype ?? order.protocol_config.archetype ?? "FOUNDATION_BUILDER";
  const archetype = archetypes[archetypeId] ?? archetypes.FOUNDATION_BUILDER;
  const recommendation = buildRecommendation(archetypeId, order.protocol_config as Record<string, unknown>);
  const ingredientGroups = getIngredientBreakdown(recommendation);

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold">Order detail</h1>
            <p className="text-sm text-slate-600">Order ID: {order.id}</p>
          </div>
          <Link href="/admin/pipeline" className="text-sm text-blue-700 underline">
            Back to pipeline
          </Link>
        </div>

        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold">Order</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Status</dt>
                <dd>{order.status}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Created</dt>
                <dd>{formatDate(order.order_date)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Updated</dt>
                <dd>{formatDate(order.updated_at)}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Price</dt>
                <dd>{order.amount_paid ? `₹${order.amount_paid}` : "₹3,999 pending"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Archetype</dt>
                <dd>{archetype.name}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Primary module</dt>
                <dd>
                  {recommendation.primaryModule
                    ? modules[recommendation.primaryModule]?.name ?? recommendation.primaryModule
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-slate-500">Secondary module</dt>
                <dd>
                  {recommendation.secondaryModule
                    ? modules[recommendation.secondaryModule]?.name ?? recommendation.secondaryModule
                    : "—"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <h2 className="text-lg font-semibold">User</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd>{order.users.email}</dd>
              </div>
              <div>
                <dt className="text-slate-500">WhatsApp</dt>
                <dd>{order.users.whatsapp_number ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">WhatsApp opted in</dt>
                <dd>{order.users.whatsapp_opted_in ? "Yes" : "No"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">AM reminder</dt>
                <dd>{order.users.am_reminder_time ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">PM reminder</dt>
                <dd>{order.users.pm_reminder_time ?? "—"}</dd>
              </div>
              <div>
                <dt className="text-slate-500">Vegetarian</dt>
                <dd>{recommendation.isVegetarian ? "Yes" : "No"}</dd>
              </div>
            </dl>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 p-5">
          <h2 className="text-lg font-semibold">Saved protocol config</h2>
          <pre className="mt-4 overflow-x-auto rounded-lg bg-slate-50 p-4 text-xs leading-6 text-slate-700">
            {JSON.stringify(order.protocol_config, null, 2)}
          </pre>
        </section>

        <section className="space-y-6">
          <h2 className="text-lg font-semibold">Full ingredient list</h2>
          {ingredientGroups.map((group) => (
            <div key={group.id} className="rounded-xl border border-slate-200 p-5">
              <div className="space-y-1">
                <h3 className="text-base font-semibold">{group.label}</h3>
                <p className="text-sm text-slate-600">{group.description}</p>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {group.ingredients.map((ingredient) => (
                  <article key={`${group.id}-${ingredient.key}`} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-slate-500">{ingredient.name}</p>
                        <p className="mt-2 text-lg font-medium">{ingredient.form}</p>
                      </div>
                      <div className="text-right text-xs text-slate-500">
                        <p>{ingredient.dose}</p>
                        <p className="mt-1">{ingredient.timing}</p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-6 text-slate-700">{ingredient.rationale}</p>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
