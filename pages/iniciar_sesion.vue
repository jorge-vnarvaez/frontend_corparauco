<template>
  <div>
    <div
      class="relative min-h-screen flex flex-col justify-center items-center lg:px-0 px-8"
    >
      <div class="relative sm:max-w-sm w-full">
        <div
          class="card bg-blue-700 shadow-lg w-full h-full rounded-3xl absolute transform -rotate-6"
        ></div>
        <div
          class="card bg-amber-600 shadow-lg w-full h-full rounded-3xl absolute transform rotate-6"
        ></div>
        <div
          class="relative w-full rounded-3xl px-6 py-4 bg-gray-100 shadow-md"
        >
          <label
            for=""
            class="block mt-3 text-2xl text-gray-700 text-center font-semibold"
          >
            Iniciar sesión
          </label>

          <v-form
            v-model="validado"
            lazy-validation
            ref="formulario"
            @submit="login"
            class="mt-8"
          >
            <v-text-field
              type="email"
              v-model="email"
              required
              :rules="reglaNotNull"
              placeholder="Correo electronico"
              class="mt-1 block w-full border-none bg-gray-100 h-11 rounded-lg shadow-lg focus:ring-0"
              solo
              flat
            ></v-text-field>

            <v-text-field
              type="password"
              v-model="password"
              required
              :rules="reglaNotNull"
              placeholder="Contraseña"
              class="mt-12 block w-full border-none bg-gray-100 h-11 rounded-lg shadow-lg focus:ring-0 mb-4"
              solo
              flat
            ></v-text-field>

            <span v-if="error.value" class="text-red-400 block mt-12 px-3">{{
              error.errorMsg
            }}</span>

            <button
              type="submit"
              class="bg-blue-800 w-full py-3 mt-4 rounded-xl shadow-xl transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
            >
              <span class="text-white mt-4">Iniciar sesión</span>
            </button>

            <div class="mt-7">
              <div class="flex justify-center items-center">
                <label class="mr-2">¿No tienes una cuenta?</label>
                <nuxt-link
                  :to="{ name: 'registro' }"
                  class="text-blue-500 transition duration-500 ease-in-out transform hover:-translate-x hover:scale-105"
                >
                  Registrate aquí
                </nuxt-link>
              </div>
            </div>

            <div class="my-4 flex justify-center">
              <nuxt-link :to="{ name: 'contraseña_olvidada' }"
                >¿Olvidaste tu contraseña?</nuxt-link
              >
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layouts: "default",
  data() {
    return {
      validado: false,
      errorMsg: null,
      email: null,
      password: null,
      reglaNotNull: [(v) => !!v || "Este campo es obligatorio"],
    };
  },
  methods: {
    login(e) {
      e.preventDefault();

      try {
        this.$refs.formulario.validate();

        const credenciales = {
          email: this.email,
          password: this.password,
        };

        const params = this.$route.query.redirect || "/home";

        this.$store.dispatch("session/login", {
          credenciales: credenciales,
          params: params,
        });
      } catch (e) {
        this.errorMsg = "Email y/o contraseña invalidos";
      }
    },
  },
  computed: {
    error() {
      return this.$store.getters["session/getError"];
    },
  },
};
</script>

<style></style>
