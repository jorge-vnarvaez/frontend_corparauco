<template>
  <div>
    <div>
      <div
        v-for="evento in eventos.data"
        :key="evento.id"
        :class="`${isFinished(evento.id) ? 'bg-gray-100' : 'bg-white'}` + ' pa-8 shadow-md mt-8 rounded-lg border border-gray-200'"
      >
        <div class="flex lg:flex-row flex-col">
          <p class="text-2xl font-bold mb-2">{{ evento.attributes.titulo }}</p>
        </div>

        <div v-if="isFinished(evento.id)" class="mb-8 flex space-x-2">
          <v-icon color="red lighten-1">mdi-lock</v-icon><p class="mb-0 text-red-400">Este evento ya fue realizado</p>
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

          <div class="flex flex-col space-x-4">
            <div
              v-if="!evento.attributes.is_public"
              class="bg-blue-600 px-4 py-1 white--text text-sm w-32 rounded-xl"
            >
              <span>Evento privado</span>
            </div>
          </div>
         <!-- <nuxt-link :to="{ name: 'eventos-id', params: { id: evento.id} }" target="_blank"><v-btn outlined> Ver página del evento <v-icon>mdi-arrow-top-right-thick</v-icon></v-btn></nuxt-link> -->
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
    const qs = require('qs');

    const query = qs.stringify({
      sort: ['fecha_inicio:desc']
    })


    this.eventos = await fetch(`${this.$config.apiUrl}/api/eventos?${query}`).then(
      (res) => res.json()
    );
  },
  computed: {
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("dddd DD [de] MMMM YYYY");
    },
    // create a computed property who receive an evento id and check if event attributes fecha_termino is null or not
    // if it is null, use event attributes fecha_inicio to check if it is finished or not
    // if it is not null, use event attributes fecha_termino to check if it is finished or not
    isFinished() {
      return (id) => {
        const evento = this.eventos.data.find((evento) => evento.id === id);

        const moment = require("moment");

        if (evento.attributes.fecha_termino) {
          return moment(evento.attributes.fecha_termino).isBefore(
            moment()
          );
        } else {
          return moment(evento.attributes.fecha_inicio).isBefore(
            moment()
          );
        }
      };
    },
  },
};
</script>

<style>
</style>