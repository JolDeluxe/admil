<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-check"],
});
</script>
<template>
  <section>
    <div
      class="min-h-screen flex items-center justify-center bg-black bg-opacity-40 p-6"
    >
      <div class="bg-white rounded-lg shadow-lg p-10 max-w-2xl w-full">
        <AdministrativoAdmin />
      </div>
    </div>
  </section>
</template>
