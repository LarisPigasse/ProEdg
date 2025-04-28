/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      fontSize: {
        xxs: ["0.625rem", { lineHeight: "0.75rem" }], // size e line-height
      },
      colors: {
        primary: {
          // Si possono definire colori personalizzati se necessario
        },
      },
      textRendering: {
        "optimize-legibility": "optimizeLegibility",
      },
      fontSynthesis: {
        none: "none",
      },
    },
  },
  plugins: [],
};
