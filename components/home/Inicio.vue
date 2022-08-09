<template>
  <div>
    <div class="grid grid-cols-12 gap-x-0 lg:gap-x-8 gap-y-8 lg:gap-y-8 mb-4">
      <div
        v-if="cursos.length > 0"
        class="col-span-12 px-8 py-8 bg-white border border-gray-200 rounded-lg"
      >
        <span class="block mt-2 mb-1 text-xl"> Nuevos cursos </span>
        <span class="block text-neutral-900 font-bold text-2xl mb-8"
          >¿Quieres aprender junto a Corporación Arauco?</span
        >

        <div
          class="flex lg:grid lg:grid-cols-12 lg:gap-y-6 space-x-8 lg:space-x-0 no-scrollbar overflow-x-scroll"
        >
          <div
            v-for="curso in cursos"
            :key="curso.id"
            :class="`${col_span}` + ' cursor-pointer'"
            @click="reescribirRecomendaciones(curso)"
          >
            <nuxt-link :to="{ name: 'cursos-id', params: { id: curso.id } }">
              <v-img
                v-if="curso.attributes.imagen_referencia.data"
                width="200"
                height="180"
                class="rounded-xl shadow-xl"
                :src="`${$config.apiUrl}${curso.attributes.imagen_referencia.data.attributes.url}`"
              ></v-img>
              <p class="mt-4 font-bold text-blue-800 w-8/12">
                {{ curso.attributes.titulo }}
              </p>
            </nuxt-link>
          </div>
        </div>

        <nuxt-link :to="{ name: 'cursos' }" target="_blank" class="flex justify-end"
          ><v-btn class="mt-4 py-3 px-4 rounded-md" color="blue darken-4"
            ><span class="text-white">Ver más cursos</span></v-btn
          ></nuxt-link
        >
      </div>

      <empty-section
        v-if="eventosRecientes.length == 0"
        class="col-span-12 lg:col-span-6"
        defaultIcon="mdi-youtube"
        defaultTitle="Centro de medios"
        defaultLabel="Visita nuestro centro de medios con contenido exclusivo"
        defaultBtnMsg="Ir al centro de medios"
        linkTo="centro_de_medios"
      />

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
            class="mt-6 px-8 py-8 bg-white shadow-md rounded-lg border border-gray-200"
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
import NuevosCursosComponent from "../centro_de_medios/NuevosCursosComponent.vue";
import EmptySection from "./EmptySection.vue";
import moment from "moment";

export default {
  components: { NuevosCursosComponent, EmptySection },
  data() {
    return {
      page: 0,
      colors: ["indigo", "orange", "green", "teal", "indigo darken-4"],
      cursos: [],
    };
  },
  async fetch() {
    const qs = require("qs");

    // filter new cursos added in the last week
    const query = qs.stringify({
      filters: {
        createdAt: {
          $gte: Date.now() - 604800000,
        },
      },
      populate: ["imagen_referencia", "organizadores"],
    });

    this.cursos = await this.$axios
      .get(`${this.$config.apiUrl}/api/cursos?${query}`)
      .then((res) => res.data.data);
  },
  methods: {
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
    reescribirRecomendaciones(curso) {
      let recomendaciones =
        localStorage.getItem("recomendaciones") != null
          ? JSON.parse(localStorage.getItem("recomendaciones"))
          : localStorage.getItem("recomendaciones");

      recomendaciones = recomendaciones != null ? recomendaciones : [];

      if (recomendaciones.length == 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          recomendaciones.push({
            id_organizador: curso.attributes.organizadores.data[0].id,
            titulo_curso: curso.attributes.titulo,
            [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
          });
        }
      }

      if (recomendaciones.length > 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          let index = recomendaciones.some((item) => {
            return (
              curso.attributes.organizadores.data[0].attributes.titulo in item
            );
          });

          if (index == false) {
            recomendaciones.push({
              id_organizador: curso.attributes.organizadores.data[0].id,
              titulo_curso: curso.attributes.titulo,
              [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
            });
          } else {
            let index = recomendaciones.find((item) => {
              return (
                curso.attributes.organizadores.data[0].attributes.titulo in item
              );
            });

            if (index) {
              index[curso.attributes.organizadores.data[0].attributes.titulo]++;
            }
          }
        }
      }

      localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
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
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-4";
        case "sm":
          return "col-span-4";
        case "md":
          return "col-span-4";
        case "lg":
          return "col-span-4";
        case "xl":
          return "col-span-4";
      }
    },
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
