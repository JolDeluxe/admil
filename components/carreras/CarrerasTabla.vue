<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useCarrerasStore } from "~/stores/carreras";
import { storeToRefs } from "pinia";

const { mobile } = useDisplay();
const search = ref("");
const carrerasStore = useCarrerasStore();

const { carreras, error } = storeToRefs(carrerasStore);

onMounted(async () => {
  await carrerasStore.getCarreras();  // Cargamos los datos
  console.log("Carreras cargadas:", carreras);
});

const tableHeaders = ref([
  { title: "Carrera", key: "nombre" },
  { title: "Acciones", key: "acciones" },
]);
</script>

<template>
  <section class="px-4">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-briefcase-outline"></v-icon> &nbsp; Carreras
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
      :items="carreras"
      :mobile="mobile"
      :items-per-page="10"
      items-per-page-text="Carreras por página"
      class="elevation-1"
    >
      <template v-slot:header.nombre="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{ column.title }}</span>
      </template>

      <template v-slot:item.nombre="{ item }">
        <span class="text-2xl">{{ item.nombre }}</span>
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
          No hay carreras disponibles.
        </v-alert>
      </template>
    </v-data-table>
  </section>
</template>
