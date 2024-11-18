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
        Principal: "#BE1717",
        VerdeSecondary: "#13322b",
        MarronFuerte: "#4B3A30",
        VerdeCamuflajeClaro: "#6B8E23",
        grisFondo: "#F4F5F0",
      },
      fontFamily: {
        archivo: ["Archivo", "sans-serif"],
      },
      maxWidth: {
        // "8xl": "1312px",
      },
      fontSize: {
        '9xl': '8rem',  // Tamaño predefinido más grande
        '10xl': '10rem', // Nuevo tamaño agregado
        '11xl': '12rem', // Otro tamaño más grande
        '12xl': '14rem', // Puedes seguir añadiendo más
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
