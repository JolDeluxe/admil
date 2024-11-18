<script setup lang="ts">
import { z } from "zod";
import { ref } from "vue";
import { toFieldValidator } from "@vee-validate/zod";
import { useDisplay } from "vuetify";
import { useForm, useField } from "vee-validate";
import { useRouter } from "vue-router";
import { useUsersStore } from "~/stores/user";

const userStore = useUsersStore();
const router = useRouter(); 

const { mobile } = useDisplay();
const isSubmitting = ref(false);
const emit = defineEmits(["cerrar"]);

const schema = z.object({
  nombre: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un nombre"),
  apellidos: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un apellido"),
  correo: z
    .string()
    .email("Debes ingresar un correo válido")
    .nonempty("Debes ingresar un correo"),
  contraseña: z
    .string()
    .min(5, "Es necesario tener al menos 5 caracteres.")
    .nonempty("Debes ingresar una contraseña"),
});

const { handleSubmit, meta } = useForm({
  validationSchema: toFieldValidator(schema),
});

const nombre = useField("nombre");
const apellidos = useField("apellidos");
const correo = useField("correo");
const contraseña = useField("contraseña");

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    await userStore.newUser(
      values.nombre,
      values.apellidos,
      values.correo,
      values.contraseña,
    );
    router.push("/login");
  } catch (error) {
    console.error("Error al registrar el usuario", error);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="max-w-4xl mx-auto mt-5 mb-8 bg-white shadow-lg rounded-lg overflow-hidden p-10">
    <div class="text-2xl py-4 px-6 bg-Principal text-white text-center font-bold uppercase">
      Registrar Usuario
    </div>

    <form class="px-6 py-4" @submit.prevent="submit">
      <!-- Nombre -->
      <v-text-field
        clearable
        v-model="nombre.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-account'"
        :error-messages="nombre.errorMessage.value"
        label="Escribe el nombre"
        class="my-4"
      ></v-text-field>

      <!-- Apellidos -->
      <v-text-field
        clearable
        v-model="apellidos.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-account'"
        :error-messages="apellidos.errorMessage.value"
        label="Escribe los apellidos"
        class="my-4"
      ></v-text-field>

      <!-- Correo -->
      <v-text-field
        clearable
        v-model="correo.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-email'"
        :error-messages="correo.errorMessage.value"
        label="Escribe el correo"
        class="my-4"
      ></v-text-field>

      <!-- Contraseña -->
      <v-text-field
        clearable
        v-model="contraseña.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-lock'"
        :error-messages="contraseña.errorMessage.value"
        label="Escribe la contraseña"
        type="password"
        class="my-4"
      ></v-text-field>

      <div class="flex flex-col py-5 items-center justify-center gap-4">
  <!-- Botón de Confirmar -->
  <div class="d-flex flex-column w-full">
    <v-btn
      type="submit"
      :color="meta.valid ? 'success' : 'grey'"
      block
      :loading="isSubmitting"
      :disabled="meta.valid === false"
      class="py-4 text-lg"
    >
      Confirmar
    </v-btn>
  </div>

  <!-- Enlace Volver al inicio -->
  <div class="text-center w-full mt-4">
    <NuxtLink
      to="/"
      class="text-sm text-blue-500 hover:underline"
    >
      Volver al inicio de sesión
    </NuxtLink>
  </div>
</div>
    </form>
  </div>
</template>
