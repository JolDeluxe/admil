<template>
  <div
    class="max-w-md mx-auto mt-5 mb-8 bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div
      class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
    >
      Nuevo Grupo
    </div>
    <form class="py-4 px-6" action="" method="POST">
  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="nombreGrupo">
      Nombre del Grupo
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="groupName"
      type="text"
      placeholder="Ej. Grupo A"
      required
    />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="periodo">
      Periodo
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="period"
      type="text"
      placeholder="Ej. 2024-1"
      required
    />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="carrera">
      Carrera
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="career"
      type="text"
      placeholder="Ej. Ingeniería en Sistemas"
      required
    />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2" for="profesor">
      Profesor
    </label>
    <input
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      id="professor"
      type="text"
      placeholder="Ej. Juan Pérez"
      required
    />
  </div>

  <div class="mb-4">
    <label class="block text-gray-700 font-bold mb-2">Alumnos del Grupo</label>
    <div v-for="(student, index) in students" :key="index" class="flex mb-2">
      <input
        v-model="students[index]"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        type="text"
        placeholder="Nombre del alumno"
        required
      />
      <button
        type="button"
        @click="removeStudent(index)"
        class="bg-red-500 text-white ml-2 px-2 rounded"
      >
        Eliminar
      </button>
    </div>
    <button
      type="button"
      @click="addStudent"
      class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800"
    >
      Agregar Alumno
    </button>
  </div>

  <div class="flex items-center justify-center mb-4 gap-6">
    <button
      class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
      type="submit"
    >
      Agregar
    </button>
    <button
      @click="$emit('cerrar')"
      class="bg-red-500 text-white py-2 px-4 rounded"
    >
      Cancelar
    </button>
  </div>
</form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const students = ref(['']); // Inicializamos con un campo de entrada

const addStudent = () => {
  students.value.push('');
};

const removeStudent = (index: number) => {
  students.value.splice(index, 1);
};
</script>
