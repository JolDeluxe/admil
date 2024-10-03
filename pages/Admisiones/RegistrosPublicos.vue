<template>
  <div class="resultados-publicos">
    <h2>Resultados de Aspirantes Aceptados</h2>

    <div v-if="paginatedAspirantes.length === 0" class="mensaje-vacio">
      No se encontraron resultados.
    </div>

    <table v-else class="tabla-resultados">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Carrera</th>
          <th>Estatus</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="aspirante in paginatedAspirantes" :key="aspirante.curp">
          <td>{{ aspirante.nombre }}</td>
          <td>{{ aspirante.carrera }}</td>
          <td>
            <span
              :class="{
                aceptado: aspirante.estatus === 'ACEPTADO',
                rechazado: aspirante.estatus === 'RECHAZADO',
              }"
            >
              {{ aspirante.estatus }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Controles de paginación -->
    <div class="pagination">
      <button @click="previousPage" :disabled="currentPage === 1">
        Anterior
      </button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button @click="nextPage" :disabled="currentPage === totalPages">
        Siguiente
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busqueda: "", // Campo para la búsqueda
      aspirantes: [], // Inicialmente vacío, se llenará con los datos de la API
      currentPage: 1,
      itemsPerPage: 10, // Cambié a 10 para mostrar más resultados por página
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.aspirantesFiltrados.length / this.itemsPerPage);
    },
    paginatedAspirantes() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      return this.aspirantesFiltrados.slice(start, start + this.itemsPerPage);
    },
    aspirantesFiltrados() {
      return this.aspirantes.filter((aspirante) =>
        aspirante.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
      );
    },
  },
  methods: {
    async fetchAspirantes() {
      try {
        const response = await fetch(
          "http://10.16.14.144:4001/api/aspirantes/aceptados"
        );
        const data = await response.json();

        // Agregamos el console.log para ver los datos recibidos
        console.log("Datos recibidos:", data);

        this.aspirantes = data.map((validacion) => ({
          nombre: validacion.Aspirante.nombre,
          carrera: validacion.Aspirante.carrera,
          estatus: validacion.estatus,
          curp: validacion.Aspirante.curp,
        }));
      } catch (error) {
        console.error("Error al obtener los aspirantes aceptados:", error);
      }
    },
  },
  mounted() {
    this.fetchAspirantes(); // Cargar aspirantes aceptados al montar el componente
  },
};
</script>

<style scoped>
.resultados-publicos {
  max-width: 1000px; /* Aumentar el ancho máximo de la tabla */
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-family: "Arial", sans-serif;
}

.buscador {
  margin-bottom: 20px;
  text-align: center;
}

.buscador input {
  width: 100%;
  max-width: 400px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.mensaje-vacio {
  text-align: center;
  font-size: 18px;
  color: #999;
}

.tabla-resultados {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.tabla-resultados th,
.tabla-resultados td {
  padding: 16px 20px; /* Aumentar el padding de la tabla */
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.tabla-resultados th {
  background-color: #4caf50;
  color: white;
  font-weight: bold;
}

.tabla-resultados td {
  background-color: #fff;
  color: #333;
}

.aceptado {
  color: green;
  font-weight: bold;
}

.rechazado {
  color: red;
  font-weight: bold;
}

.tabla-resultados tr:nth-child(even) {
  background-color: #f2f2f2;
}

.tabla-resultados tr:hover {
  background-color: #f1f1f1;
}

.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination button {
  padding: 10px 15px;
  margin: 0 5px;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  border-radius: 5px;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination span {
  align-self: center;
  margin: 0 10px;
}
</style>
