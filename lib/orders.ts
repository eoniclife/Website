import { createServerClient } from "@/lib/supabase/server";

const ORDER_SELECT = `
  id,
  user_id,
  quiz_session_id,
  archetype,
  protocol_config,
  amount_paid,
  status,
  protocol_day,
  order_date,
  updated_at,
  users!orders_user_id_fkey (
    id,
    email,
    whatsapp_number,
    whatsapp_opted_in,
    am_reminder_time,
    pm_reminder_time,
    created_at,
    updated_at
  )
`;

export interface OrderProtocolConfig {
  base?: string[];
  primaryModule?: string | null;
  secondaryModule?: string | null;
  archetype?: string;
  isVegetarian?: boolean;
}

export interface OrderUserRecord {
  id: string;
  email: string;
  whatsapp_number: string | null;
  whatsapp_opted_in: boolean;
  am_reminder_time: string | null;
  pm_reminder_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface OrderRecord {
  id: string;
  user_id: string;
  quiz_session_id: string | null;
  archetype: string | null;
  protocol_config: OrderProtocolConfig;
  amount_paid: number | null;
  status: string;
  protocol_day: number;
  order_date: string;
  updated_at: string;
  users: OrderUserRecord | null;
}

function normalizeOrderRecord(data: unknown): OrderRecord | null {
  if (!data || typeof data !== "object") {
    return null;
  }

  const record = data as Record<string, unknown>;
  const rawUser = Array.isArray(record.users) ? record.users[0] : record.users;

  return {
    id: String(record.id),
    user_id: String(record.user_id),
    quiz_session_id: record.quiz_session_id ? String(record.quiz_session_id) : null,
    archetype: record.archetype ? String(record.archetype) : null,
    protocol_config: (record.protocol_config as OrderProtocolConfig) ?? {},
    amount_paid: typeof record.amount_paid === "number" ? record.amount_paid : null,
    status: String(record.status ?? "intent"),
    protocol_day: typeof record.protocol_day === "number" ? record.protocol_day : 0,
    order_date: String(record.order_date),
    updated_at: String(record.updated_at),
    users:
      rawUser && typeof rawUser === "object"
        ? {
            id: String((rawUser as Record<string, unknown>).id),
            email: String((rawUser as Record<string, unknown>).email),
            whatsapp_number:
              typeof (rawUser as Record<string, unknown>).whatsapp_number === "string"
                ? String((rawUser as Record<string, unknown>).whatsapp_number)
                : null,
            whatsapp_opted_in: Boolean((rawUser as Record<string, unknown>).whatsapp_opted_in),
            am_reminder_time:
              typeof (rawUser as Record<string, unknown>).am_reminder_time === "string"
                ? String((rawUser as Record<string, unknown>).am_reminder_time)
                : null,
            pm_reminder_time:
              typeof (rawUser as Record<string, unknown>).pm_reminder_time === "string"
                ? String((rawUser as Record<string, unknown>).pm_reminder_time)
                : null,
            created_at: String((rawUser as Record<string, unknown>).created_at),
            updated_at: String((rawUser as Record<string, unknown>).updated_at),
          }
        : null,
  };
}

export async function getOrderById(orderId: string) {
  const client = createServerClient();
  const { data, error } = await client.from("orders").select(ORDER_SELECT).eq("id", orderId).maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return normalizeOrderRecord(data);
}

export async function getAllOrders() {
  const client = createServerClient();
  const { data, error } = await client.from("orders").select(ORDER_SELECT).order("order_date", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []).map(normalizeOrderRecord).filter((record): record is OrderRecord => Boolean(record));
}
