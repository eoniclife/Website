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
          bg: "#F6F3EE",
          "bg-2": "#FFFFFF",
          surface: "#EDEAE4",
          teal: "#007A65",
          "teal-dim": "rgba(0,122,101,0.08)",
          gold: "#9B6700",
          "gold-dim": "rgba(155,103,0,0.08)",
          text: "#111110",
          "text-2": "#52504C",
          "text-muted": "#9A9793",
          border: "#E2DDD7",
          "border-active": "#007A65",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        card: "16px",
        button: "12px",
      },
      boxShadow: {
        card: "0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        "glow-teal": "0 0 0 2px rgba(0,122,101,0.25)",
        "glow-gold": "0 0 0 2px rgba(155,103,0,0.15)",
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
