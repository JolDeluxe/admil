import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse } from "~/server/lib/types";

interface Carrera {
  id: number;
  nombre: string;
}

export const useCarrerasStore = defineStore("carreras", () => {
  const carreras = ref<Carrera[]>([]);
  const error = ref<string | null>(null);

  const getCarreras = async () => {
    error.value = null;

    try {
      const res = await $fetch<APIResponse<Carrera[]>>("http://localhost:3000/api/carreras", {
        method: "GET",
      });

      if (res.status === "success" && res.data) {
        console.log("Carreras recibidas:", res.data);  // Verifica que los datos lleguen correctamente
        carreras.value = res.data; // Asignamos los datos directamente
      } else if (res.error) {
        error.value = res.error;
      } else {
        error.value = "Error: Formato de respuesta inesperado.";
      }
    } catch (err: any) {
      error.value = err?.message || "Error al cargar la información.";
      console.error("Error al cargar las carreras:", err);
    }
  };

  return {
    getCarreras,
    carreras,
    error,
  };
});
