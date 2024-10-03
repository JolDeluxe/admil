<template>
  <div class="validacion-resultados">
    <h2>Validación de Resultados de Aspirantes</h2>
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>CURP</th>
          <th>Carrera</th>
          <th>Estatus</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(aspirante, index) in aspirantes" :key="aspirante.curp">
          <td>{{ aspirante.nombre }}</td>
          <td>{{ aspirante.curp }}</td>
          <td>{{ aspirante.carrera }}</td>
          <td>
            <span :class="{
                'estatus-pendiente': aspirante.estatus === 'Pendiente',
                'estatus-aceptado': aspirante.estatus === 'Aceptado',
                'estatus-rechazado': aspirante.estatus === 'Rechazado',
              }">
              {{ aspirante.estatus }}
            </span>
          </td>
          <td>
            <button @click="cambiarEstatus(aspirante.curp, 'Aceptado')"
                    :disabled="aspirante.estatus === 'Aceptado'">
              Aceptar
            </button>
            <button @click="cambiarEstatus(aspirante.curp, 'Rechazado')"
                    :disabled="aspirante.estatus === 'Rechazado'">
              Rechazar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aspirantes: [],
    };
  },
  mounted() {
    this.fetchAspirantes();
  },
  methods: {
    async fetchAspirantes() {
      try {
        const response = await fetch('/api/aspirantes'); // Cambié a esta ruta para obtener todos los aspirantes
        if (!response.ok) {
          throw new Error('Error al obtener los aspirantes');
        }
        this.aspirantes = await response.json();
      } catch (error) {
        console.error('Error:', error);
        alert('Error al cargar los aspirantes. Por favor intenta de nuevo.');
      }
    },
    async cambiarEstatus(curp, nuevoEstatus) {
      try {
        const response = await fetch(`/api/aspirantes/${curp}/seleccion`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estatus: nuevoEstatus }),
        });

        if (!response.ok) {
          throw new Error('Error al cambiar el estatus');
        }

        const aspirante = this.aspirantes.find(a => a.curp === curp);
        aspirante.estatus = nuevoEstatus;

        alert(`El estatus de ${aspirante.nombre} ha sido cambiado a ${nuevoEstatus}`);
      } catch (error) {
        console.error('Error:', error);
        alert('Hubo un error al cambiar el estatus. Por favor intenta de nuevo.');
      }
    },
  },
};
</script>

<style scoped>
.validacion-resultados {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  background-color: #4caf50;
  color: white;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

button {
  margin-right: 5px;
  padding: 8px 15px;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s, transform 0.2s;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

button:first-child {
  background-color: #4caf50;
  color: white;
}

button:last-child {
  background-color: #f44336;
  color: white;
}

button:hover:not(:disabled) {
  transform: scale(1.05);
}

.estatus-pendiente {
  color: orange;
  font-weight: bold;
}

.estatus-aceptado {
  color: green;
  font-weight: bold;
}

.estatus-rechazado {
  color: red;
  font-weight: bold;
}
</style>
