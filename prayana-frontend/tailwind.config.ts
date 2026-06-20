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
        brand: {
          primary: "#0F4C81",   // Deep Ocean Blue
          secondary: "#38BDF8", // Sky Blue
          accent: "#F97316",    // Sunset Orange
          success: "#10B981",   // Emerald Green
          bg: "#F8FAFC",        // Off White
          text: "#1E293B",      // Slate Gray
        }
      },
    },
  },
  plugins: [],
};
export default config;