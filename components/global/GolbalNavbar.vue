<script setup lang="ts">
import menu from "~/assets/img/navbar/menu.png";
import cerrar from "~/assets/img/navbar/cerrar.png";
import { useDatoStore } from "~/stores/auth";

const datoStore = useDatoStore();
const { usuario, error } = storeToRefs(datoStore);
const isMenuOpen = ref<boolean>(false);
const isLogOutOpen = ref<boolean>(false);
const router = useRouter();
const authToken = useCookie("s-login");

onMounted(async () => {
  await getData();
});

async function getData() {
  await datoStore.getUsuario();
}

function logout() {
  authToken.value = null;
  router.push("/login");
}
</script>

<template>
  <nav
    class="text-white top-0 left-0 py-3 w-full flex items-center justify-center bg-VerdeMilitar bg-opacity-40"
  >
    <div
      class="flex items-center justify-between px-6 lg:px-0 container max-w-8xl relative"
    >
      <button class="block" @click="isMenuOpen = !isMenuOpen">
        <img
          v-if="!isMenuOpen"
          :src="menu"
          alt="Abrir menú"
          class="w-5 cursor-pointer"
        />
        <img
          v-if="isMenuOpen"
          :src="cerrar"
          alt="Cerrar menú"
          class="w-5 cursor-pointer"
        />
      </button>

      <div
        v-if="isMenuOpen"
        class="absolute top-9 left-0 w-auto p-8 text-white bg-VerdeSecondary shadow-lg border-solid"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-3 items-center py-6 gap-6 text-center"
        >
          <NuxtLink
            v-if="usuario?.rol === 'Informatica'"
            @click="isMenuOpen = false"
            to="/usuarios"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-account text-3xl"></i>
            <span>Usuarios</span>
          </NuxtLink>

          <NuxtLink
            v-if="usuario?.rol === 'Informatica'"
            @click="isMenuOpen = false"
            to="/roles"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-account-key text-3xl"></i>
            <span>Roles</span>
          </NuxtLink>
          <NuxtLink
            v-if="usuario?.rol === 'Recursos Humanos'"
            @click="isMenuOpen = false"
            to="/administrativo"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-briefcase text-3xl"></i>
            <span>Administrativo</span>
          </NuxtLink>
         
          <NuxtLink
            v-if="usuario?.rol === 'Aspirantes'"
            @click="isMenuOpen = false"
            to="/Adminison/RegistrosPublicos"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-account text-3xl"></i>
            <span>Aspirantes</span>
          </NuxtLink>

          <NuxtLink
            v-if="usuario?.rol === 'Aspirantes'"
            @click="isMenuOpen = false"
            to="/Adminison/Registros_asp"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-account text-3xl"></i>
            <span>Registros de aspirantes</span>
          </NuxtLink>

          <NuxtLink
            v-if="usuario?.rol === 'Recursos Humanos'"
            @click="isMenuOpen = false"
            to="/Admisiones/CatalagoPeriodos"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-briefcase text-3xl"></i>
            <span> Registro Peridos</span>
          </NuxtLink>

          <NuxtLink
            v-if="usuario?.rol === 'Recursos Humanos'"
            @click="isMenuOpen = false"
            to="/Admisiones/Seleccion_asp"
            class="hover:underline flex flex-col items-center"
          >
            <i class="mdi mdi-briefcase text-3xl"></i>
            <span>Seleccion aspirantes</span>
          </NuxtLink>

        </div>
      </div>

      <div class="absolute left-1/2">
        <span class="font-bold">Admil</span>
      </div>

      <div class="flex items-center">
        <button class="flex" @click="isLogOutOpen = !isLogOutOpen">
          <i class="mdi mdi-account pr-2"></i>
          <p>{{ usuario?.nombre }}</p>
        </button>
      </div>
      <div
        v-if="isLogOutOpen"
        class="absolute top-9 right-0 w-auto p-4 text-white bg-VerdeSecondary shadow-lg border-solid"
      >
        <div class="flex flex-col items-center py-6 gap-6 text-center">
          <button @click="logout" class="flex items-center">
            <i class="mdi mdi-account-off text-3xl"></i>
            <span>Cerrar sesion</span>
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>
