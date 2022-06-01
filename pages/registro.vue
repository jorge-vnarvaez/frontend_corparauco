<template>
  <div>
    <!-- component -->
    <div class="grid place-items-center">
      <div class="w-11/12 p-12 bg-white sm:w-8/12 md:w-1/2 lg:w-5/12">
        <h1 class="text-2xl font-semibold mb-8">
          Hola 👋,
          <span class="font-normal"
            >por favor brindanos tu información para continuar</span
          >
        </h1>

        <v-form
          ref="formulario"
          v-model="validado"
          lazy-validation
          @submit="registrarse"
        >
          <div class="flex justify-between gap-3">
            <v-row>
              <v-col lg="4" cols="12">
                <label
                  class="
                    block
                    text-xs
                    font-semibold
                    text-gray-600
                    uppercase
                  "
                  >País<span
                    class="text-red-500"
                    >*</span
                  ></label
                >

                <v-select
                  class="mt-2"
                  :items="paises"
                  background-color="grey lighten-4"
                  item-text="nombre"
                  item-value="nombre"
                  v-model="pais"
                  :rules="reglaNotNull"
                  solo
                  flat
                >
                </v-select
              ></v-col>

              <v-col lg="4" cols="12" v-show="is_chile">
                <label
                  class="block text-xs font-semibold text-gray-600 uppercase"
                  >Rut / Run <span class="text-red-500">*</span></label
                >
                <v-text-field
                  class="mt-2"
                  background-color="grey lighten-4"
                  v-model="rut"
                  :rules="is_chile ? reglaRut : []"
                  required
                  solo
                  flat
                ></v-text-field>
                <span v-if="rutExiste" class="text-red-500"
                  >Este rut ya está siendo utilizado</span
                >
              </v-col>
              <v-col lg="4" cols="12">
                <label
                  class="block text-xs font-semibold text-gray-600 uppercase"
                  >Nombre <span class="text-red-500">*</span></label
                >
                <v-text-field
                  class="mt-2"
                  background-color="grey lighten-4"
                  v-model="nombre"
                  :rules="reglaNotNull"
                  required
                  solo
                  flat
                ></v-text-field>
              </v-col>
              <v-col lg="4" cols="12">
                <label
                  class="block text-xs font-semibold text-gray-600 uppercase"
                  >Apellido paterno <span class="text-red-500">*</span></label
                >
                <v-text-field
                  class="mt-2"
                  background-color="grey lighten-4"
                  v-model="apellido_paterno"
                  :rules="reglaNotNull"
                  required
                  solo
                  flat
                ></v-text-field>
              </v-col>
              <v-col :lg="is_chile ? 4 : 6" cols="12">
                <label
                  class="block text-xs font-semibold text-gray-600 uppercase"
                  >Apellido materno <span class="text-red-500">*</span></label
                >
                <v-text-field
                  class="mt-2"
                  background-color="grey lighten-4"
                  v-model="apellido_materno"
                  :rules="reglaNotNull"
                  required
                  solo
                  flat
                ></v-text-field>
              </v-col>
              <v-col :lg="is_chile ? 4 : 6" cols="12">
                <label
                  class="block text-xs font-semibold text-gray-600 uppercase"
                  >Teléfono <span class="text-red-500">*</span></label
                >
                <v-text-field
                  class="mt-2"
                  background-color="grey lighten-4"
                  v-model="telefono"
                  :rules="reglaNotNull"
                  required
                  solo
                  flat
                ></v-text-field>
              </v-col>
            </v-row>
          </div>

          <label
            for="email"
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >E-mail <span class="text-red-500">*</span></label
          >
          <span v-if="correoExiste" class="text-red-500"
            >Este correo ya está siendo utilizado</span
          >
          <v-text-field
            type="email"
            v-model="email"
            class="mt-2"
            background-color="grey lighten-4"
            :rules="reglaEmail"
            placeholder="Ejemplo micorreo@gmail.com"
            required
            flat
            solo
          ></v-text-field>
          <label
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Contraseña <span class="text-red-500">*</span></label
          >
          <v-text-field
            v-model="password"
            class="mt-2"
            background-color="grey lighten-4"
            type="password"
            :rules="reglaPassword"
            required
            solo
            flat
          ></v-text-field>
          <label
            class="block mt-2 text-xs font-semibold text-gray-600 uppercase"
            >Confirmar contraseña <span class="text-red-500">*</span></label
          >
          <v-text-field
            v-model="password_confirmada"
            class="mt-2"
            background-color="grey lighten-4"
            type="password"
            :rules="reglaConfirmarPassword"
            required
            solo
            flat
          ></v-text-field>

          <!-- <v-checkbox
            v-model="terminos_condiciones"
            label="He leído y acepto los términos y condiciones de uso de servicio"
            :rules="reglaChekcbox"
            required
          ></v-checkbox> -->

          <button
            type="submit"
            class="
              w-full
              py-3
              mt-2
              font-medium
              tracking-widest
              text-white
              uppercase
              bg-amber-700
              shadow-lg
              focus:outline-none
              hover:bg-blue-800 hover:shadow-none
            "
          >
            <span class="text-white">Crear cuenta</span>
          </button>
        </v-form>
        <span
          class="
            flex
            inline-block
            text-lg
            mt-8
            text-gray-500
            cursor-pointer
            hover:text-black
          "
        >
          ¿Ya estas registrado?,
          <span
            ><nuxt-link :to="{ name: 'iniciar_sesion' }"
              >Inicia sesión</nuxt-link
            ></span
          >
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      codigoPais: null,
      step: 1,
      validado: false,
      is_chile: true,
      correoExiste: false,
      rutExiste: false,
      rut: null,
      nombre: null,
      apellido_paterno: null,
      apellido_materno: null,
      nombre_usuario: null,
      telefono: null,
      password: null,
      password_confirmada: null,
      email: null,
      pais: 'Chile',
      terminos_condiciones: false,
      reglaNotNull: [(v) => !!v || "Este campo es obligatorio"],
      reglaEmail: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          /.+@.+\..+/.test(v) || "Debe entregar una dirección de email válida",
      ],
      reglaPassword: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (!!v && v.length > 5) ||
          "La contraseña debe tener al menos 8 caracteres",
      ],
      reglaConfirmarPassword: [
        (v) => !!v || "Este campo es obligatorio",

        (v) => v == this.password || "Las contraseñas no coinciden",
      ],
      reglaChekcbox: [
        (v) => !!v || "No ha aceptado los términos y condiciones",
      ],
      reglaRut: [
        (v) => !!v || "Este campo es obligatorio",
        (v) => /.+\..+-/.test(v) || "Ingrese rut con puntos y guión",
      ],
    };
  },
  watch: {
    pais: function(pais) {
      this.seleccionarPais(pais);
    }
  },
  methods: {
    seleccionarPais(pais) {
      this.is_chile = pais == "Chile" ? true : false;
    },
    async registrarse(e) {
      e.preventDefault();
      if (this.$refs.formulario.validate()) {
        const users = await this.$axios.get(`${this.$config.apiUrl}/api/users`);

        this.username = this.email.slice(0, this.email.indexOf("@"));

        if (users.data.find((user) => user.email == this.email)) {
          this.correoExiste = true;
        } else {
          this.correoExiste = false;
        }

        if (this.rut) {
          if (users.data.find((user) => user.rut == this.rut)) {
            this.rutExiste = true;
          } else {
            this.rutExiste = false;
          }
        }

        if (!this.correoExiste && !this.rutExiste) {
          await this.$axios.post(
            `http://localhost:1337/api/auth/local/register`,
            {
              rut: this.rut != null ? this.rut : null,
              username: this.username,
              email: this.email,
              password: this.password,
              nombre: this.nombre,
              apellidoPaterno: this.apellido_paterno,
              apellidoMaterno: this.apellido_materno,
              telefono: this.telefono,
              es_miembro: false,
              cargo: null,
              confirmed: true,
              activo: true,
              blocked: false,
              foto_perfil: null,
              orden: 0,
              pais: this.pais,
            }
          );
        }
      }
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