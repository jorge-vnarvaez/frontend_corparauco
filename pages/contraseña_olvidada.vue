<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-between align-center">
      <v-img
        src="/illustration_forgot_pass.png"
        class="w-[340px] h-[400px] lg:w-[700px] lg:h-[600px]"
        contain
      ></v-img>

      <div
        v-if="correo_enviado == false"
        class="flex flex-col align-center px-[40px]"
      >
        <span class="font-bold text-base lg:text-4xl"
          >¿Olvidaste tu contraseña?</span
        >
        <span class="block w-full lg:w-96 my-6 text-base lg:text-xl text-center"
          >No te preocupes, en corparauco estamos para ayudarte, indicanos tu
          email y te enviaremos un link para que puedas crear una nueva
          contraseña.
        </span>

        <v-form
          ref="formulario"
          v-model="validado"
          lazy-validation
          @submit="enviarCorreoRecuperacion"
        >
          <v-text-field
            class="mt-2 w-full"
            background-color="grey lighten-4"
            placeholder="Correo electronico"
            v-model="email"
            :rules="reglaNotNull"
            required
            solo
            flat
          ></v-text-field>

          <button type="submit" class="bg-blue-800 mt-6 px-6 py-4 w-full">
            <span class="text-white font-bold"
              >Enviar correo de recuperación</span
            >
          </button>
        </v-form>
      </div>

      <div v-if="correo_enviado" class="flex flex-col align-center px-[40px]">
        <div class="flex space-x-8">
          <v-icon x-large color="green lighten-4">mdi-check-circle</v-icon>
          <span class="font-bold text-base lg:text-4xl">Correo enviado</span>
        </div>
        <span class="block w-full lg:w-96 my-6 text-base lg:text-xl text-center"
          >Revisa tu bandeja de entrada en el correo electronico que nos acabas
          de proporcionar, alli encontraras un link para que puedas crear una
          nueva contraseña.
        </span>

        <v-form
          ref="formulario"
          v-model="validado"
          lazy-validation
          @submit="enviarCorreoRecuperacion"
        >
          <v-text-field
            class="mt-2 w-full"
            background-color="grey lighten-4"
            placeholder="Correo electronico"
            v-model="email"
            :rules="reglaNotNull"
            required
            solo
            flat
            hidden
          ></v-text-field>

          <button type="submit" class="bg-blue-800 mt-6 px-6 py-4 w-full">
            <span class="text-white font-bold"
              >Reenviar correo</span
            >
          </button>
        </v-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validado: false,
      errorMsg: null,
      email: null,
      reglaNotNull: [(v) => !!v || "Este campo es requerido"],
      error: {
        value: false,
        errorMsg: null,
      },
      correo_enviado: false,
    };
  },
  methods: {
    enviarCorreoRecuperacion(e) {
      e.preventDefault();

      if (this.validado) {
        this.$axios
          .post(`${this.$config.apiUrl}/api/auth/forgot-password`, {
            email: this.email,
          })
          .then((response) => {
            this.correo_enviado = true;
          })
          .catch((error) => {
            console.log("error: " + error);
          });
      }
    },
  },
};
</script>

<style></style>
