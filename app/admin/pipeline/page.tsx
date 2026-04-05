import Link from "next/link";
import { getAllOrders } from "@/lib/orders";
import { archetypes } from "@/lib/recommendation/archetypes";
import { modules } from "@/lib/recommendation/modules";

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AdminPipelinePage() {
  const orders = await getAllOrders();

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">Pilot order pipeline</h1>
          <p className="max-w-3xl text-sm leading-6 text-slate-600">
            Internal only. Access is protected by the shared admin token.
          </p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr className="text-left text-slate-600">
                <th className="px-4 py-3 font-medium">Created</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">WhatsApp</th>
                <th className="px-4 py-3 font-medium">Archetype</th>
                <th className="px-4 py-3 font-medium">Modules</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {orders.map((order) => {
                const primaryModule =
                  typeof order.protocol_config.primaryModule === "string"
                    ? modules[order.protocol_config.primaryModule]?.name ?? order.protocol_config.primaryModule
                    : null;
                const secondaryModule =
                  typeof order.protocol_config.secondaryModule === "string"
                    ? modules[order.protocol_config.secondaryModule]?.name ?? order.protocol_config.secondaryModule
                    : null;
                const archetypeLabel =
                  archetypes[order.archetype ?? order.protocol_config.archetype ?? "FOUNDATION_BUILDER"]?.name ??
                  order.archetype ??
                  "Unknown";

                return (
                  <tr key={order.id} className="align-top">
                    <td className="px-4 py-3 text-slate-700">{formatDate(order.order_date)}</td>
                    <td className="px-4 py-3">{order.users?.email ?? "Unknown"}</td>
                    <td className="px-4 py-3">{order.users?.whatsapp_number ?? "—"}</td>
                    <td className="px-4 py-3">{archetypeLabel}</td>
                    <td className="px-4 py-3 text-slate-700">
                      {[primaryModule, secondaryModule].filter(Boolean).join(" + ") || "Foundation only"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-700">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <Link className="text-blue-700 underline" href={`/admin/pipeline/${order.id}`}>
                        View details
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
