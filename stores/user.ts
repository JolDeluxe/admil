import type { APIResponse } from "~/server/lib/types";
import type { Usuario } from "@prisma/client";
import { useToast } from "vue-toast-notification";

interface UsuarioParcial {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  estatus: string;
}

export const useUsersStore = defineStore("users", () => {
  const usuarios = ref<UsuarioParcial[]>([]);
  const error = ref<string | null>(null);
  const toast = useToast();

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

  const newUser = async (
    nombre: string,
    apellidos: string,
    email: string,
    contraseña: string,
  ) => {
    try {
      const res = await $fetch<APIResponse<Usuario>>("/api/usuarios", {
        method: "POST",
        body: {
          nombre,
          apellidos,
          email,
          contraseña,
        },
      });

      if (res.status === "success") {
        toast.success("Se ha generado un nuevo usuario con éxito");
      } else {
        toast.error(res.error || "Error al generar el usuario");
      }
    } catch (error: any) {
      toast.error(error.message || "Error al generar el usuario");
    }
  };


  return {
    getUsuarios,
    newUser,
    usuarios,
    error,
  };
});
