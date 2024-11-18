<!-- Archivo: components/contraseña/RecuperarContraseña.vue -->
<script setup lang="ts">
import { ref } from "vue";
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";

const isSubmitting = ref(false);

// Validación del esquema para el formulario
const validationSchema = z.object({
  email: z.string().email("Correo inválido.").nonempty("Obligatorio."),
});

const { handleSubmit } = useForm({
  validationSchema: validationSchema,
});

// Definimos el campo de correo electrónico con la validación
const email = useField("email", toFieldValidator(validationSchema.shape.email));

// Función para manejar el envío del formulario
const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    // Lógica para enviar el correo de recuperación
    console.log("Enviando solicitud de recuperación para:", values.email);
    // Aquí puedes añadir la lógica para enviar el correo a través de una API
    // await someApiCallToSendRecoveryEmail(values.email);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="container mx-auto max-w-lg rounded-lg bg-white p-6 lg:p-10 mt-10">
    <div class="flex flex-col gap-6">
      <p class="font-bold text-3xl lg:text-4xl text-center">Recuperar Contraseña</p>
      <p class="text-gray-600 text-center">Ingresa tu correo electrónico para recibir instrucciones.</p>
      <form @submit.prevent="submit">
        <div>
          <v-text-field
            v-model="email.value"
            label="E-mail"
          ></v-text-field>
        </div>
        <div class="flex flex-col py-5">
          <v-btn
            block
            class="bg-Principal py-6 px-6 rounded-lg"
            type="submit"
            :loading="isSubmitting"
          >
            Enviar Instrucciones
          </v-btn>
        </div>
      </form>
      <div class="text-center">
        <NuxtLink
          to="/"
          class="text-sm text-blue-500 hover:underline"
        >
          Volver al inicio de sesión
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
