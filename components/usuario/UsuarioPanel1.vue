<!-- <script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useForm, useField } from "vee-validate";
import { toFieldValidator } from "@vee-validate/zod";
import { z } from "zod";
import { useDisplay } from "vuetify";
// import { useUserStore } from '@/stores/User';
import { storeToRefs } from "pinia";
// import { rolUserColors } from '@/utils/statusColors';

const router = useRouter();
// const userStore = useUserStore();
// const { loading, users } = storeToRefs(userStore);
const { mobile } = useDisplay();
const sortBy = ref<SortItem[]>([]);
const sortDesc = ref<boolean[]>([]);
const isSubmitting = ref(false);

onMounted(() => {
  getData();
});

const tableHeaders = ref<
  {
    title: string;
    key: string;
  }[]
>([
  {
    title: "Usuario",
    key: "nombre",
  },
  {
    title: "Correo",
    key: "email",
  },
  {
    title: "Rol",
    key: "rol",
  },
  {
    title: "Acciones",
    key: "acciones",
  },
]);
interface SortItem {
  key: string;
  order?: boolean | "asc" | "desc";
}

const search = ref("");

async function getData() {
  //   await userStore.getUser();
  //   await userStore.getUsers();
}

const goBack = () => {
  router.go(-1);
};

const dialog = ref(false);
const editDialog = ref(false);
let userId = ref();
const dialogDelete = ref(false);
const selectedUser = ref<any>(null);
const selectedUserToDelete = ref<any>(null);

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

const {
  handleSubmit,
  meta,
  resetForm: resetFirstForm,
} = useForm({
  validationSchema: toFieldValidator(schema),
});

const nombre = useField("nombre");
const apellidos = useField("apellidos");
const correo = useField("correo");
const contraseña = useField("contraseña");
// const rol: FieldContext<string> = useField("rol");

const isFormModified = computed(() => {
  return (
    nombre.value.value !== "" ||
    apellidos.value.value !== "" ||
    correo.value.value !== "" ||
    contraseña.value.value !== "" ||

  );
});

const submit = handleSubmit(async (values) => {
  isSubmitting.value = true;
  //   try {
  //     await userStore.newUser(values.nombre, values.apellidos, values.correo, values.contraseña || '', values.rol);
  //   dialog.value = false;
  //   resetFirstForm();
  //   await getData();
  //   } finally {
  //     isSubmitting.value = false;
  //   }
});

const secondFormSchema = z.object({
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
});

const { handleSubmit: handleSecondFormSubmit, resetForm: resetSecondForm } =
  useForm({
    validationSchema: toFieldValidator(secondFormSchema),
  });

const secondNombre = useField("nombre");
const secondApellidos = useField("apellidos");
const secondCorreo = useField("correo");
const secondContraseña = useField("contraseña");
// const secondRol: FieldContext<string> = useField("rol");

const isSecondFormModified = computed(() => {
  return (
    secondNombre.value.value !== "" ||
    secondApellidos.value.value !== "" ||
    secondCorreo.value.value !== "" ||
    secondContraseña.value.value !== "" ||
  );
});

const submitSecondForm = handleSecondFormSubmit(async (values) => {
  isSubmitting.value = true;
  //   try {
  //     if (selectedUser.value) {
  //     await userStore.updateEmpleado(selectedUser.value.id, values.nombre, values.apellidos, values.correo || '', values.contraseña || '', values.rol);
  //     editDialog.value = false;
  //     resetSecondForm();
  //     await getData();
  //   }
  //   } finally {
  //     isSubmitting.value = false;
  //   }
});

function editUser(user: any) {
  userId = user.id;
  selectedUser.value = user;
  secondNombre.value.value = user.nombre;
  secondApellidos.value.value = user.apellidos;
//   secondRol.value.value = user.rol;
  editDialog.value = true;
}
</script> -->
<template>
  <section class="py-8 px-6">
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold">Lista de usuarios</span>
    </div>
    <div class="flex justify-end py-8">
      <button class="bg-VerdeSecondary text-white text-right rounded py-3 px-6">
        Agregar nuevo Usuario
      </button>
    </div>
  </section>
</template>
