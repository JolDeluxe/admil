<template>
  <section class="py-8 px-6">
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold">Lista de roles</span>
    </div>
    <div class="flex justify-end py-8">
      <button
        @click="toggleNuevoRol"
        class="bg-VerdeSecondary text-white text-right rounded py-3 px-6"
      >
        Agregar nuevo Rol
      </button>
    </div>

    <RolesFormNew v-if="mostrarNuevoRol" @cerrar="toggleNuevoRol" />
  </section>
</template>

<script setup>
import { ref } from "vue";

const mostrarNuevoRol = ref(false);

const toggleNuevoRol = () => {
  mostrarNuevoRol.value = !mostrarNuevoRol.value;
};
</script>
