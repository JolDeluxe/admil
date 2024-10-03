import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { APIResponse } from "~/server/lib/types";

interface Grupo {
  id: number;
  nombre_grupo: string;
  periodo: string;
  carreraId: number;
  profesor: string;
  alumnos: string[]; // Se almacenará como un array
}

export const useGruposStore = defineStore("grupos", () => {
  const grupos = ref<Grupo[]>([]);
  const error = ref<string | null>(null);

  const getGrupos = async () => {
    error.value = null;
    try {
      const res = await $fetch<Grupo[]>("http://localhost:4002/api/grupos", {
        method: "GET",
      });

      grupos.value = res
    } catch (err: any) {
      error.value = err?.message || "Error al cargar los grupos.";
      console.error("Error al cargar los grupos:", err);
    }
  };

  const newGrupo = async (
    nombre_grupo: string,
    periodo: string,
    carreraId: number,
    profesor: string,
    alumnos: string[]
  ) => {
    try {
      const res = await $fetch<Grupo>("http://localhost:4002/api/grupos", {
        method: "POST",
        body: {
          nombre_grupo,
          periodo,
          carreraId,
          profesor,
          alumnos,
        },
      });

      // if (res.status === "success") {
      //   alert("Se ha creado un nuevo grupo con éxito");
      //   await getGrupos(); // Refrescar la lista de grupos después de la creación
      // } else {
      //   alert(res.error || "Error al crear el grupo");
      // }
    } catch (error: any) {
      alert(error.message || "Error al crear el grupo");
    }
  };

  // const updateGrupo = async (
  //   id: number,
  //   nombre_grupo: string,
  //   periodo: string,
  //   carreraId: number,
  //   profesor: string,
  //   alumnos: string[]
  // ) => {
  //   try {
  //     const res = await $fetch<Grupo>(
  //       `http://localhost:4002/api/grupos/${id}`,
  //       {
  //         method: "PUT",
  //         body: {
  //           nombre_grupo,
  //           periodo,
  //           carreraId,
  //           profesor,
  //           alumnos,
  //         },
  //       }
  //     );

  //     if (res.status === "success") {
  //       alert(`Se ha actualizado el grupo ${nombre_grupo} con éxito`);
  //       await getGrupos(); // Refrescar la lista de grupos después de la actualización
  //     } else {
  //       alert(res.error || `Error al actualizar el grupo ${nombre_grupo}`);
  //     }
  //   } catch (error: any) {
  //     alert(error.message || `Error al actualizar el grupo ${nombre_grupo}`);
  //   }
  // };

  const deleteGrupo = async (id: number) => {
    try {
      const res = await $fetch<APIResponse<null>>(`http://localhost:4002/api/grupos/${id}`, {
        method: "DELETE",
      });

      if (res.status === "success") {
        alert("Grupo eliminado con éxito");
        await getGrupos(); // Refrescar la lista de grupos después de eliminar
      } else {
        alert(res.error || "Error al eliminar el grupo");
      }
    } catch (error: any) {
      alert(error.message || "Error al eliminar el grupo");
    }
  };

  return {
    getGrupos,
    newGrupo,
    // updateGrupo,
    deleteGrupo,
    grupos,
    error,
  };
});
