<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-check"],
});
</script>

<template>
  <div class="bg-grisFondo">
    <UsuarioPanel1 />
    <UsuarioTabla />
  </div>
</template>
