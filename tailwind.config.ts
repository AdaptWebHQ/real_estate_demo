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
        charcoal: {
          DEFAULT: "#111111",
          900: "#111111",
          800: "#181818",
          700: "#222222",
          600: "#333333",
          500: "#555555",
        },
        offwhite: {
          DEFAULT: "#F7F6F2",
          warm: "#FAF9F6",
          soft: "#F3F1EC",
        },
        gold: {
          DEFAULT: "#C8A96B",
          champagne: "#C8A96B",
          light: "#DFC798",
          dark: "#A6894C",
        },
        bronze: {
          DEFAULT: "#9D8050",
          muted: "#9D8050",
        },
        stone: {
          DEFAULT: "#8B887F",
          light: "#E8E5DE",
          border: "#E2DFC0",
          hover: "#78756C",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "3/4": "3 / 4",
      },
      boxShadow: {
        editorial: "0 20px 40px -15px rgba(17, 17, 17, 0.07)",
        card: "0 10px 30px -10px rgba(0, 0, 0, 0.05)",
        floating: "0 25px 50px -12px rgba(17, 17, 17, 0.25)",
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
