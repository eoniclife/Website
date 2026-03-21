import type { SupabaseClient } from "@supabase/supabase-js";

interface StateEventInput {
  userId?: string | null;
  orderId?: string | null;
  eventType: "quiz_started" | "quiz_completed" | "email_captured" | "order_intent";
  eventData: Record<string, unknown>;
}

export async function recordStateEvent(client: SupabaseClient, input: StateEventInput) {
  const payload = {
    user_id: input.userId ?? null,
    order_id: input.orderId ?? null,
    event_type: input.eventType,
    event_data: input.eventData,
  };

  const { error } = await client.from("state_events").insert(payload);
  if (error) {
    console.error("Failed to write state event", input.eventType, error);
  }
}
