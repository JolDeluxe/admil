<template>
  <div>
    <!-- Encabezado principal de la sección de Profesores -->
    <h1 class="text-4xl font-bold text-center py-8">Sección de Profesores</h1>

    <!-- Llamada al componente ProfesoresPanel -->
    <ProfesoresPanel />
  </div>
</template>

<script setup>
import ProfesoresPanel from "~/components/profesores/ProfesoresPanel.vue";
</script>