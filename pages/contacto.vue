<template>
  <div class="w-full" v-if="pagina">
    <div class="bg-gradient-to-b from-blue-800 to-blue-600 h-96"></div>
    <div class="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 mb-12">
      <div
        class="bg-white w-full shadow rounded p-8 sm:p-12 -mt-72"
        v-if="pagina.header"
      >
        <p
          class="
            lg:text-5xl
            text-2xl
            font-bold
            leading-7
            text-center text-gray-700
          "
        >
          {{ pagina.header.titulo }}
        </p>

        <div
          v-if="pagina.body"
          class="w-full text-center flex justify-center my-12"
        >
          <p class="lg:w-7/12 w-full text-xl leading-loose text-gray-600">
            {{ pagina.body.texto }}
          </p>
        </div>
        <v-form
          v-model="validado"
          lazy-validation
          ref="formulario"
          @submit="contactarse"
        >
          <div class="md:flex items-center">
            <div class="w-full md:w-1/2 flex flex-col">
              <label class="font-semibold leading-none"
                >Nombre <span class="text-red-500">*</span></label
              >
              <v-text-field
                v-model="nombre"
                class="mt-4"
                background-color="grey lighten-4"
                placeholder="Escriba su nombre"
                :rules="reglaNotNull"
                solo
                flat
              ></v-text-field>
            </div>
            <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0">
              <label class="font-semibold leading-none"
                >Teléfono <span class="text-red-500">*</span></label
              >
              <v-text-field
                v-model="telefono"
                class="mt-4"
                background-color="grey lighten-4"
                placeholder="Ej: 95551122"
                :rules="reglaTelefono"
                solo
                flat
              ></v-text-field>
            </div>
          </div>
          <div class="md:flex items-center mt-4">
            <div class="w-full md:w-1/2 flex flex-col">
              <label class="font-semibold leading-none"
                >Email <span class="text-red-500">*</span></label
              >
              <v-text-field
                v-model="email"
                class="mt-4"
                background-color="grey lighten-4"
                placeholder="Ej: micorreo@gmail.com"
                :rules="reglaEmail"
                solo
                flat
              ></v-text-field>
            </div>
            <div class="w-full md:w-1/2 flex flex-col md:ml-6 md:mt-0">
              <label class="font-semibold leading-none"
                >Tipo de solicitud <span class="text-red-500">*</span></label
              >
              <v-select
                v-model="tipo_solicitud"
                :items="tipos"
                label="Seleccionar"
                class="mt-4"
                background-color="grey lighten-4"
                solo
                :rules="reglaSolicitud"
                flat
              ></v-select>
            </div>
          </div>
          <div>
            <div class="w-full flex flex-col mt-4">
              <label class="font-semibold leading-none"
                >Solicitud <span class="text-red-500">*</span></label
              >
              <v-textarea
                background-color="grey lighten-4"
                counter
                v-model="solicitud"
                :rules="reglaNotNull"
              ></v-textarea>
            </div>
          </div>
          <div class="flex items-center justify-center w-full">
            <button
              class="
                mt-9
                font-semibold
                leading-none
                text-white
                py-4
                px-10
                bg-blue-700
                rounded
                hover:bg-blue-600
                focus:ring-2
                focus:ring-offset-2
                focus:ring-blue-700
                focus:outline-none
              "
            >
              Enviar
            </button>
          </div>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    await context.store.dispatch("paginas/contacto/loadPagina");
  },
  data() {
    return {
      validado: false,
      nombre: null,
      telefono: null,
      email: null,
      tipos: ["Solicitud", "Consulta", "Felicitación", "Reclamo", "Sugerencia"],
      tipo_solicitud: null,
      solicitud: null,
      reglaNotNull: [(v) => !!v || "Este campo es obligatorio"],
      reglaTelefono: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /[0-9]/.test(v) || "El teléfono solo debe contener números",
      ],
      reglaSolicitud: [(v) => !!v || "Debe indicar el tipo de solicitud"],
      reglaEmail: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          /.+@.+\..+/.test(v) || "Debe entregar una dirección de email válida",
      ],
    };
  },
  methods: {
    async contactarse(e) {
      e.preventDefault();
      try {
        this.$refs.formulario.validate();
      } catch (e) {}
    },
  },
  computed: {
    pagina() {
      return this.$store.getters["paginas/contacto/getPagina"];
    },
  },
};
</script>

<style>
</style>