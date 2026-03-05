import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },

      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },

        shimmer: {
          "0%": { left: "-100%" },
          "100%": { left: "100%" },
        },

        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },

        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },

        "float-slow": {
          "0%, 100%": { transform: "translateY(-12px)" },
          "50%": { transform: "translateY(12px)" },
        },

        drift: {
          "0%": { transform: "translate(0px, 0px) rotate(0deg)" },
          "25%": { transform: "translate(14px, -10px) rotate(2deg)" },
          "50%": { transform: "translate(-10px, 10px) rotate(-2deg)" },
          "75%": { transform: "translate(-14px, -8px) rotate(1deg)" },
          "100%": { transform: "translate(0px, 0px) rotate(0deg)" },
        },

        "center-dash": {
          "0%": { transform: "scale(1) translate(0,0)" },
          "50%": { transform: "scale(1.06) translate(0,-8px)" },
          "100%": { transform: "scale(1) translate(0,0)" },
        },

        fall: {
          "0%": { transform: "translateY(-10px)", opacity: "1" },
          "50%": { transform: "translateY(20px)", opacity: ".8" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },

        "fade-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        }
      },

      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 3s infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 7s ease-in-out infinite",
        drift: "drift 6s ease-in-out infinite",
        "center-dash": "center-dash 5s ease-in-out infinite",
        fall: "fall 6s ease-in-out infinite",
        "fade-up": "fade-up 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
