<template>
  <section class="py-8 px-6">
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold">Lista de Carreras</span>
    </div>
    <div class="flex justify-end py-8">
      <!-- Botón para agregar nuevo usuario -->
      <button
        @click="toggleNuevoUsuario"
        class="bg-VerdeSecondary text-white text-right rounded py-3 px-6"
      >
        Agregar Nueva Carrera
      </button>
    </div>

    <CarreraFormNew v-if="mostrarNuevoUsuario" @cerrar="toggleNuevoUsuario" />
  </section>
</template>

<script setup>
import { ref } from "vue";
import CarreraFormNew from "~/components/carreras/CarreraFormNew.vue";

const mostrarNuevoUsuario = ref(false);

const toggleNuevoUsuario = () => {
  mostrarNuevoUsuario.value = !mostrarNuevoUsuario.value;
};
</script>
