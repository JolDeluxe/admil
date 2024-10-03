<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <section
    class="w-full min-h-screen flex flex-col items-center justify-center bg-grisFondo"
  >
    <span class="text-VerdeMilitar font-extrabold text-5xl lg:text-9xl"
      >Bienvenidos</span
    >
  </section>
</template>
