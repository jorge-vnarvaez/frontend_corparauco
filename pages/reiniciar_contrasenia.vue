<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-between align-center">
      <v-img
        src="/reset_password.png"
        class="w-[340px] h-[400px] lg:w-[700px] lg:h-[600px]"
        contain
      ></v-img>

      <div v-if="exito == false" class="flex flex-col align-center px-[40px]">
        <span class="font-bold text-base lg:text-4xl"
          >Crear nueva contraseña</span
        >
        <span class="block w-full lg:w-96 my-6 text-base lg:text-xl text-center"
          >Introduce una nueva contraseña, recuerda que tu contraseña es
          confidencial y no debe ser compartida con nadie.
        </span>

        <v-form
          ref="formulario"
          v-model="validado"
          lazy-validation
          @submit="crearNueva"
        >
          <v-text-field
            class="mt-2 w-full"
            background-color="grey lighten-4"
            placeholder="Nueva contraseña"
            v-model="password"
            :rules="reglaNotNull"
            required
            solo
            flat
            type="password"
          ></v-text-field>

          <v-text-field
            class="mt-2 w-full"
            background-color="grey lighten-4"
            placeholder="Confirmar contraseña"
            v-model="confirm_password"
            :rules="reglaPasswordConfirmation"
            required
            solo
            flat
            type="password"
          ></v-text-field>

          <button type="submit" class="bg-blue-800 mt-6 px-6 py-4 w-full">
            <span class="text-white font-bold">Crear nueva contraseña</span>
          </button>
        </v-form>
      </div>

      <div v-if="exito" class="flex flex-col align-center px-[40px]">
        <div class="flex space-x-8">
          <v-icon x-large color="green lighten-4">mdi-check-circle</v-icon>
          <span class="font-bold text-base lg:text-4xl"
            >Contraseña cambiada</span
          >
        </div>
        <span class="block w-full lg:w-96 my-6 text-base lg:text-xl text-center"
          >Haz reestablecido tu contraseña exitosamente.
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validado: false,
      password: null,
      exito: false,
      confirm_password: null,
      reglaNotNull: [(v) => !!v || "Este campo es requerido"],
      reglaPasswordConfirmation: [
        (v) => !!v || "Este campo es requerido",
        (v) => v === this.password || "Las contraseñas no coinciden",
      ],
    };
  },

  methods: {
    crearNueva(e) {
      e.preventDefault();

      if (this.$refs.formulario.validate()) {
        this.$axios
          .post(
            `${this.$config.apiUrl}/api/auth/reset-password`,
            {
              code: this.$route.query.code,
              password: this.password,
              passwordConfirmation: this.confirm_password,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((response) => {
            console.log("Your user's password has been reset.");
          });
      }
    },
  },
};
</script>

<style></style>
