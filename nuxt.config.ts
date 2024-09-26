// https://nuxt.com/docs/api/configuration/nuxt-config
const myCustomLightTheme = {
  dark: false,
  colors: {
    VerdeMilitar: "#0C231E",
    VerdeSecondary: "#13322b",
  },
};
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@pinia/nuxt", "vuetify-nuxt-module"],
  css: [
    "~/assets/css/main.css",
    "vue-toast-notification/dist/theme-default.css",
  ],
  app: {
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      title: "Admil | Escuela ",
    },
  },
  vuetify: {
    vuetifyOptions: {
      theme: {
        defaultTheme: "myCustomLightTheme",
        themes: {
          myCustomLightTheme,
        },
      },
    },
  },
});
