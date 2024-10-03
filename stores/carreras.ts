import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse } from "~/server/lib/types";

interface Carrera {
  nombre: string;
}

export const useCarrerasStore = defineStore("carreras", () => {
  const carreras = ref<Carrera[]>([]);
  const error = ref<string | null>(null);

  const getCarreras = async () => {
    error.value = null;
    try {
      const res = await $fetch<Carrera[]>("http://localhost:4002/api/carreras", {
        method: "GET",
      });
      carreras.value = res
    } catch (err: any) {
      error.value = err?.message || "Error al cargar la información.";
      console.error("Error al cargar los usuarios:", err);
    }
  };

  const newCarrer = async (
    nombre: string,
  ) => {
    try {
      const res = await $fetch<APIResponse<Carrera>>("http://localhost:4002/api/carreras", {
        method: "POST",
        body: {
          nombre,
        },
      });

      if (res.status === "success") {
        alert("Se ha generado un nuevo usuario con éxito");
      } else {
        alert(res.error || "Error al generar el usuario");
      }
    } catch (error: any) {
        alert(error.message || "Error al generar el usuario");
    }
  };

  // const updateCarrer = async (
  //   nombre: string,
  // ) => {
  //   try {
  //     const res = await $fetch<APIResponse<Carrera>>(
  //       `http://localhost:4002/api/carreras/${carrerId}`,
  //       {
  //         method: "PUT",
  //         body: {
  //           nombre,
  //         },
  //       }
  //     );

  //     if (res.status === "success") {
  //       alert(`Se ha modificado ${nombre} con éxito`);
  //     } else {
  //       alert(res.error || `Error al modificar el usuario ${nombre}`);
  //     }
  //   } catch (error: any) {
  //     alert(error.message || `Error al modificar el usuario ${nombre}`);
  //   }
  // };

  return {
    getCarreras,
    // updateCarrer,
    newCarrer,
    carreras,
    error,
    
  };
});
