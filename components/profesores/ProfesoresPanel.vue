<template>
  <section class="py-8 px-6">
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold">Lista de Grupos</span>
    </div>
    
    <!-- Componente para mostrar los grupos -->
    <GruposTabla @grupoSeleccionado="verAlumnosDelGrupo" />

    <!-- Componente para mostrar alumnos y calificaciones del grupo seleccionado -->
    <AlumnosTabla v-if="grupoSeleccionado" :grupo="grupoSeleccionado" />

  </section>
</template>

<script setup>
import { ref } from "vue";
import GruposTabla from "~/components/profesores/GruposTabla.vue";
import AlumnosTabla from "~/components/profesores/AlumnosTabla.vue";

const grupoSeleccionado = ref(null);

// Función para ver los alumnos del grupo seleccionado
const verAlumnosDelGrupo = (grupo) => {
  grupoSeleccionado.value = grupo;
};

const toggleAgregarGrupo = () => {
  // Lógica para agregar un nuevo grupo
};
</script>
