import type { APIResponse } from "~/server/lib/types";

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie<string | null>("s-login");

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

  const { rol } = response.data;

  const rutasPorRol: Record<string, string[]> = {
    "/roles": ["Informatica"],
    "/usuarios": ["Informatica"],
    "/administrativo": ["Recursos Humanos"],
  };

  const rolesPermitidos = rutasPorRol[to.path];

  if (rolesPermitidos && !rolesPermitidos.includes(rol)) {
    return navigateTo("/");
  }
});
