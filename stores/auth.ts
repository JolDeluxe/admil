import type { APIResponse } from "~/server/lib/types";
import { useToast } from "vue-toast-notification";

interface datosToken {
  id: number;
  nombre: string;
  email: string;
  rol: string;
}

export const useDatoStore = defineStore("Dato", () => {
  const usuario = ref<datosToken>();
  const error = ref<string | null>(null);
  const toast = useToast();
  const token = useCookie<string | null>("s-login");

  const getUsuario = async () => {
    error.value = null;
    try {
      const res = await $fetch<APIResponse<datosToken>>("/api/verify-token", {
        method: "POST",
        body: { token: token.value },
      });

      if (res.status === "success" && res.data) {
        usuario.value = res.data;
      } else if (res.error) {
        error.value = res.error;
      } else {
        error.value = "Error: Formato de respuesta inesperado.";
      }
    } catch (err: any) {
      error.value = err?.message || "Error al cargar la información.";
      console.error("Error al cargar los usuarios:", err);
    }

    if (error.value) {
      toast.error(error.value);
    }
  };

  return {
    getUsuario,
    usuario,
    error,
  };
});
