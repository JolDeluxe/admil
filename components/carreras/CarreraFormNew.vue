<script setup lang="ts">
import { ref } from "vue";
import { useCarrerasStore } from "~/stores/carreras";

const carreraStore = useCarrerasStore();

const { mobile } = useDisplay();
const isSubmitting = ref(false);
const emit = defineEmits(["cerrar"]);

const { roles } = storeToRefs(rolStore);

onMounted(async () => {
  await getData();
});

async function getData() {
  await rolStore.getRoles();
}

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
  rol: z
    .string()
    .min(2, "Es necesario tener al menos 2 caracteres.")
    .nonempty("Debes ingresar un rol"),
});

const { handleSubmit, meta } = useForm({
  validationSchema: toFieldValidator(schema),
});

const nombre = useField("nombre");
const apellidos = useField("apellidos");
const correo = useField("correo");
const contraseña = useField("contraseña");
const rol: FieldContext<string> = useField("rol");

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  try {
    await userStore.newUser(
      values.nombre,
      values.apellidos,
      values.correo,
      values.contraseña,
      values.rol
    );
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
      class="text-2xl py-4 px-6 bg-gray-900 text-white text-center font-bold uppercase"
    >
      Nueva Carrera
    </div>
    <form class="py-4 px-6" action="" method="POST">
      <div class="mb-4">
        <label class="block text-gray-700 font-bold mb-2" for="name">
          Nombre
        </label>
        <input
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
        />
      </div>
      <div class="flex items-center justify-center mb-4 gap-6">
        <button
          class="bg-gray-900 text-white py-2 px-4 rounded hover:bg-gray-800 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Agregar
        </button>
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
