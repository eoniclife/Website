"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";

interface ReservationFormProps {
  orderId: string;
  existingWhatsAppNumber: string | null;
}

interface ReserveResponse {
  success: boolean;
  error?: string;
  fields?: string[];
}

export function ReservationForm({ orderId, existingWhatsAppNumber }: ReservationFormProps) {
  const router = useRouter();
  const [whatsappNumber, setWhatsappNumber] = useState(existingWhatsAppNumber ?? "");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const needsPhone = !existingWhatsAppNumber;

  async function handleSubmit() {
    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/order/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          whatsappNumber: whatsappNumber.trim() || undefined,
        }),
      });

      const payload = (await response.json()) as ReserveResponse;
      if (!response.ok) {
        if (payload.fields?.includes("whatsappNumber")) {
          throw new Error("Please enter a valid WhatsApp number in +91 format.");
        }
        throw new Error(payload.error ?? "RESERVE_FAILED");
      }

      setMessage("Reservation confirmed. Watch for our WhatsApp message.");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Couldn't confirm the reservation right now.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-4 rounded-[24px] border border-eonic-border bg-eonic-bg-2 p-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl text-eonic-text">Confirm your reservation</h2>
        <p className="text-sm leading-7 text-eonic-text-2">
          {needsPhone
            ? "If you'd like us to reach out on WhatsApp, add the number below. This is optional, but it is the fastest way for us to confirm your order."
            : "We already have a WhatsApp number on file. You can update it here if you want us to use a different one."}
        </p>
      </div>

      {needsPhone ? (
        <label className="block">
          <span className="mb-2 block text-sm text-eonic-text-2">WhatsApp number (optional)</span>
          <input
            value={whatsappNumber}
            onChange={(event) => setWhatsappNumber(event.target.value)}
            className="min-h-[56px] w-full rounded-[10px] border border-eonic-border bg-eonic-bg px-4 text-eonic-text outline-none transition focus:border-eonic-border-active"
            placeholder="+919876543210"
          />
        </label>
      ) : (
        <div className="rounded-[16px] border border-eonic-border bg-eonic-bg px-4 py-4">
          <p className="text-sm text-eonic-text-2">WhatsApp number on file</p>
          <p className="mt-2 font-mono text-sm text-eonic-text">{existingWhatsAppNumber}</p>
        </div>
      )}

      <Button className="w-full" onClick={handleSubmit} disabled={submitting}>
        Confirm my reservation
      </Button>

      {message ? <p className="text-sm text-eonic-gold">{message}</p> : null}
    </div>
  );
}
