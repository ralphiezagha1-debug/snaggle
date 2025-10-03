import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
          hover: "hsl(var(--primary-hover))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          hover: "hsl(var(--secondary-hover))",
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
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        snag: {
          neon: "#00FF80",
          neonStrong: "#00C46A",
          blue: "#007BFF",
          gold: "#E7B10A",
          charcoal: "#0D0D0D",
          navy: "#0A0F24",
          purple: "#1B1036",
        },
        snaggle: {
          purple: "hsl(var(--snaggle-purple))",
          "purple-dark": "hsl(var(--snaggle-purple-dark))",
          "purple-light": "hsl(var(--snaggle-purple-light))",
          gold: "hsl(var(--snaggle-gold))",
          "gold-dark": "hsl(var(--snaggle-gold-dark))",
          "gold-light": "hsl(var(--snaggle-gold-light))",
          green: "hsl(var(--snaggle-green))",
          "green-dark": "hsl(var(--snaggle-green-dark))",
          "green-light": "hsl(var(--snaggle-green-light))",
        },
      },
      boxShadow: {
        "glow-sm": "var(--shadow-glow-sm)",
        "glow-md": "var(--shadow-glow-md)",
        "glow-lg": "var(--shadow-glow-lg)",
        card: "var(--shadow-card)",
        button: "var(--shadow-button)",
        glow: "0 0 14px rgba(0,255,128,0.35)",
        glowSoft: "0 0 8px rgba(0,255,128,0.22)",
      },
      backgroundImage: {
        "gradient-radial": "var(--gradient-radial)",
        "gradient-hero": "var(--gradient-hero)",
        "gradient-card": "var(--gradient-card)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl2: "1rem",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
