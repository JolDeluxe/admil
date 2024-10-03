<script setup lang="ts">
import { ref, defineEmits, watchEffect, defineProps } from "vue";
import { number, z } from "zod";
import { toFieldValidator } from "@vee-validate/zod";
import { useDisplay } from "vuetify";
import { useForm, useField } from "vee-validate";
import type { FieldContext } from "vee-validate";
import { useRolStore } from "~/stores/rol";
import { useUsersStore } from "~/stores/user";

const rolStore = useRolStore();
const userStore = useUsersStore();

const { roles } = storeToRefs(rolStore);

const props = defineProps({
  usuario: {
    type: Object,
    required: true,
    default: () => ({
      id: null,
      nombre: "",
      apellidos: "",
      rol: "",
      estatus: "",
    }),
  },
});

const schema = z.object({
  nombre: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un nombre"),
  apellidos: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un apellido"),
  correo: z.string().email("Debes ingresar un correo válido").optional(),
  contraseña: z
    .string()
    .min(5, "Es necesario tener al menos 5 caracteres.")
    .optional(),
  rol: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un rol"),
  estatus: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un estatus"),
});
const { handleSubmit, meta } = useForm({
  validationSchema: toFieldValidator(schema),
});

const idUser = ref<number | null>(null);
const nombre = useField("nombre");
const apellidos = useField("apellidos");
const correo = useField("correo");
const contraseña = useField("contraseña");
const rol: FieldContext<string> = useField("rol");
const estatus: FieldContext<string> = useField("estatus");

const emit = defineEmits(["cerrar"]);
const { mobile } = useDisplay();
const isSubmitting = ref(false);

watchEffect(() => {
  if (props.usuario) {
    idUser.value = props.usuario.id || null;
    nombre.value.value = props.usuario.nombre || "";
    apellidos.value.value = props.usuario.apellidos || "";
    rol.value.value = props.usuario.rol.nombre || "";
    estatus.value.value = props.usuario.estatus || "";
  }
});

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    if (idUser.value !== null) {
      await userStore.updateUser(
        idUser.value,
        values.nombre,
        values.apellidos,
        values.correo || "",
        values.contraseña || "",
        values.rol,
        values.estatus
      );
    }
  } finally {
    isSubmitting.value = false;
    location.reload();
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
      Editar {{ props.usuario.nombre }}
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
      <v-text-field
        clearable
        v-model="apellidos.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-account'"
        :error-messages="apellidos.errorMessage.value"
        label="Escribe los apellidos"
      ></v-text-field>
      <v-text-field
        clearable
        v-model="correo.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-email'"
        :error-messages="correo.errorMessage.value"
        label="Escribe el correo"
      ></v-text-field>
      <v-text-field
        clearable
        v-model="contraseña.value.value"
        :counter="100"
        :prepend-icon="mobile == true ? '' : 'mdi-lock'"
        :error-messages="contraseña.errorMessage.value"
        label="Escribe la contraseña"
        type="password"
      ></v-text-field>
      <v-autocomplete
        label="Elige un rol"
        v-model="rol.value.value"
        :prepend-icon="mobile == true ? '' : 'mdi-hard-hat'"
        :items="roles.map((role) => role.nombre)"
        variant="outlined"
      ></v-autocomplete>
      <v-autocomplete
        label="Cambia de estatus"
        v-model="estatus.value.value"
        :prepend-icon="mobile == true ? '' : 'mdi-hard-hat'"
        :items="['ACTIVO', 'INACTIVO']"
        variant="outlined"
      ></v-autocomplete>
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
