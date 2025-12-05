import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Eonic – Health autopilot for high-agency people",
  description:
    "Eonic Baseline is a 90-day, pill-first health autopilot for busy, ambitious people who want better energy, sleep, and focus—without becoming full-time biohackers.",
  metadataBase: new URL("https://eonic.life"),
  openGraph: {
    title: "Eonic – Health autopilot for high-agency people",
    description:
      "A daily, science-backed micro-stack that keeps your biology on autopilot.",
    url: "https://eonic.life",
    siteName: "Eonic",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Eonic – Health autopilot for high-agency people",
    description:
      "A 90-day, pill-first health autopilot for energy, focus, sleep, and long-run healthspan."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="page-root">{children}</div>
      </body>
    </html>
  );
}
