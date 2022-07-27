<template>
  <div>
    <div class="grid grid-cols-12 gap-x-0 lg:gap-x-8 gap-y-8 lg:gap-y-8 mb-4">
      <empty-section
        v-if="eventosRecientes.length == 0"
        class="col-span-12 lg:col-span-6"
        defaultIcon="mdi-calendar-blank-outline"
        defaultTitle="Lo sentimos"
        defaultLabel="No tenemos programado ningún evento para esta semana"
        defaultBtnMsg="Ver otros eventos"
        linkTo="eventos"
      />
      <div v-else class="col-span-12">
        <span class="font-bold text-3xl px-8 mb-6">Eventos esta semana </span>
        <div v-for="eventoReciente in eventosRecientes" :key="eventoReciente">
          <div
            class="
              mt-6
              px-8
              py-8
              bg-white
              shadow-md
              rounded-lg
              border border-gray-200
            "
          >
            <p class="text-2xl font-bold">
              {{ eventoReciente.attributes.titulo }}
            </p>
            <div class="flex space-x-16">
              <div v-if="eventoReciente.attributes.calendario" class="mb-6">
                <div class="flex align-end">
                  <v-icon large>mdi-calendar</v-icon
                  ><span class="ml-1 font-bold text-xl"
                    >Se realiza: 
                    <span
                    class="font-thin"
                      v-for="calendario in eventoReciente.attributes.calendario"
                      :key="calendario.id"
                    >
                      {{ formatearDia(calendario.dia) }}
                    </span></span
                  >
                </div>
              </div>
              <div>
                <div class="flex align-end">
                  <v-icon large>mdi-map-marker</v-icon
                  ><span class="ml-1 font-bold text-xl mb-0"
                    >Ubicación:
                    <span class="font-thin">{{
                      eventoReciente.attributes.ubicacion
                    }}</span></span
                  >
                </div>
              </div>
            </div>
            <nuxt-link
              :to="{ name: 'eventos-id', params: { id: eventoReciente.id } }"
              target="_blank"
              class="flex justify-end"
              ><v-btn outlined>
                Ver página del evento
                <v-icon>mdi-arrow-top-right-thick</v-icon></v-btn
              ></nuxt-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptySection from "./EmptySection.vue";
import moment from "moment";

export default {
  components: { EmptySection },
  data() {
    return {
      page: 0,
      colors: ["indigo", "orange", "green", "teal", "indigo darken-4"],
    };
  },
  methods: {
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
  computed: {
    randomColor() {
      return this.colors[this.rnd(0, this.colors.length - 1)];
    },

    eventosRecientes() {
      return this.$store.getters["eventos/getEventosRecientes"];
    },
    formatearFecha() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("DD MMM");
    },
    formatearDia() {
      moment.locale("ES");

      return (fecha) => moment(fecha).format("dddd DD");
    },
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("LL");
    },
    formatearHora() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("HH a");
    },
  },
};
</script>

<style>
</style>