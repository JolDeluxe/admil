import type { APIResponse } from "~/server/lib/types";
import type { Roles } from "@prisma/client";
import { useToast } from "vue-toast-notification";

export const useRolStore = defineStore("roles", () => {
  const roles = ref<Roles[]>([]);
  const error = ref<string | null>(null);
  const toast = useToast();

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

  const newRol = async (nombre: string) => {
    try {
      const res = await $fetch<APIResponse<Roles>>("/api/rol", {
        method: "POST",
        body: {
          nombre,
        },
      });

      if (res.status === "success") {
        toast.success("Se ha generado un nuevo rol con éxito");
      } else {
        toast.error(res.error || "Error al generar el rol");
      }
    } catch (error: any) {
      toast.error(error.message || "Error al generar el rol");
    }
  };

  const updateRol = async (rolId: number, nombre: string) => {
    try {
      const res = await $fetch<APIResponse<Roles>>(`/api/rol/${rolId}`, {
        method: "PUT",
        body: {
          nombre,
        },
      });

      if (res.status === "success") {
        toast.success(`Se ha modificado ${nombre} con éxito`);
      } else {
        toast.error(res.error || `Error al modificar el rol ${nombre}`);
      }
    } catch (error: any) {
      toast.error(error.message || `Error al modificar el rol ${nombre}`);
    }
  };

  return {
    getRoles,
    newRol,
    updateRol,
    roles,
    error,
  };
});
