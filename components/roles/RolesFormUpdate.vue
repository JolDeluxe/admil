<script setup lang="ts">
import { ref, defineEmits, watchEffect, defineProps } from "vue";
import { z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import { useDisplay } from "vuetify";
import { useForm, useField } from "vee-validate";
import { useRolStore } from "~/stores/rol";

const rolStore = useRolStore();

const props = defineProps({
  rol: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      nombre: "",
    }),
  },
});

const schema = z.object({
  nombre: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un nombre"),
});
const { handleSubmit, meta } = useForm({
  validationSchema: toFieldValidator(schema),
});

const idRol = ref<number | null>(null);
const nombre = useField("nombre");

const emit = defineEmits(["cerrar"]);
const { mobile } = useDisplay();
const isSubmitting = ref(false);

watchEffect(() => {
  if (props.rol) {
    idRol.value = props.rol.id || null;
    nombre.value.value = props.rol.nombre || "";
  }
});

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    if (idRol.value !== null) {
      await rolStore.updateRol(idRol.value, values.nombre);
    }
    location.reload();
  } finally {
    isSubmitting.value = false;
  }
});
</script>

<template>
  <div
    class="max-w-md mx-auto mt-5 mb-8 bg-white shadow-lg rounded-lg overflow-hidden"
  >
    <div
      class="text-2xl py-4 px-6 bg-green-950 text-white text-center font-bold uppercase"
    >
      Editar {{ props.rol.nombre }}
    </div>

    <form class="px-6 py-4" @submit.prevent="submit">
      <v-text-field
        clearable
        v-model="nombre.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-account'"
        :error-messages="nombre.errorMessage.value"
        label="Escribe el nombre"
      ></v-text-field>
      <div class="flex py-5 items-center justify-center gap-12">
        <div class="d-flex flex-column">
          <v-btn
            type="submit"
            :color="meta.valid ? 'success' : 'grey'"
            block
            :loading="isSubmitting"
            :disabled="meta.valid === false"
          >
            Confirmar
          </v-btn>
        </div>
        <button
          @click="$emit('cerrar')"
          class="bg-red-500 text-white py-2 px-4 rounded"
        >
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>
