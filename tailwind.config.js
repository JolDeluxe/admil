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
        // primary: "#000000",
        // secondary: "#3E787A",
        // white: "#FFFFFF",
        // grisFondo: "#F4F5F0",
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