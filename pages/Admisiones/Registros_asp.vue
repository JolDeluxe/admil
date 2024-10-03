<template>
  <div class="registro-aspirante">
    <h2>Registro de Aspirantes</h2>
    <form @submit.prevent="registrarAspirante">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="nombre" required />
      </div>
      <div>
        <label for="correo">Correo:</label>
        <input type="email" v-model="correo" required />
      </div>
      <div>
        <label for="telefono">Teléfono:</label>
        <input type="text" v-model="telefono" required />
      </div>
      <div>
        <label for="usuario">Usuario:</label>
        <input type="text" v-model="usuario" required />
      </div>
      <div>
        <label for="curp">CURP:</label>
        <input type="text" v-model="curp" required />
      </div>
      <div>
        <label for="carrera">Carrera Deseada:</label>
        <input type="text" v-model="carrera" required />
      </div>
      <div>
        <label for="periodo">Periodo de Inscripción:</label>
        <select v-model="periodoId" required>
          <option value="" disabled selected>Seleccione un período</option>
          <option
            v-for="periodo in periodos"
            :key="periodo.id"
            :value="periodo.id"
          >
            {{ periodo.nombre }}
          </option>
        </select>
      </div>
      <button type="submit">Registrar Aspirante</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: "",
      correo: "",
      telefono: "",
      usuario: "",
      curp: "",
      carrera: "",
      periodoId: null,
      periodos: [],
    };
  },
  mounted() {
    this.fetchPeriodos(); // Obtén los periodos de inscripción al montar el componente
  },
  methods: {
    async fetchPeriodos() {
      try {
        const response = await fetch("http://localhost:4000/api/periodos");
        if (!response.ok) {
          throw new Error("Error al obtener los periodos");
        }
        this.periodos = await response.json();
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async registrarAspirante() {
      try {
        const nuevoAspirante = {
          nombre: this.nombre,
          correo: this.correo,
          telefono: this.telefono,
          usuario: this.usuario,
          curp: this.curp,
          carrera: this.carrera,
          periodoId: this.periodoId,
        };

        // Imprime los datos que se están enviando en la consola
        console.log("Datos a enviar:", nuevoAspirante);

        const response = await fetch("http://localhost:4000/api/aspirantes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoAspirante),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al registrar el aspirante");
        }

        // Mostrar un mensaje si el registro fue exitoso
        alert("Aspirante registrado correctamente");

        // Limpia el formulario
        this.nombre = "";
        this.correo = "";
        this.telefono = "";
        this.usuario = "";
        this.curp = "";
        this.carrera = "";
        this.periodoId = null;
      } catch (error) {
        console.error("Error:", error);
        alert(error.message); // Muestra un mensaje de error al usuario
      }
    },
  },
};
</script>

<style scoped>
/* Estilos para el formulario */
.registro-aspirante {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

form div {
  margin-bottom: 10px;
}

label {
  display: block;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}
</style>
