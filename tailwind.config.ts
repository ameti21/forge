import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forge: {
          50: "#eef2ff",
          100: "#e0e7ff",
          200: "#c7d2fe",
          300: "#a5b4fc",
          400: "#818cf8",
          500: "#6d5dfc",
          600: "#5b46e8",
          700: "#4c3bcf",
          800: "#3e32a8",
          900: "#362d85",
        },
      },
    },
  },
  plugins: [],
};

export default config;
