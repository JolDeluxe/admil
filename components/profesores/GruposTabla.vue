<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="grupo in grupos" :key="grupo.id" cols="12" md="6">
          <v-card>
            <v-card-title>{{ grupo.nombre }}</v-card-title>
            <v-card-actions>
              <v-btn color="primary" @click="abrirDialog(grupo)">
                Ver Alumnos
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Diálogo para mostrar los alumnos -->
    <v-dialog v-model="dialog" max-width="800px">
      <v-card>
        <v-card-title>
          <span class="text-h5">{{ grupoSeleccionado.nombre }}</span>
        </v-card-title>
        <v-card-text>
          <v-data-table
            :headers="tableHeaders"
            :items="grupoSeleccionado.alumnos"
            class="elevation-1"
          >
            <template v-slot:item.nombre="{ item }">
              <span class="text-lg">{{ item.nombre }}</span>
            </template>
            <template v-slot:item.parcial1="{ item }">
              <v-text-field
                v-model="item.parcial1"
                type="number"
                :rules="[validateGrade]"
                label="1er Parcial"
              ></v-text-field>
            </template>
            <template v-slot:item.parcial2="{ item }">
              <v-text-field
                v-model="item.parcial2"
                type="number"
                :rules="[validateGrade]"
                label="2do Parcial"
              ></v-text-field>
            </template>
            <template v-slot:item.parcial3="{ item }">
              <v-text-field
                v-model="item.parcial3"
                type="number"
                :rules="[validateGrade]"
                label="3er Parcial"
              ></v-text-field>
            </template>
          </v-data-table>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="guardarCalificaciones">Guardar Calificaciones</v-btn>
          <v-btn text @click="dialog = false">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Emitimos eventos
const emit = defineEmits(["grupoSeleccionado"]);

const dialog = ref(false);
const grupoSeleccionado = ref({});
const grupos = ref([
  { id: 1, nombre: "Grupo A", alumnos: [{ nombre: "Alumno 1", parcial1: 0, parcial2: 0, parcial3: 0 }] },
  { id: 2, nombre: "Grupo B", alumnos: [{ nombre: "Alumno 2", parcial1: 0, parcial2: 0, parcial3: 0 }] }
]);

const tableHeaders = ref([
  { text: "Nombre del Alumno", value: "nombre" },
  { text: "1er Parcial", value: "parcial1" },
  { text: "2do Parcial", value: "parcial2" },
  { text: "3er Parcial", value: "parcial3" },
]);

// Función para abrir el diálogo y seleccionar el grupo
const abrirDialog = (grupo) => {
  grupoSeleccionado.value = grupo; // Asignar el grupo seleccionado
  dialog.value = true; // Abrir el diálogo
};

// Función para validar las calificaciones (que estén entre 0 y 100)
const validateGrade = (value) => {
  return value >= 0 && value <= 100 || "La calificación debe estar entre 0 y 100";
};

// Función para guardar las calificaciones
const guardarCalificaciones = () => {
  console.log("Guardando calificaciones:", grupoSeleccionado.value.alumnos);
  dialog.value = false; // Cerrar el diálogo después de guardar
};
</script>

<style scoped>
/* Estilos personalizados, si es necesario */
</style>
