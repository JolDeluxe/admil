<script setup>
import { ref } from "vue";
import { useDisplay } from "vuetify";

const { mobile } = useDisplay();
const search = ref("");
const users = ref([]);
const sortBy = ref("");
const sortDesc = ref(false);

const { data, error } = await useFetch("/api/usuarios");
if (data.value) {
  users.value = data.value.data;
} else {
  console.error(error.value);
}

const editUser = (user) => {
  console.log("Editando usuario:", user);
};
</script>

<template>
  <section class="px-4">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-circle"></v-icon> &nbsp; Usuarios

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        density="compact"
        label="Search"
        prepend-inner-icon="mdi-magnify"
        variant="solo-filled"
        flat
        hide-details
        single-line
      ></v-text-field>
    </v-card-title>
    <v-divider></v-divider>
    <v-data-table
      :search="search"
      :items="users"
      :mobile="mobile"
      :items-per-page="10"
      items-per-page-text="Usuarios por página"
    >
      <template v-slot:item.nombre="{ item }">
        {{ item.nombre }} {{ item.apellidos }}
      </template>
      <template v-slot:item.email="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:item.rol="{ item }">
        <v-chip color="primary" variant="elevated" size="small">{{
          item.rol
        }}</v-chip>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="VerdeSecondary" icon="mdi-alert">
          No hay usuarios disponibles.
        </v-alert>
      </template>
    </v-data-table>
  </section>
</template>
