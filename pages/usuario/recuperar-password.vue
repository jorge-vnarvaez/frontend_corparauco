<template>
  <div>
    <h1>Recuperar contraseña</h1>
    <v-form
      v-model="validado"
      lazy-validation
      ref="formulario"
      @submit="enviarEmailRecuperacion"
    >
      <v-text-field
        type="email"
        v-model="email"
        label="Ingrese el email al cuál su cuenta se encuentra registrada"
        :rules="reglaEmail"
        placeholder="Ejemplo micorreo@gmail.com"
        required
      ></v-text-field>

      <v-btn type="submit">Enviar email</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      validado: false,
      email: null,
      reglaEmail: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          /.+@.+\..+/.test(v) || "Debe entregar una dirección de email válida",
      ],
    };
  },
  methods: {
    enviarEmailRecuperacion(e) {
      e.preventDefault();
      this.$refs.formulario.validate();

      this.$nuxt.$options.router.push("/usuario/nueva-password");
    },
  },
};
</script>

<style>
</style>