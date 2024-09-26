/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        VerdeMilitar: "#0C231E",
        VerdeSecondary: "#13322b",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      maxWidth: {
        // "8xl": "1312px",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
