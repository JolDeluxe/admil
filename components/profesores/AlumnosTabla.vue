<template>
  <div>
    <v-data-table
      :headers="tableHeaders"
      :items="alumnos"
      class="elevation-1"
    >
      <!-- Nombre del alumno -->
      <template v-slot:item.nombre="{ item }">
        <span class="text-lg">{{ item.nombre }}</span>
      </template>

      <!-- Campo para la calificación del 1er parcial -->
      <template v-slot:item.parcial1="{ item }">
        <v-text-field
          v-model="item.parcial1"
          type="number"
          :rules="[validateGrade]"
          label="1er Parcial"
        ></v-text-field>
      </template>

      <!-- Campo para la calificación del 2do parcial -->
      <template v-slot:item.parcial2="{ item }">
        <v-text-field
          v-model="item.parcial2"
          type="number"
          :rules="[validateGrade]"
          label="2do Parcial"
        ></v-text-field>
      </template>

      <!-- Campo para la calificación del 3er parcial -->
      <template v-slot:item.parcial3="{ item }">
        <v-text-field
          v-model="item.parcial3"
          type="number"
          :rules="[validateGrade]"
          label="3er Parcial"
        ></v-text-field>
      </template>
    </v-data-table>

    <!-- Botón para guardar las calificaciones -->
    <v-btn color="primary" @click="guardarCalificaciones">Guardar Calificaciones</v-btn>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Definición de las cabeceras de la tabla
const tableHeaders = ref([
  { text: "Nombre del Alumno", value: "nombre" },
  { text: "1er Parcial", value: "parcial1" },
  { text: "2do Parcial", value: "parcial2" },
  { text: "3er Parcial", value: "parcial3" },
]);

// Lista de alumnos con calificaciones inicializadas
const alumnos = ref([
  { nombre: "Alumno 1", parcial1: 0, parcial2: 0, parcial3: 0 },
  { nombre: "Alumno 2", parcial1: 0, parcial2: 0, parcial3: 0 },
]);

// Función para validar las calificaciones (que estén entre 0 y 100)
const validateGrade = (value) => {
  return value >= 0 && value <= 100 || "La calificación debe estar entre 0 y 100";
};

// Función para guardar las calificaciones
const guardarCalificaciones = () => {
  console.log("Guardando calificaciones:", alumnos.value);
};
</script>
