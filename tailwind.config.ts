import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Architectural Color Palette
        ivory: {
          DEFAULT: "#F5F2EA",
          warm: "#F5F2EA",
        },
        sand: {
          DEFAULT: "#E8E1D5",
          soft: "#E8E1D5",
        },
        warmwhite: {
          DEFAULT: "#FCFBF8",
        },
        forest: {
          DEFAULT: "#18221F",
          deep: "#18221F",
          charcoal: "#222B28",
        },
        charcoal: {
          DEFAULT: "#303633",
          soft: "#303633",
          green: "#222B28",
          dark: "#18221F",
          900: "#18221F",
          800: "#222B28",
          700: "#303633",
        },
        terracotta: {
          DEFAULT: "#B86F52",
          muted: "#B86F52",
        },
        bronze: {
          DEFAULT: "#A9825B",
          warm: "#A9825B",
        },
        sage: {
          DEFAULT: "#8B9A87",
        },
        // Backwards compatibility aliases
        offwhite: {
          DEFAULT: "#F5F2EA",
          warm: "#FCFBF8",
          soft: "#E8E1D5",
        },
        gold: {
          DEFAULT: "#A9825B",
          champagne: "#A9825B",
          light: "#B86F52",
          dark: "#18221F",
        },
        stone: {
          DEFAULT: "#303633",
          light: "#E8E1D5",
          border: "#D8D0C3",
          hover: "#222B28",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Playfair Display", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "3/4": "3 / 4",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(24, 34, 31, 0.08)",
        card: "0 10px 30px -10px rgba(24, 34, 31, 0.05)",
        floating: "0 25px 50px -12px rgba(24, 34, 31, 0.18)",
      },
      animation: {
        "slow-zoom": "slowZoom 20s infinite alternate ease-in-out",
        "fade-in-up": "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        slowZoom: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.08)" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
