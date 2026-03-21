import { createServerClient } from "@/lib/supabase/server";
import { failure, parseJson, success } from "@/lib/api";
import { isValidEmail, isValidIndianWhatsApp, isValidTime, isValidUUID } from "@/lib/validation";
import { recordStateEvent } from "@/lib/state-events";

interface RequestBody {
  sessionUuid: string;
  email: string;
  whatsappNumber?: string;
  whatsappOptedIn: boolean;
  amReminderTime?: string;
  pmReminderTime?: string;
}

export async function POST(request: Request) {
  try {
    const body = await parseJson<RequestBody>(request);
    const invalidFields: string[] = [];
    if (!isValidUUID(body.sessionUuid)) invalidFields.push("sessionUuid");
    if (!isValidEmail(body.email)) invalidFields.push("email");
    if (body.whatsappOptedIn && !body.whatsappNumber) invalidFields.push("whatsappNumber");
    if (body.whatsappNumber && !isValidIndianWhatsApp(body.whatsappNumber)) invalidFields.push("whatsappNumber");
    if (body.amReminderTime && !isValidTime(body.amReminderTime)) invalidFields.push("amReminderTime");
    if (body.pmReminderTime && !isValidTime(body.pmReminderTime)) invalidFields.push("pmReminderTime");
    if (invalidFields.length > 0) {
      return failure("VALIDATION_ERROR", 400, { fields: invalidFields });
    }

    const client = createServerClient();
    const { data: user, error: upsertError } = await client
      .from("users")
      .upsert(
        {
          email: body.email,
          whatsapp_number: body.whatsappNumber ?? null,
          whatsapp_opted_in: body.whatsappOptedIn,
          am_reminder_time: body.whatsappOptedIn ? body.amReminderTime ?? null : null,
          pm_reminder_time: body.whatsappOptedIn ? body.pmReminderTime ?? null : null,
        },
        { onConflict: "email" },
      )
      .select("id")
      .single();

    if (upsertError || !user) {
      return failure("DB_ERROR", 500, { message: upsertError?.message ?? "User upsert failed" });
    }

    await client.from("quiz_sessions").update({ user_id: user.id }).eq("session_uuid", body.sessionUuid);

    await recordStateEvent(client, {
      userId: user.id,
      eventType: "email_captured",
      eventData: { whatsapp_opted_in: body.whatsappOptedIn },
    });

    return success({ success: true, userId: user.id });
  } catch (error) {
    return failure("DB_ERROR", 500, { message: error instanceof Error ? error.message : "Unknown error" });
  }
}
