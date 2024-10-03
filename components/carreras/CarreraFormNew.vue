<template>
  <div
    class="max-w-md mx-auto mt-5 mb-8 bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div
      class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
    >
      Nueva Carrera
    </div>
    <form class="py-4 px-6" action="" method="POST">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Nombre
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
        />
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

<script setup></script>
