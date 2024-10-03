<template>
    <div class="alumno-info p-6 bg-white rounded-lg shadow-md">
      <h2 class="text-2xl font-bold text-gray-800 mb-4">{{ alumno.nombre }}</h2>
      <ul class="space-y-3">
        <li class="flex items-center">
          <span class="text-gray-600 font-medium">Periodo:</span>
          <span class="ml-2 text-gray-800">{{ periodo }}</span>
        </li>
        <li class="flex items-center">
          <span class="text-gray-600 font-medium">Materia:</span>
          <span class="ml-2 text-gray-800">{{ materia }}</span>
        </li>
        <li class="flex items-center">
          <span class="text-gray-600 font-medium">Profesor:</span>
          <span class="ml-2 text-gray-800">{{ profesor }}</span>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const alumno = ref({
    nombre: 'Juan Pérez',
  });
  
  const periodo = ref('1er Parcial');
  const materia = ref('Matemáticas');
  const profesor = ref('Prof. González');
  </script>