<template>
  <section class="py-8 px-6">
    <div class="flex items-center justify-center">
      <span class="text-4xl font-bold">Administración de Personal</span>
    </div>

    <div>
      <h2 class="text-2xl font-semibold mt-4">
        {{
          empleadoSeleccionado ? "Modificar Empleado" : "Agregar Nuevo Empleado"
        }}
      </h2>
      <form
        @submit.prevent="guardarEmpleado"
        class="mt-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div class="mb-4">
          <label for="nombre" class="block font-medium mb-1">Nombre</label>
          <input
            type="text"
            v-model="formData.nombre"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="correo" class="block font-medium mb-1">Correo</label>
          <input
            type="email"
            v-model="formData.correo"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="telefono" class="block font-medium mb-1">Teléfono</label>
          <input
            type="text"
            v-model="formData.telefono"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="curp" class="block font-medium mb-1">CURP</label>
          <input
            type="text"
            v-model="formData.curp"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="numeroEmpleado" class="block font-medium mb-1"
            >Número de Empleado</label
          >
          <input
            type="text"
            v-model="formData.numeroEmpleado"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="tipoContrato" class="block font-medium mb-1"
            >Tipo de Contrato</label
          >
          <select
            v-model="formData.tipoContrato"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option value="BASE">BASE</option>
            <option value="HONORARIOS">HONORARIOS</option>
          </select>
        </div>
        <div class="mb-4">
          <label for="fechaIngreso" class="block font-medium mb-1"
            >Fecha de Ingreso</label
          >
          <input
            type="date"
            v-model="formData.fechaIngreso"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          />
        </div>
        <div class="mb-4">
          <label for="areaId" class="block font-medium mb-1">Área</label>
          <select
            v-model="formData.areaId"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
          >
            <option disabled value="">Selecciona un área</option>
            <option value="1">Profesores</option>
            <option value="2">Recursos Humanos</option>
            <option value="3">Servicios Escolares</option>
            <option value="4">Informática</option>
          </select>
        </div>
        <div class="mb-4">
          <label
            for="estatus"
            class="block text-gray-700 text-sm font-bold mb-2"
            >Estatus</label
          >
          <select
            v-model="formData.estatus"
            required
            class="border border-gray-300 rounded px-3 py-2 w-full"
            id="estatus"
          >
            <option value="ACTIVO">ACTIVO</option>
            <option value="INACTIVO">INACTIVO</option>
          </select>
        </div>

        <div class="flex justify-between mt-4">
          <button
            type="submit"
            class="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600 transition duration-200"
          >
            {{ empleadoSeleccionado ? "Modificar" : "Agregar" }}
          </button>
          <button
            type="button"
            @click="cancelar"
            class="bg-gray-300 text-gray-800 rounded px-4 py-2 hover:bg-gray-400 transition duration-200"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>

    <!-- Tabla de empleados -->
    <div class="overflow-x-auto mt-8">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              ID
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Nombre
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Correo
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Teléfono
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CURP
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Núm. Empleado
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Contrato
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Ingreso
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Área
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Estatus
            </th>
            <th
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="empleado in empleados" :key="empleado.id">
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.id }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.nombre }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.correo }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.telefono }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.curp }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.numeroEmpleado }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.tipoContrato }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.fechaIngreso }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.areaId }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ empleado.estatus }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
              <button
                @click="editarEmpleado(empleado)"
                class="bg-blue-500 text-white rounded py-1 px-3 hover:bg-blue-600 transition duration-200"
              >
                Modificar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const mostrarNuevoUsuario = ref(false);
const empleados = ref([]);
const empleadoSeleccionado = ref(null);

// Datos del formulario
const formData = ref({
  nombre: "",
  correo: "",
  telefono: "",
  curp: "",
  numeroEmpleado: "",
  tipoContrato: "BASE",
  fechaIngreso: "",
  areaId: "",
  estatus: "ACTIVO",
});

// Funciones
const cancelar = () => {
  empleadoSeleccionado.value = null;
  formData.value = {
    nombre: "",
    correo: "",
    telefono: "",
    curp: "",
    numeroEmpleado: "",
    tipoContrato: "BASE",
    fechaIngreso: "",
    areaId: "",
    estatus: "ACTIVO",
  };
  mostrarNuevoUsuario.value = false;
};

const editarEmpleado = (empleado) => {
  empleadoSeleccionado.value = empleado;
  formData.value = { ...empleado }; // Rellena el formulario con los datos del empleado seleccionado
  mostrarNuevoUsuario.value = true;
};

const guardarEmpleado = async () => {
  // Asegúrate de convertir areaId a número
  const empleadoData = {
    ...formData.value,
    areaId: parseInt(formData.value.areaId), // Convierte areaId a número
  };

  if (empleadoSeleccionado.value) {
    // Modificar empleado
    try {
      const response = await fetch(
        `http://10.16.18.175:4000/api/empleados/${empleadoSeleccionado.value.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(empleadoData), // Usa empleadoData
        }
      );
      if (!response.ok) throw new Error("Error al modificar el empleado.");
      const updatedEmpleado = await response.json();
      const index = empleados.value.findIndex(
        (emp) => emp.id === updatedEmpleado.id
      );
      empleados.value.splice(index, 1, updatedEmpleado);
    } catch (error) {
      console.error(error);
    }
  } else {
    // Agregar nuevo empleado
    try {
      const response = await fetch("http://10.16.18.175:4000/api/empleados", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(empleadoData), // Usa empleadoData
      });
      if (!response.ok) throw new Error("Error al agregar el empleado.");
      const newEmpleado = await response.json();
      empleados.value.push(newEmpleado);
    } catch (error) {
      console.error(error);
    }
  }
  cancelar();
};

// Función para obtener empleados al montar el componente
onMounted(async () => {
  try {
    const response = await fetch("http://10.16.18.175:4000/api/empleados");
    if (!response.ok) throw new Error("Error al cargar empleados.");
    empleados.value = await response.json();
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f8f8;
  border-bottom: 2px solid #e0e0e0;
}

tr:hover {
  background-color: #f1f1f1;
}

form {
  max-width: 600px; /* Limita el ancho del formulario */
  margin: auto; /* Centra el formulario */
}
</style>
