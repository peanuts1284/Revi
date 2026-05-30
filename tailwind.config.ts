import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      colors: {
        bg:      "#0D1F1A",
        surface: "#122B23",
        forest:  "#1E3D32",
        gold: {
          DEFAULT: "#C9A84C",
          light:   "#E8C76A",
        },
        cream:   "#F0EDE6",
        sage:    "#7A9E8E",
        ink:     "#3d6050",
        success: "#4ADE80",
      },
      letterSpacing: {
        tightest: "-0.03em",
        tighter:  "-0.02em",
        tight:    "-0.015em",
      },
    },
  },
  plugins: [],
};

export default config;
