/** @type {import('tailwindcss').Config} */
module.exports = {
  // Classes are written in the HTML shell and in the JS that renders each section.
  content: ["./site/index.html", "./site/assets/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        // Theme colours come from CSS variables (src/tailwind.css) so the
        // whole site follows the device's light/dark setting.
        ink: {
          950: "rgb(var(--ink-950) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
          600: "rgb(var(--ink-600) / <alpha-value>)",
          500: "rgb(var(--ink-500) / <alpha-value>)"
        },
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        soft: "rgb(var(--soft) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        // Brand colours: pink for the institution, fading into violet.
        brand: {
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d"
        }
      },
      fontFamily: {
        sans: ["Inter", "IBM Plex Sans Thai", "Noto Sans JP", "Noto Sans SC", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"]
      },
      backgroundImage: {
        grad: "linear-gradient(135deg, #ec4899 0%, #c026d3 55%, #a855f7 100%)",
        "grad-text": "linear-gradient(100deg, #f472b6 0%, #e879f9 40%, #a855f7 60%, #f472b6 100%)",
        orb: "radial-gradient(circle at 35% 30%, #f472b6, #c026d3 50%, #6d28d9 100%)",
        dots: "radial-gradient(circle, rgb(var(--dot)) 1.4px, transparent 1.6px)"
      },
      boxShadow: {
        glow: "0 8px 24px rgba(236, 72, 153, .35)",
        "glow-lg": "0 12px 32px rgba(236, 72, 153, .5)",
        orb: "0 0 80px rgba(192, 38, 211, .45), inset 0 0 40px rgba(255, 255, 255, .15)",
        card: "0 24px 60px rgba(0, 0, 0, .5), 0 0 0 1px rgba(236, 72, 153, .25)",
        float: "0 20px 50px rgba(0, 0, 0, .55)"
      },
      keyframes: {
        float: { "0%, 100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        shimmer: { "0%, 100%": { backgroundPosition: "0% 0" }, "50%": { backgroundPosition: "100% 0" } },
        drift: { to: { transform: "translate(-8px, 10px)" } },
        beat: { "0%, 100%": { transform: "scale(1)" }, "15%": { transform: "scale(1.25)" }, "30%": { transform: "scale(1)" } }
      },
      animation: {
        float: "float 8s ease-in-out infinite",
        "float-rev": "float 7s ease-in-out infinite reverse",
        shimmer: "shimmer 6s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite alternate",
        beat: "beat 1.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};
