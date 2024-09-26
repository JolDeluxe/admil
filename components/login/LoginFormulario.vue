<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { z } from "zod";
import { ref } from "vue";
import { toFieldValidator } from "@vee-validate/zod";
import { useAuthStore } from "~/stores/login";

const authStore = useAuthStore();

const validationSchema = z.object({
  email: z.string().email("Correo inválido.").nonempty("Obligatorio."),
  password: z.string().min(5, "Mínimo  5 caracteres.").nonempty("Obligatoria."),
});

const { handleSubmit } = useForm({
  validationSchema: toFieldValidator(validationSchema),
});

const email = useField("email");
const password = useField("password");
const isSubmitting = ref(false);

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    await authStore.login(values.email, values.password);
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div class="container rounded-lg bg-white p-6 lg:p-20">
    <div class="flex flex-col gap-8">
      <p class="font-bold text-4xl lg:text-5xl text-center">Bienvenido</p>
      <p class="text-gray-600">Ingresa tus datos para acceder a tu cuenta.</p>
      <form @submit.prevent="submit">
        <div>
          <v-text-field
            v-model="email.value.value"
            :counter="50"
            :error-messages="email.errorMessage.value"
            label="E-mail"
          ></v-text-field>
        </div>
        <div>
          <v-text-field
            v-model="password.value.value"
            :error-messages="password.errorMessage.value"
            label="Contraseña"
            type="password"
          ></v-text-field>
        </div>
        <div class="flex flex-col py-5">
          <v-btn
            block
            class="bg-VerdeMilitar py-6 px-6 rounded-lg"
            type="submit"
            :loading="isSubmitting"
          >
            Ingresar
          </v-btn>
        </div>
      </form>
    </div>
  </div>
</template>
