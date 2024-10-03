<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useUsersStore } from "~/stores/user";
import UsuarioFormUpdate from "./UsuarioFormUpdate.vue";

const mostrarEditarUsuario = ref(false);
const usuarioSeleccionado = ref<Record<string, any> | undefined>(undefined);
const { mobile } = useDisplay();
const search = ref("");
const UsersStore = useUsersStore();
const { usuarios, error } = storeToRefs(UsersStore);

onMounted(async () => {
  await getData();
});

async function getData() {
  await UsersStore.getUsuarios();
}

const tableHeaders = ref([
  { title: "Usuario", key: "nombre" },
  { title: "Correo", key: "email" },
  { title: "Rol", key: "rol" },
  { title: "Estatus", key: "estatus" },
  { title: "Acciones", key: "acciones" },
]);

function editUser(user: any) {
  usuarioSeleccionado.value = user;
  mostrarEditarUsuario.value = true;
}
const toggleEditUsuario = () => {
  mostrarEditarUsuario.value = !mostrarEditarUsuario.value;
};
</script>

<template>
  <div class="py-16 px-16">
    <UsuarioFormUpdate
      v-if="mostrarEditarUsuario"
      @cerrar="toggleEditUsuario"
      :usuario="usuarioSeleccionado"
    />
  </div>

  <section class="pb-16 px-6 lg:px-32">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-circle"></v-icon> &nbsp; Usuarios

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
      :items="usuarios"
      :mobile="mobile"
      :items-per-page="10"
      items-per-page-text="Usuarios por página"
      class="elevation-1"
    >
      <template v-slot:header.nombre="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>
      <template v-slot:header.email="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>
      <template v-slot:header.rol="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>
      <template v-slot:header.estatus="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>
      <template v-slot:header.acciones="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>

      <template v-slot:item.nombre="{ item }">
        {{ item.nombre }} {{ item.apellidos }}
      </template>

      <template v-slot:item.email="{ item }">
        {{ item.email }}
      </template>
      <template v-slot:item.estatus="{ item }">
        {{ item.estatus }}
      </template>
      <template v-slot:item.rol="{ item }">
        {{ item.rol.nombre }}
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-tooltip text="Editar">
          <template v-slot:activator="{ props }">
            <v-icon
              class="ml-4"
              v-bind="props"
              size="large"
              @click="editUser(item)"
              >mdi-pencil</v-icon
            >
          </template>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="verde-secondary" icon="mdi-alert">
          No hay usuarios disponibles.
        </v-alert>
      </template>
    </v-data-table>
  </section>
</template>
