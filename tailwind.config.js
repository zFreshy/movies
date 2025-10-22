/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem"
    },
    extend: {
      colors: {
        background: "var(--bg)",
        foreground: "var(--text)",
        card: "var(--card)",
        muted: "var(--muted)",
        primary: "var(--primary)",
        accent: "var(--accent)",
        ring: "var(--ring)"
      },
      boxShadow: {
        soft: "0 8px 30px rgba(0,0,0,0.2)",
        glow: "0 0 40px rgba(124,58,237,0.35)"
      },
      backdropBlur: {
        xs: "2px"
      },
      borderRadius: {
        xl: "1rem"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.22, 1, 0.36, 1)"
      }
    },
  },
  plugins: [],
};
