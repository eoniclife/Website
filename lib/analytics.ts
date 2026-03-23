"use client";

interface AnalyticsEventInput {
  event: string;
  sessionUuid?: string | null;
  userId?: string | null;
  orderId?: string | null;
  data?: Record<string, unknown>;
}

function sendEvent(body: AnalyticsEventInput) {
  const payload = JSON.stringify(body);

  if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
    const blob = new Blob([payload], { type: "application/json" });
    const queued = navigator.sendBeacon("/api/analytics/event", blob);
    if (queued) {
      return;
    }
  }

  void fetch("/api/analytics/event", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => {
    // Avoid surfacing analytics failures to users.
  });
}

export function trackEvent(input: AnalyticsEventInput) {
  sendEvent(input);
}
