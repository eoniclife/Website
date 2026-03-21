"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/shared/Button";
import { useQuizStore } from "@/lib/quiz/store";
import type { RecommendationResult } from "@/lib/quiz/types";

interface CaptureResponse {
  success: boolean;
  userId?: string;
  error?: string;
}

interface OrderIntentResponse {
  success: boolean;
  redirectUrl?: string;
  error?: string;
}

export function EmailCapture({ recommendation }: { recommendation: RecommendationResult }) {
  const router = useRouter();
  const { sessionUuid, userId, setUserId } = useQuizStore();
  const [email, setEmail] = useState("");
  const [whatsAppOptIn, setWhatsAppOptIn] = useState(false);
  const [whatsAppNumber, setWhatsAppNumber] = useState("");
  const [amReminderTime, setAmReminderTime] = useState("08:00");
  const [pmReminderTime, setPmReminderTime] = useState("21:30");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleCapture() {
    if (!sessionUuid) {
      setMessage("Your quiz session is missing. Please restart the quiz.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/user/capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionUuid,
          email,
          whatsappNumber: whatsAppOptIn ? whatsAppNumber : undefined,
          whatsappOptedIn: whatsAppOptIn,
          amReminderTime: whatsAppOptIn ? amReminderTime : undefined,
          pmReminderTime: whatsAppOptIn ? pmReminderTime : undefined,
        }),
      });

      const payload = (await response.json()) as CaptureResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "CAPTURE_FAILED");
      }

      if (!payload.userId) {
        throw new Error("CAPTURE_FAILED");
      }

      setUserId(payload.userId);
      setMessage("Details saved. You can start your protocol whenever you're ready.");
    } catch (error) {
      console.error(error);
      setMessage("Couldn't save your details. Check the form and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleOrderIntent() {
    if (!sessionUuid) {
      setMessage("Your session is missing. Please restart the quiz.");
      return;
    }

    setSubmitting(true);
    setMessage(null);

    try {
      const response = await fetch("/api/order/intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionUuid,
          userId,
          protocolConfig: {
            base: [
              "Vitamin D3 + K2 (MK-7)",
              "Methylcobalamin B12",
              "Magnesium Glycinate",
              "Omega-3 (EPA + DHA)",
              "Ashwagandha KSM-66",
              "Zinc Bisglycinate",
            ],
            primaryModule: recommendation.primaryModule,
            secondaryModule: recommendation.secondaryModule,
            archetype: recommendation.archetype,
            isVegetarian: recommendation.isVegetarian,
          },
        }),
      });

      const payload = (await response.json()) as OrderIntentResponse;
      if (!response.ok) {
        throw new Error(payload.error ?? "ORDER_INTENT_FAILED");
      }

      if (!payload.redirectUrl) {
        throw new Error("ORDER_INTENT_FAILED");
      }

      router.push(payload.redirectUrl);
    } catch (error) {
      console.error(error);
      setMessage("Couldn't log your order intent right now. Try again in a moment.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="rounded-[28px] border border-eonic-border bg-eonic-bg-2 p-7">
      <h2 className="font-display text-3xl text-eonic-text">Get your protocol — and let us make sure it actually works.</h2>
      <div className="mt-6 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm text-eonic-text-2">Email address</span>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            type="email"
            className="min-h-[56px] w-full rounded-[10px] border border-eonic-border bg-eonic-bg px-4 text-eonic-text outline-none transition focus:border-eonic-border-active"
            placeholder="you@example.com"
          />
        </label>

        <div className="rounded-card border border-eonic-border bg-eonic-surface p-5">
          <p className="text-lg text-eonic-text">Would you like us to remind you to take your supplements?</p>
          <p className="mt-2 text-sm leading-6 text-eonic-text-2">We&apos;ll message you at your preferred times. Nothing else. No marketing.</p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Button variant={whatsAppOptIn ? "primary" : "secondary"} className="sm:flex-1" onClick={() => setWhatsAppOptIn(true)}>
              Yes, remind me
            </Button>
            <Button variant={!whatsAppOptIn ? "primary" : "ghost"} className="sm:flex-1" onClick={() => setWhatsAppOptIn(false)}>
              Not right now
            </Button>
          </div>

          {whatsAppOptIn ? (
            <div className="mt-5 space-y-4">
              <label className="block">
                <span className="mb-2 block text-sm text-eonic-text-2">WhatsApp number</span>
                <input
                  value={whatsAppNumber}
                  onChange={(event) => setWhatsAppNumber(event.target.value)}
                  className="min-h-[56px] w-full rounded-[10px] border border-eonic-border bg-eonic-bg px-4 text-eonic-text outline-none focus:border-eonic-border-active"
                  placeholder="+919876543210"
                />
              </label>
              <div className="grid gap-4 md:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm text-eonic-text-2">AM reminder</span>
                  <input
                    type="time"
                    value={amReminderTime}
                    onChange={(event) => setAmReminderTime(event.target.value)}
                    className="min-h-[56px] w-full rounded-[10px] border border-eonic-border bg-eonic-bg px-4 text-eonic-text outline-none focus:border-eonic-border-active"
                  />
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-eonic-text-2">PM reminder</span>
                  <input
                    type="time"
                    value={pmReminderTime}
                    onChange={(event) => setPmReminderTime(event.target.value)}
                    className="min-h-[56px] w-full rounded-[10px] border border-eonic-border bg-eonic-bg px-4 text-eonic-text outline-none focus:border-eonic-border-active"
                  />
                </label>
              </div>
              <p className="text-sm text-eonic-text-muted">
                We&apos;ll reach out to confirm this number via WhatsApp before adding you to any reminder flow.
              </p>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button className="sm:flex-1" onClick={handleCapture} disabled={submitting}>
            Save my details
          </Button>
          <Button variant="secondary" className="sm:flex-1" onClick={handleOrderIntent} disabled={submitting}>
            Start your 90-day protocol — ₹3,999
          </Button>
        </div>
        <p className="text-sm text-eonic-text-muted">
          AM capsule strip + PM powder sachet • Free shipping • Researched ingredients, every one • Cancel after first protocol
        </p>
        <Button href="/free-protocol" variant="ghost" className="w-full">
          → Get your free exercise and nutrition protocol
        </Button>
        {message ? <p className="text-sm text-eonic-gold">{message}</p> : null}
      </div>
    </section>
  );
}
