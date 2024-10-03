<template>
    <div class="bg-white shadow-md rounded-lg p-6">
      <h2 class="text-xl font-bold mb-4">Calificaciones del Alumno</h2>
      <v-data-table
        :headers="tableHeaders"
        :items="calificaciones"
        class="elevation-1"
        hide-default-footer
      >
        <template v-slot:item.materia="{ item }">
          <span class="text-lg">{{ item.materia }}</span>
        </template>
  
        <template v-slot:item.profesor="{ item }">
          <span>{{ item.profesor }}</span>
        </template>
  
        <template v-slot:item.calificacion="{ item }">
          <span>{{ item.calificacion }}</span>
        </template>
      </v-data-table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Cabeceras de la tabla con sub-encabezados
  const tableHeaders = ref([
    { title: 'Materia', value: 'materia' },
    { title: 'Profesor', value: 'profesor' },
    { title: '1er Parcial', value: 'calificacion1', align: 'center' },
    { title: '2do Parcial', value: 'calificacion2', align: 'center' },
    { title: '3er Parcial', value: 'calificacion3', align: 'center' },
  ]);
  
  // Calificaciones del alumno (puedes obtener estos datos desde una API)
  const calificaciones = ref([
    {
      materia: 'Matemáticas',
      profesor: 'Prof. González',
      calificacion1: 85,
      calificacion2: 78,
      calificacion3: 90,
    },
    {
      materia: 'Ciencias',
      profesor: 'Prof. Pérez',
      calificacion1: 90,
      calificacion2: 88,
      calificacion3: 92,
    },
    {
      materia: 'Historia',
      profesor: 'Prof. Martínez',
      calificacion1: 88,
      calificacion2: 84,
      calificacion3: 86,
    },
  ]);
  </script>
  