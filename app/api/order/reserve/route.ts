import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidIndianWhatsApp, isValidUUID } from "@/lib/validation";

interface RequestBody {
  orderId: string;
  whatsappNumber?: string;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    if (!isValidUUID(body.orderId)) {
      return failure("VALIDATION_ERROR", 400, { fields: ["orderId"] });
    }

    const whatsappNumber = body.whatsappNumber?.trim();
    if (whatsappNumber && !isValidIndianWhatsApp(whatsappNumber)) {
      return failure("VALIDATION_ERROR", 400, { fields: ["whatsappNumber"] });
    }

    const client = createServerClient();
    const { data: order, error: orderError } = await client
      .from("orders")
      .select("id, user_id, status")
      .eq("id", body.orderId)
      .maybeSingle();

    if (orderError) {
      return failure("DB_ERROR", 500, { message: orderError.message });
    }

    if (!order?.user_id) {
      return failure("NOT_FOUND", 404, { message: "Order not found" });
    }

    if (whatsappNumber) {
      const { error: userError } = await client
        .from("users")
        .update({ whatsapp_number: whatsappNumber, whatsapp_opted_in: true })
        .eq("id", order.user_id);

      if (userError) {
        return failure("DB_ERROR", 500, { message: userError.message });
      }
    }

    if (order.status === "intent") {
      const { error: reserveError } = await client
        .from("orders")
        .update({ status: "reserved" })
        .eq("id", body.orderId);

      if (reserveError) {
        return failure("DB_ERROR", 500, { message: reserveError.message });
      }
    }

    return success({ success: true });
  } catch (error) {
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
