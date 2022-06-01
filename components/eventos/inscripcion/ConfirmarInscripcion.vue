<template>
  <div v-if="usuario">
    <v-dialog v-model="dialogConfirmar" persistent max-width="600px">
      <v-card class="py-4">
        <v-card-title>
          <span class="text-2xl text-gray-900 mt-6 font-bold mb-6"
            >La inscripción se realizará con la información que aparece a
            continuación:</span
          >

          <div class="flex flex-col">
            <span class="flex justify-between"
              ><span class="font-bold">Rut / Run:</span> {{ usuario.rut }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Nombre/s:</span>
              {{ usuario.nombre }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Apellido paterno:</span>
              {{ usuario.apellidoPaterno }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Apellido materno:</span>
              {{ usuario.apellidoMaterno }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Región:</span> {{ usuario.region }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Provincia:</span>
              {{ usuario.provincia }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Comuna:</span> {{ usuario.comuna }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Teléfono:</span>
              {{ usuario.telefono }}</span
            >
            <span class="flex justify-between"
              ><span class="font-bold">Correo:</span> {{ usuario.email }}</span
            >
          </div>

          <span class="text-xl font-bold mt-6"
            >¿Está seguro de que desea inscribirse?</span
          >
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogConfirmar = false">
            No, no estoy seguro
          </v-btn>
          <v-btn color="blue darken-1" @click="inscribirse"
            ><span class="text-white">Si, estoy seguro</span></v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-snackbar
      v-model="snackbarExito"
      :timeout="timeout"
      color="green darken-1"
      centered
      class="text-xl"
    >
      Estimado/a {{ usuario.nombre }} te haz inscrito al evento
      <span class="font-bold">{{ evento.attributes.title }}</span> exitosamente!

      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarExito = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarError" :timeout="10000" color="red" centered class="text-xl">
      Estimado/a {{ usuario.nombre }} de acuerdo a nuestros registros, ya estas
      inscrito al evento
      <span class="font-bold">{{ evento.attributes.title }}</span> por lo que no
      procesaremos tu solicitud actual, si piensas que esto se trata de un
      malentendido te invitamos a
      <nuxt-link :to="{ name: 'contacto' }"
        ><span class="font-bold text-white">contactarte</span></nuxt-link
      >
      con nosotros y responderemos tus dudas a la brevedad.
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarError = false">
          Cerrar
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ["evento", "usuario", "dialogConfirmar"],
  data() {
    return {
      snackbarExito: false,
      snackbarError: false,
      timeout: 4500,
    };
  },
  methods: {
    async inscribirse(e) {
      e.preventDefault();

      let lastInscripciones = this.evento.attributes.inscripciones;

      if (
        lastInscripciones.find(
          (inscripcion) => inscripcion.rut == this.usuario.rut
        )
      ) {
        this.dialogConfirmar = false;
        this.snackbarError = true;
      } else {
        await this.$axios
          .put(`${this.$config.apiUrl}/api/eventos/${this.evento.id}`, {
            data: {
              inscripciones: lastInscripciones.concat([
                {
                  rut: this.usuario.rut,
                  nombre: this.usuario.nombre,
                  apellidos:
                    this.usuario.apellidoPaterno +
                    " " +
                    this.usuario.apellidoMaterno,
                  region: this.usuario.region,
                  provincia: this.usuario.provincia,
                  comuna: this.usuario.comuna,
                  telefono: this.usuario.telefono,
                  email: this.usuario.email,
                },
              ]),
            },
          })
          .then((res) => {
            this.dialogConfirmar = false;
            this.snackbarExito = true;
          });
      }
    },
  },
};
</script>

<style>
</style>