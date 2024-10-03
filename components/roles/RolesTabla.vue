<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useDisplay } from "vuetify";
import { useRolStore } from "~/stores/rol";

const mostrarEditarRol = ref(false);
const rolSeleccionado = ref<Record<string, any> | undefined>(undefined);
const { mobile } = useDisplay();
const search = ref("");
const rolStore = useRolStore();
const { roles, error } = storeToRefs(rolStore);

onMounted(async () => {
  await getData();
});

async function getData() {
  await rolStore.getRoles();
}

const tableHeaders = ref([
  { title: "Id", key: "id" },
  { title: "Rol", key: "nombre" },
  { title: "Acciones", key: "acciones" },
]);

function editRol(rol: any) {
  rolSeleccionado.value = rol;
  mostrarEditarRol.value = true;
}
const toggleEditRol = () => {
  mostrarEditarRol.value = !mostrarEditarRol.value;
};
</script>

<template>
  <div class="py-16 px-16">
    <RolesFormUpdate
      v-if="mostrarEditarRol"
      @cerrar="toggleEditRol"
      :rol="rolSeleccionado"
    />
  </div>

  <section class="px-18 pb-16 items-center lg:px-32">
    <v-card-title class="d-flex align-center pe-2">
      <v-icon icon="mdi-account-circle"></v-icon> &nbsp; Roles

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
      :items="roles"
      :mobile="mobile"
      :items-per-page="10"
      items-per-page-text="Usuarios por página"
      class="elevation-1"
    >
      <template v-slot:header.id="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>
      <template v-slot:header.nombre="{ column }">
        <span class="font-bold text-sm md:text-[1.1rem]">{{
          column.title
        }}</span>
      </template>

      <template v-slot:item.id="{ item }">
        {{ item.id }}
      </template>
      <template v-slot:item.nombre="{ item }">
        {{ item.nombre }}
      </template>

      <template v-slot:item.acciones="{ item }">
        <v-tooltip text="Editar">
          <template v-slot:activator="{ props }">
            <v-icon
              class="ml-4"
              v-bind="props"
              size="large"
              @click="editRol(item)"
              >mdi-pencil</v-icon
            >
          </template>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-alert :value="true" color="verde-secondary" icon="mdi-alert">
          No hay rol disponibles.
        </v-alert>
      </template>
    </v-data-table>
  </section>
</template>
