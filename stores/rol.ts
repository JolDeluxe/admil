import type { APIResponse } from "~/server/lib/types";
import type { Roles } from "@prisma/client";

export const useRolStore = defineStore("roles", () => {
  const roles = ref<Roles[]>([]);
  const error = ref<string | null>(null);

  const getRoles = async () => {
    error.value = null;

    try {
      const res = await $fetch<APIResponse<Roles[]>>("/api/rol", {
        method: "GET",
      });

      if (res.status === "success" && res.data) {
        roles.value = res.data;
      } else if (res.error) {
        error.value = res.error;
      } else {
        error.value = "Error: Formato de respuesta inesperado.";
      }
    } catch (err: any) {
      error.value = err?.message || "Error al cargar la información.";
      console.error("Error al cargar los roles:", err);
    }
  };

  return {
    getRoles,
    roles,
    error,
  };
});
