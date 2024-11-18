<script setup lang="ts">
import RecuperarContrasenia from "~/components/contrasenia/RecuperarContrasenia.vue";

definePageMeta({
  layout: "contrasenia",
});
</script>

<template>
  <section class="">
    <div
      class="min-h-screen flex flex-col items-center justify-center bg-gray-500 bg-opacity-60"
    >
      <div class="flex flex-col">
        <RecuperarContrasenia />
      </div>
    </div>
  </section>
</template>
