<script setup lang="ts">
const isMenuOpen = ref<boolean>(false);
import menu from "~/assets/img/navbar/menu.png";
import cerrar from "~/assets/img/navbar/cerrar.png";
</script>

<template>
  <nav
    class="text-white top-0 left-0 py-3 w-full bg-VerdeMilitar bg-opacity-40"
  >
    <div class="flex items-center mx-auto px-6 lg:px-0 container max-w-8xl">
      <button class="lg:hidden block" @click="isMenuOpen = !isMenuOpen">
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
        class="font-light hidden lg:flex justify-center mx-auto lg:-translate-x-16"
      >
        <NuxtLink
          to="/usuarios"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Usuarios</NuxtLink
        >
        <NuxtLink
          to="/"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Roles</NuxtLink
        >
        <NuxtLink
          to="/grupos"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Grupos</NuxtLink
        >
        <NuxtLink
          to="/carreras"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Carreras</NuxtLink
        >
        <NuxtLink
          to="/alumnos"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Alumnos</NuxtLink
        >
        <NuxtLink
          to="/profesores"
          class="transition-all rounded-2xl cursor-pointer px-4 py-1 hover:underline"
          >Profesores</NuxtLink
        >
      </div>

      <div
        v-if="isMenuOpen"
        class="lg:hidden absolute top-10 left-0 w-full text-white bg-VerdeSecondary shadow-lg"
      >
        <div class="flex flex-col items-center py-6 gap-6">
          <NuxtLink to="/usuarios" class="hover:underline">Usuarios</NuxtLink>
          <NuxtLink to="/roles" class="hover:underline">Roles</NuxtLink>
          <NuxtLink to="/grupos/gruposAdmin" class="hover:underline">Grupos</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
