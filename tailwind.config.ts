import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        eonic: {
          bg: "#0A0D12",
          "bg-2": "#111520",
          surface: "#161B27",
          teal: "#00C9A7",
          "teal-dim": "rgba(0,201,167,0.12)",
          gold: "#C9A84C",
          "gold-dim": "rgba(201,168,76,0.12)",
          text: "#F0F2F7",
          "text-2": "#8A94A8",
          "text-muted": "#4A5568",
          border: "#1E2535",
          "border-active": "rgba(0,201,167,0.4)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      boxShadow: {
        card: "0 4px 24px rgba(0,0,0,0.4)",
        "glow-teal": "0 0 40px rgba(0,201,167,0.15)",
        "glow-gold": "0 0 40px rgba(201,168,76,0.12)",
      },
      animation: {
        drift: "drift 25s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out",
        "slide-in": "slideIn 0.25s ease-out",
      },
      keyframes: {
        drift: {
          "0%, 100%": { transform: "translate(0, 0) rotate(0deg)" },
          "33%": { transform: "translate(20px, -15px) rotate(1deg)" },
          "66%": { transform: "translate(-15px, 10px) rotate(-1deg)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "scale(0.97)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(24px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
