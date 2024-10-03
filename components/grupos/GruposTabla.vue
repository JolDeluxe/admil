<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useGruposStore } from "~/stores/grupos";
import { storeToRefs } from "pinia"; // Asegúrate de importar esto

const { mobile } = useDisplay();
const search = ref("");
const gruposStore = useGruposStore();
const { grupos, error } = storeToRefs(gruposStore);

// Inicializamos el store con los datos por defecto
onMounted(async () => {
  await getData();
});

async function getData() {
  await gruposStore.getGrupos();
}

const tableHeaders = ref<
  {
    title: string;
    key: string;
  }[]
>([
  {
    title: "Nombre de Grupo",
    key: "nombre_grupo",
  },
  {
    title: "Periodo",
    key: "periodo",
  },
  {
    title: "Carrera",
    key: "carrera",
  },
  {
    title: "Profesor",
    key: "profesor",
  },
  {
    title: "No. Alumnos",
    key: "alumnos",
  },
  {
    title: "Acciones",
    key: "acciones",
  },
]);
</script>

<template>
  <section class="px-4">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-group"></v-icon> &nbsp; Grupos

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>

    <v-alert v-if="error" :value="true" type="error" icon="mdi-alert">
      {{ error }}
    </v-alert>

    <v-data-table
      :headers="tableHeaders"
      :search="search"
      :items="grupos"
      :mobile="mobile"
      :items-per-page="10"
      items-per-page-text="Grupos por página"
      class="elevation-1"
    >
      <template v-slot:header="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{ column.title }}</span>
      </template>

      <!-- Mostrar el nombre del grupo -->
      <template v-slot:item.nombre_grupo="{ item }">
        <span class="text-sm md:text-base">{{ item.nombre_grupo }}</span>
      </template>

      <!-- Mostrar el periodo -->
      <template v-slot:item.periodo="{ item }">
        <span class="text-sm md:text-base">{{ item.periodo }}</span>
      </template>

      <!-- Mostrar solo el nombre de la carrera -->
      <template v-slot:item.carrera="{ item }">
        <span class="text-sm md:text-base">{{ item.carrera.nombre }}</span>
      </template>

      <!-- Mostrar el profesor -->
      <template v-slot:item.profesor="{ item }">
        <span class="text-sm md:text-base">{{ item.profesor }}</span>
      </template>

      <!-- Mostrar solo el número de alumnos -->
      <template v-slot:item.alumnos="{ item }">
        <span class="text-sm md:text-base">{{ item.alumnos.length }}</span>
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-tooltip text="Editar">
          <template v-slot:activator="{ props }">
            <v-icon class="ml-4" v-bind="props" size="large">mdi-pencil</v-icon>
          </template>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="verde-secondary" icon="mdi-alert">
          No hay grupos disponibles.
        </v-alert>
      </template>
    </v-data-table>
  </section>
</template>
