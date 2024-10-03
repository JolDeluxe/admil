import type { APIResponse } from "~/server/lib/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie<string | null>("s-login");

  if (to.path === "/login") {
    return;
  }

  if (!cookie.value) {
    return navigateTo("/login");
  }

  const response = await $fetch<
    APIResponse<{ id: number; email: string; nombre: string; rol: string }>
  >("/api/verify-token", {
    method: "POST",
    body: { token: cookie.value },
  });

  if (response.status === "error" || !response.data) {
    return navigateTo("/login");
  }

  // const { id, email, nombre, rol } = response.data;
});
