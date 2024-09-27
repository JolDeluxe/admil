import type { APIResponse } from "~/server/lib/types";

interface UsuarioParcial {
  nombre: string;
  apellidos: string;
  email: string;
  rol: {
    nombre: string;
  };
}

export const useUsersStore = defineStore("users", () => {
  const usuarios = ref<UsuarioParcial[]>([]);
  const error = ref<string | null>(null);

  const getUsuarios = async () => {
    error.value = null;

    try {
      const res = await $fetch<APIResponse<UsuarioParcial[]>>("/api/usuarios", {
        method: "GET",
      });

      if (res.status === "success" && res.data) {
        usuarios.value = res.data;
      } else if (res.error) {
        error.value = res.error;
      } else {
        error.value = "Error: Formato de respuesta inesperado.";
      }
    } catch (err: any) {
      error.value = err?.message || "Error al cargar la información.";
      console.error("Error al cargar los usuarios:", err);
    }
  };

  return {
    getUsuarios,
    usuarios,
    error,
  };
});
