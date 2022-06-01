<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container class="mx-auto">
      <div class="grid grid-cols-12 flex py-16 align-center">
        <div class="col-span-12 lg:col-span-6 px-8">
          <p class="text-xl lg:text-4xl">Eventos</p>
          <p
            class="
              lg:text-4xl
              w-8/12
              text-2xl
              font-bold
              w-10/12
              lg:leading-relaxed
              text-gray-700
            "
          >
            Entérate y participa de los eventos que se realizarán dentro de la
            región o tu comuna.
          </p>
        </div>

        <nuxt-link
          v-if="ultimoEvento"
          :to="{ name: 'eventos-id', params: { id: ultimoEvento.id } }"
          class="
            flex flex-col
            hover:shadow-sm
            border-2 border-gray-50
            pa-8
            text-gray-900
            xs:mb-8
            lg:mb-20
            col-span-12
            lg:col-span-6
            rounded-xl
            hover:bg-neutral-50
          "
        >
          <v-img
            v-if="ultimoEvento.attributes.imagen_referencia.data"
            class="shadow-md rounded-xl h-96"
            :src="`${$config.apiUrl}${ultimoEvento.attributes.imagen_referencia.data.attributes.url}`"
          >
          </v-img>

          <v-img v-if="!ultimoEvento.attributes.imagen_referencia.data" class="h-96 rounded-2xl border border-gray-50"> 
          </v-img>

          <div class="flex flex-col items-between">
            <p class="text-gray-900 text-xl mt-6" v-if="ultimoEvento.attributes.fecha_inicio">
              {{ formatearFecha(ultimoEvento.attributes.fecha_inicio) }}
            </p>
            <p class="text-gray-900 text-xl lg:text-3xl h-36 font-semibold h-16 my-6">
              {{ ultimoEvento.attributes.titulo }}
            </p>

            <div class="flex items-center mt">
              <p
                class="uppercase text-2xl text-gray-900 mb-0 mr-1 font-semibold"
              >
                Evento
              </p>
              <v-icon dense>mdi-arrow-top-right-thick</v-icon>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div
        class="grid grid-cols-12 mt-8 gap-y-12 sm:mb-0 lg:mb-24"
        v-if="eventos"
      >
        <div
          v-for="evento in eventos.slice(1, eventos.length)"
          :key="evento.id"
          :class="`
            hover:bg-white hover:border hover:border-gray-50 hover:shadow-md
            pa-8
            rounded-xl
            ${col_span}
          `"
        >
          <nuxt-link :to="{ name: 'eventos-id', params: { id: evento.id } }">
            <v-img
              v-if="evento.attributes.imagen_referencia.data"
              class="h-96 rounded-2xl"
              :src="`${$config.apiUrl}${evento.attributes.imagen_referencia.data.attributes.url}`"
            ></v-img>

            <v-img v-if="!evento.attributes.imagen_referencia.data" class="h-96 rounded-2xl border border-gray-50"> 


          </v-img>
            <div class="flex flex-col items-between">
              <p class="text-gray-900 text-xl mt-6" v-if="evento.attributes.fecha_inicio">
                {{ formatearFecha(evento.attributes.fecha_inicio) }}
              </p>

              <div class="text-gray-900 text-xl h-16" v-if="!evento.attributes.fecha_inicio">

              </div>
              <p class="text-gray-900 text-xl lg:text-3xl font-semibold h-36 my-6">
                {{ evento.attributes.titulo }}
              </p>

              <div class="flex items-center">
                <p
                  class="
                    uppercase
                    text-2xl text-gray-900
                    mb-0
                    mr-1
                    font-semibold
                  "
                >
                  evento
                </p>
                <v-icon dense>mdi-arrow-top-right-thick</v-icon>
              </div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  computed: {
    eventos() {
      return this.$store.getters["eventos/getEventos"];
    },
    ultimoEvento() {
      return this.$store.getters["eventos/getUltimoEvento"];
    },
    excerpt() {
      return (text) => text.slice(0, 200) + "...";
    },
    formatearFecha() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("LL");
    },
    col_span() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return 'col-span-12'
        case 'sm': return 'col-span-6'
        case 'md': return 'col-span-6'
        case 'lg': return 'col-span-6'
        case 'xl': return 'col-span-4'
        default: return 'col-span-6'
      }
    }
  },
};
</script>

<style>
</style>