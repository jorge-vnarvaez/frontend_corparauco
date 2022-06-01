<template>
  <div>
    <div class="grid grid-cols-12 gap-x-0 lg:gap-x-8 gap-y-8 lg:gap-y-8 mb-4">
      <!-- <empty-section
        class="col-span-11 lg:col-span-6"
        defaultIcon="mdi-book-plus"
        defaultTitle="Mis Cursos"
        defaultLabel="No te haz inscrito a ningún curso"
        defaultBtnMsg="Inscribirse"
      />

      <empty-section
        v-if="eventosRecientes.length == 0"
        class="col-span-11 lg:col-span-6"
        defaultIcon="mdi-calendar-blank-outline"
        defaultTitle="Lo sentimos"
        defaultLabel="No tenemos programado ningún evento para esta semana"
        defaultBtnMsg="Ver otros eventos"
      /> -->
    </div>

   
  </div>
</template>

<script>
import EmptySection from "./EmptySection.vue";
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