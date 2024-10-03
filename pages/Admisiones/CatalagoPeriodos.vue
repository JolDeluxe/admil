<template>
  <div class="catalogo-periodos">
    <h2>Catálogo de Periodos de Inscripción</h2>

    <div class="formulario-periodo">
      <h3>Agregar Nuevo Periodo</h3>
      <form @submit.prevent="agregarPeriodo">
        <div class="campo">
          <label for="nombre">Nombre del Periodo:</label>
          <input
            id="nombre"
            v-model="nuevoPeriodo.nombre"
            placeholder="Ej: Primavera 2024"
            required
          />
        </div>

        <div class="campo">
          <label for="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            v-model="nuevoPeriodo.descripcion"
            placeholder="Ej: Inscripción para el periodo de Primavera"
            required
          ></textarea>
        </div>

        <div class="campo">
          <label for="estatus">Estatus:</label>
          <select id="estatus" v-model="nuevoPeriodo.estatus">
            <option value="1">Abierta</option>
            <option value="0">Inactivo</option>
          </select>
        </div>

        <button type="submit" class="btn-agregar">Agregar Periodo</button>
      </form>
    </div>

    <div class="lista-periodos">
      <h3>Periodos Existentes</h3>
      <table class="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Estatus</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="periodo in periodos" :key="periodo.id">
            <td>{{ periodo.id }}</td>
            <td>{{ periodo.nombre }}</td>
            <td>{{ periodo.descripcion }}</td>
            <td>
              <span
                class="estatus"
                :class="{
                  abierta: periodo.estatus === 1,
                  inactivo: periodo.estatus === 0,
                }"
              >
                {{ periodo.estatus === 1 ? "Abierta" : "Inactivo" }}
              </span>
            </td>
            <td>
              <button @click="abrirModal(periodo)" class="btn-editar">
                Editar
              </button>
              <button @click="eliminarPeriodo(periodo.id)" class="btn-eliminar">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para editar periodo -->
    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="cerrarModal">&times;</span>
        <h3>Editar Periodo</h3>
        <form @submit.prevent="editarPeriodo">
          <div class="campo">
            <label for="nombreModal">Nombre del Periodo:</label>
            <input id="nombreModal" v-model="periodoEditado.nombre" required />
          </div>

          <div class="campo">
            <label for="descripcionModal">Descripción:</label>
            <textarea
              id="descripcionModal"
              v-model="periodoEditado.descripcion"
              required
            ></textarea>
          </div>

          <div class="campo">
            <label for="estatusModal">Estatus:</label>
            <select id="estatusModal" v-model="periodoEditado.estatus">
              <option value="1">Abierta</option>
              <option value="0">Inactivo</option>
            </select>
          </div>

          <button type="submit" class="btn-agregar">Guardar Cambios</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      periodos: [],
      nuevoPeriodo: {
        nombre: "",
        descripcion: "",
        estatus: 1, // Cambiar a número
      },
      mostrarModal: false,
      periodoEditado: {},
    };
  },
  mounted() {
    this.fetchPeriodos();
  },
  methods: {
    async fetchPeriodos() {
      console.log("Fetching periodos...");
      try {
        const response = await fetch("http://10.16.14.144:4001/api/periodos");
        if (!response.ok) throw new Error("Error al obtener los periodos");
        this.periodos = await response.json();
        console.log("Periodos obtenidos:", this.periodos);
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async agregarPeriodo() {
      const { nombre, descripcion, estatus } = this.nuevoPeriodo;
      if (!nombre || !descripcion)
        return alert("Todos los campos son obligatorios");

      console.log("Datos a enviar:", { nombre, descripcion, estatus });

      try {
        const response = await fetch("http://10.16.14.144:4001/api/periodos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            descripcion,
            estatus: Number(estatus),
          }), // Convertir a número
        });

        if (!response.ok) throw new Error("Error al agregar el periodo");

        const nuevoPeriodo = await response.json();
        console.log("Nuevo periodo agregado:", nuevoPeriodo);
        this.periodos.push(nuevoPeriodo);
        this.nuevoPeriodo = { nombre: "", descripcion: "", estatus: 1 }; // Reiniciar a número
      } catch (error) {
        console.error("Error:", error);
      }
    },
    abrirModal(periodo) {
      this.periodoEditado = { ...periodo }; // Copiar el periodo a editar
      this.mostrarModal = true; // Mostrar el modal
      console.log("Abriendo modal para editar el periodo:", periodo);
    },
    cerrarModal() {
      this.mostrarModal = false; // Ocultar el modal
      console.log("Modal cerrado");
    },
    async editarPeriodo() {
      const { id, nombre, descripcion, estatus } = this.periodoEditado;

      console.log("Editando periodo con ID:", id);

      try {
        const response = await fetch(
          `http://10.16.14.144:4001/api/periodos/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              nombre,
              descripcion,
              estatus: Number(estatus),
            }), // Convertir a número
          }
        );

        if (!response.ok) throw new Error("Error al editar el periodo");

        const updatedPeriodo = await response.json();
        console.log("Periodo actualizado:", updatedPeriodo);
        const index = this.periodos.findIndex(
          (p) => p.id === updatedPeriodo.id
        );
        this.periodos.splice(index, 1, updatedPeriodo); // Actualizar el periodo en la lista

        this.cerrarModal(); // Cerrar el modal
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async eliminarPeriodo(id) {
      console.log("Eliminando periodo con ID:", id);
      try {
        const response = await fetch(
          `http://10.16.14.144:4001/api/periodos/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error("Error al eliminar el periodo");
        this.periodos = this.periodos.filter((periodo) => periodo.id !== id);
        console.log("Periodo eliminado con ID:", id);
      } catch (error) {
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style scoped>
.catalogo-periodos {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
}
h2,
h3 {
  text-align: center;
  color: #4a4a4a;
}
.formulario-periodo {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #f9f9f9;
}
.campo {
  margin-bottom: 15px;
}
.campo label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #333;
}
.campo input,
.campo textarea,
.campo select {
  width: 100%;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
  font-size: 14px;
}
textarea {
  resize: vertical;
}
.btn-agregar {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 16px;
  border: none;
  transition: background-color 0.3s;
}
.btn-agregar:hover {
  background-color: #0056b3;
}
.lista-periodos {
  margin-top: 20px;
}
.table {
  width: 100%;
  border-collapse: collapse;
}
.table th,
.table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
.table th {
  background-color: #f2f2f2;
}
.estatus {
  font-weight: bold;
  padding: 5px 10px;
  border-radius: 4px;
  text-align: center;
}
.estatus.abierta {
  background-color: #28a745;
  color: white;
}
.estatus.inactivo {
  background-color: #dc3545;
  color: white;
}
.btn-editar,
.btn-eliminar {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-right: 5px;
}
.btn-editar:hover {
  background-color: #0056b3;
}
.btn-eliminar {
  background-color: #dc3545;
}
.btn-eliminar:hover {
  background-color: #c82333;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
}
</style>
