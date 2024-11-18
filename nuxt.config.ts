// https://nuxt.com/docs/api/configuration/nuxt-config
const myCustomLightTheme = {
  dark: false,
  colors: {
    Principal: "#C91A1A",
    VerdeSecondary: "#13322b",
    MarronFuerte: "#4B3A30",
    VerdeCamuflajeClaro: "#6B8E23",
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
      title: "InnovaTube",
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
