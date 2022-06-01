<template>
  <div>
    <div>
      <div
        v-for="evento in eventos.data"
        :key="evento.id"
        class="bg-white pa-8 shadow-md mt-8 rounded-lg border border-gray-200"
      >
        <div class="flex lg:flex-row flex-col">
          <p class="text-2xl font-bold mb-6">{{ evento.attributes.titulo }}</p>
        </div>

        <div class="flex flex-col">
          <div class="flex align-end">
            <v-icon class="mr-1">mdi-map-marker</v-icon>
            <p class="mb-0 font-light">{{ evento.attributes.ubicacion }}</p>
          </div>

          <div
            class="flex align-end mt-6"
            v-if="evento.attributes.fecha_inicio"
          >
            <v-icon class="mr-1">mdi-calendar</v-icon>
            <p class="mb-0 font-light">
              {{ fechaFormateada(evento.attributes.fecha_inicio) }}
            </p>
          </div>
        </div>

        <div class="flex mt-8 justify-between align-center">
          <div
            v-if="evento.attributes.is_public"
            class="bg-blue-800 px-4 py-1 rounded-full white--text text-sm"
          >
            <span>Evento público</span>
          </div>

          <div class="flex space-x-4">
            <div
              v-if="!evento.attributes.is_public"
              class="bg-emerald-700 px-4 rounded-full py-1 white--text text-sm"
            >
              <span>Evento privado</span>
            </div>

            <div
              v-if="!evento.attributes.is_public"
              class="bg-green-600 px-4 rounded-full py-1 white--text text-sm"
            >
              <span>Requiere inscripción</span>
            </div>
          </div>
         <nuxt-link :to="{ name: 'eventos-id', params: { id: evento.id} }" target="_blank"><v-btn outlined> Ver página del evento <v-icon>mdi-arrow-top-right-thick</v-icon></v-btn></nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      eventos: [],
    };
  },
  async fetch() {
    this.eventos = await fetch(`${this.$config.apiUrl}/api/eventos`).then(
      (res) => res.json()
    );
  },
  computed: {
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("dddd DD [de] MMMM YYYY");
    },
  },
};
</script>

<style>
</style>