<script setup lang="ts">
definePageMeta({
  middleware: ["auth", "role-check"],
});
</script>

<template>
  <div class="bg-grisFondo">
    <RolesPanel1 />
    <RolesTabla />
  </div>
</template>
