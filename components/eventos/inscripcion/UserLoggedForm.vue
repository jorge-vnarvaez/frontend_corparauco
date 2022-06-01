<template>
  <div class="mt-8" v-if="evento">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
         <v-btn color="teal darken-4" outlined depressed dark v-bind="attrs" v-on="on">
          <span class="font-bold">Inscribete</span>
        </v-btn>
      </template>
      <v-card class="py-4">
        <v-card-title>
          <span class="text-2xl font-bold"
            >{{ evento.attributes.title }} - Formulario de inscripción.</span
          >
          <span class="text-lg text-gray-700 mt-6 font-extralight"
            >Completa el siguiente formulario para inscribirte al evento.</span
          >
        </v-card-title>
        <v-card-text>
          <v-container v-if="user">
            <v-form v-model="validado" lazy-validation ref="formulario">
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="user.data.rut"
                    label="Rut / Run*"
                    :rules="reglaRut"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="user.data.nombre"
                    label="Nombres*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="user.data.apellidoPaterno"
                    label="Apellido Paterno*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="user.data.apellidoMaterno"
                    label="Apellido Materno*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <!-- <v-col cols="12" sm="6">
                  <v-select
                    :items="regiones"
                    item-text="nombre"
                    item-value="codigo"
                    :rules="reglaNotNull"
                    label="Región*"
                    v-model="codigoRegion"
                  ></v-select>
                </v-col> -->
                <!-- <<v-col cols="12" sm="4">
                  <v-select
                    :items="provincias"
                    item-text="nombre"
                    item-value="codigo"
                    no-data-text="Debe seleccionar la región"
                    :rules="reglaNotNull"
                    label="Provincia*"
                    v-model="codigoProvincia"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-select
                    :items="comunas"
                    item-text="nombre"
                    item-value="codigo"
                    no-data-text="Debe seleccionar la provincia"
                    label="Comuna*"
                    :rules="reglaNotNull"
                    v-model="codigoComuna"
                  ></v-select>
                </v-col> -->
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="user.data.telefono"
                    label="Teléfono"
                    :rules="reglaTelefono"
                    placeholder="Ej: 95551122"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="user.data.email"
                    label="Correo electrónico*"
                    :rules="reglaEmail"
                    placeholder="Ejemplo: micorreo@gmail.com"
                    required
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
          <div class="flex flex-col">
            <small>* Campos obligatorios.</small>
            <small class="mt-6"
              ><span class="font-bold">NOTA: </span>Para este y otros eventos de
              los que desees participar, te recomedamos
              <span
                ><nuxt-link :to="{ name: 'registro' }"
                  >crear una cuenta</nuxt-link
                ></span
              >, así el proceso será más rápido y efectivo.</small
            >
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cerrarDialogs">
            Cerrar
          </v-btn>
          <v-btn color="primary" dark @click="inscribirse">Inscribirse</v-btn>

          <confirmar-inscripcion
            :evento="evento"
            :usuario="user.data"
            :dialogConfirmar="dialogConfirmar"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import ConfirmarInscripcion from "./ConfirmarInscripcion.vue";

export default {
  components: { ConfirmarInscripcion },
  props: ["is_finished", "eventDefault", "regiones"],
  data() {
    return {
      dialog: false,
      validado: false,
      dialogConfirmar: false,
      evento: this.eventDefault,
      user: null,
      snackbar: false,
      timeout: 2500,
      reglaNotNull: [(v) => !!v || "Este campo es obligatorio"],
      reglaRut: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+\..+-/.test(v) || "Ingrese rut con puntos y guión",
      ],
      reglaEmail: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          /.+@.+\..+/.test(v) || "Debe entregar una dirección de email válida",
      ],
      reglaTelefono: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /[0-9]/.test(v) || "El teléfono solo debe contener números",
      ],
    };
  },
  computed: {
    session() {
      return this.$cookies.get("jwt");
    },
  },
  async beforeMount() {
    this.user = await this.$axios.get(
      `${this.$config.apiUrl}/api/users/${this.$cookies.get("user")}`
    );
  },
  methods: {
    async inscribirse(e) {
      e.preventDefault();

      if (this.$refs.formulario.validate()) {
        this.dialogConfirmar = true;
      }
    },
    cerrarDialogs() {
      this.dialogConfirmar = false;
      this.dialog = false;
    },
  },
};
</script>

<style>
</style>