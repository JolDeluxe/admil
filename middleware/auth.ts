// middleware/auth.ts
import { defineNuxtRouteMiddleware, navigateTo, useCookie } from "nuxt/app";
import { isCookieValid } from "../server/utils/cookies";

export default defineNuxtRouteMiddleware((to) => {
  const cookie = useCookie<string | null>("s-login");

  if (to.path === "/login") {
    return;
  }

  if (!cookie.value || !isCookieValid(cookie.value)) {
    return navigateTo("/login");
  }
});
