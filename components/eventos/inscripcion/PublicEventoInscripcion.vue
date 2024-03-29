<template>
  <div v-if="evento">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="teal darken-4" outlined depressed dark v-bind="attrs" v-on="on">
          <span class="font-bold">Inscribete</span>
        </v-btn>
      </template>
      <v-card class="py-4">
        <v-card-title>
          <span class="text-2xl font-bold"
            >{{ evento.attributes.titulo }} - Formulario de inscripción.</span
          >
          <span class="text-lg text-gray-700 mt-6 font-extralight"
            >Completa el siguiente formulario para inscribirte al evento.</span
          >
        </v-card-title>
        <v-card-text>
          <v-container v-if="usuario">
            <v-form v-model="validado" lazy-validation ref="formulario">
              <v-row>
                <v-col cols="12" sm="6" md="4">
               <v-select
                  class="mt-2"
                  :items="paises"
                  item-text="nombre"
                  item-value="nombre"
                  v-model="pais"
                  :rules="reglaNotNull"
                  required
                >
                </v-select
              >
                </v-col>
                <v-col cols="12" sm="6" md="4" v-show="is_chile">
                  <v-text-field
                    v-model="usuario.rut"
                    label="Rut / Run*"
                    :rules="is_chile ? reglaRut : []"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="usuario.nombre"
                    label="Nombres*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="usuario.apellidoPaterno"
                    label="Apellido Paterno*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <v-text-field
                    v-model="usuario.apellidoMaterno"
                    label="Apellido Materno*"
                    :rules="reglaNotNull"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="4" v-show="is_chile"  v-if="regiones">
                  <v-select
                    :items="regiones"
                    item-text="nombre"
                    item-value="codigo"
                    :rules="is_chile ? reglaNotNull : []"
                    label="Región*"
                    v-model="codigoRegion"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" v-show="is_chile" v-if="provincias">
                  <v-select
                    :items="provincias"
                    item-text="nombre"
                    item-value="codigo"
                    no-data-text="Debe seleccionar la región"
                    :rules="is_chile ? reglaNotNull : []"
                    label="Provincia*"
                    v-model="codigoProvincia"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4" v-show="is_chile" v-if="comunas">
                  <v-select
                    :items="comunas"
                    item-text="nombre"
                    item-value="codigo"
                    no-data-text="Debe seleccionar la provincia"
                    label="Comuna*"
                    :rules="is_chile ? reglaNotNull : []"
                    v-model="codigoComuna"
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-text-field
                    v-model="usuario.telefono"
                    label="Teléfono"
                    :rules="reglaTelefono"
                    placeholder="Ej: 95551122"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="usuario.email"
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
            :usuario="usuario"
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
  props: ["eventDefault", "eventDisabled", "regiones"],
  data() {
    return {
      is_chile: true,
      pais: 'Chile',
      evento: this.eventDefault,
      codigoRegion: null,
      provincias: null,
      codigoProvincia: null,
      comunas: null,
      codigoComuna: null,
      dialog: false,
      dialogConfirmar: false,
      validado: false,
      usuario: {
        id: null,
        rut: null,
        nombre: null,
        apellidoPaterno: null,
        apellidoMaterno: null,
        email: null,
        telefono: null,
        pais: null,
        region: null,
        provincia: null,
        comuna: null,
      },
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
  watch: {
    pais: function(pais) {
      this.seleccionarPais(pais);
    },
    codigoRegion: function (codigoNuevo, codigoAntiguo) {
      this.seleccionarProvincias(codigoNuevo);
      this.usuario.region = this.$store.getters['ui/getRegion'](codigoNuevo);
    },
    codigoProvincia: function(codigoNuevo, codigoAntiguo) {
      this.seleccionarComunas(codigoNuevo);
      this.usuario.provincia = this.$store.getters['ui/getProvincia'](codigoNuevo);
    },
    codigoComuna: function(codigoNuevo, codigoAntiguo) {
      this.usuario.comuna = this.$store.getters['ui/getComuna'](codigoNuevo);
    }
  },
  methods: {
    async inscribirse(e) {
      e.preventDefault();

      if (this.$refs.formulario.validate()) {
        this.dialogConfirmar = true;
      }
    },
    seleccionarPais(pais) {
      this.is_chile = pais == "Chile" ? true : false;
    },
    seleccionarProvincias(codigo) {
      this.provincias = this.$store.getters['ui/getProvincias'](codigo);
    },
    seleccionarComunas(codigo) {
      this.comunas = this.$store.getters['ui/getComunas'](codigo);
    },
    cerrarDialogs() {
      this.dialogConfirmar = false;
      this.dialog = false;
    },
  },
  computed: {
    paises() {
      return this.$store.getters['ui/getPaises'];
    }
  }
};
</script>

<style>
</style>