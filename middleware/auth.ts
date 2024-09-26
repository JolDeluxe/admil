// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";
import { isCookieValid } from "../server/utils/cookies";

export default defineNuxtRouteMiddleware((to) => {
  const cookie = useCookie<string | null>("s-login");

  // Excluir la página de login del middleware
  if (to.path === "/login") {
    return;
  }

  // Si la cookie no es válida o no existe, redirigir al login
  if (!cookie.value || !isCookieValid(cookie.value)) {
    return navigateTo("/login");
  }
});
