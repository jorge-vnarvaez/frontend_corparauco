<template>
  <v-form
    v-model="validado"
    lazy-validation
    ref="formulario"
    @submit="cambiarPassword"
  >
    <v-text-field
      v-model="password_nueva"
      type="password"
      label="Contraseña nueva"
      :rules="reglaPassword"
      required
    ></v-text-field>

    <v-text-field
      v-model="password_confirmada"
      type="password"
      label="Confirmar contraseña"
      :rules="reglaConfirmarPassword"
      required
    ></v-text-field>

    <v-btn type="submit">Cambiar contraseña</v-btn>
  </v-form>
</template>

<script>
export default {
  data() {
    return {
      validado: false,
      password_nueva: null,
      password_confirmada: null,
      reglaPassword: [
        (v) => !!v || "Este campo es obligatorio",
        (v) =>
          (!!v && v.length > 5) ||
          "La contraseña debe tener al menos 8 caracteres",
      ],
      reglaConfirmarPassword: [
        (v) => !!v || "Este campo es obligatorio",

        (v) => v == this.password_nueva || "Las contraseñas no coinciden",
      ],
    };
  },
  methods: {
    cambiarPassword(e) {
      e.preventDefault();

      this.$refs.formulario.validate();
    },
  },
};
</script>

<style>
</style>