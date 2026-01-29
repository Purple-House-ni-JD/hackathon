/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"], // <--- Sets Inter as default
      },
      colors: {
        ustp: {
          navy: "#0F2A44",
          gold: "#F2B705",
        },
        status: {
          approved: "#2E8B57",
          pending: "#F2B705",
          rejected: "#C0392B",
        },
        neutral: {
          light: "#F5F7FA",
          dark: "#333333",
        },
      },
    },
  },
  plugins: [],
};
