<template>
  <div>
    <!-- Información del alumno -->
    <AlumnoInfo />

    <!-- Tabla de calificaciones -->
    <CalificacionesTabla />
  </div>
</template>

<script setup>
// Importar los componentes
import AlumnoInfo from './components/alumnos/AlumnoInfo.vue';
import CalificacionesTabla from './components/alumnos/CalificacionesTabla.vue';
</script>
