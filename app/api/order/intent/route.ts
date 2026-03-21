import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";

interface RequestBody {
  sessionUuid: string;
  userId?: string | null;
  protocolConfig: {
    base: string[];
    primaryModule: string | null;
    secondaryModule: string | null;
    archetype: string;
    isVegetarian: boolean;
  };
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    if (!isValidUUID(body.sessionUuid)) {
      return failure("VALIDATION_ERROR", 400, { fields: ["sessionUuid"] });
    }

    const client = createServerClient();
    const { data: session } = await client
      .from("quiz_sessions")
      .select("id, user_id, completed_at")
      .eq("session_uuid", body.sessionUuid)
      .maybeSingle();

    const userId = body.userId ?? session?.user_id ?? null;
    if (!userId) {
      return failure("VALIDATION_ERROR", 400, { fields: ["userId"] });
    }

    const quizSessionId = session?.completed_at ? session.id : null;
    const { data: order, error } = await client
      .from("orders")
      .insert({
        user_id: userId,
        quiz_session_id: quizSessionId,
        archetype: body.protocolConfig.archetype,
        protocol_config: body.protocolConfig,
        status: "intent",
      })
      .select("id")
      .single();

    if (error || !order) {
      return failure("DB_ERROR", 500, { message: error?.message ?? "Order insert failed" });
    }

    await recordStateEvent(client, {
      userId,
      orderId: order.id,
      eventType: "order_intent",
      eventData: {
        protocol_config: body.protocolConfig,
        archetype: body.protocolConfig.archetype,
      },
    });

    return success({
      success: true,
      orderId: order.id,
      redirectUrl: `/shop?order=${order.id}`,
    });
  } catch (error) {
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
