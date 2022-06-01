<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container class="mx-auto">
      <div class="grid grid-cols-12 flex py-16 align-center">
        <nuxt-link
          v-if="ultimaNoticia"
          :to="{ name: 'noticias-id', params: { id: ultimaNoticia.id } }"
          class="
            flex flex-col
            hover:shadow-sm
            border-2 border-gray-50
            pa-8
            text-gray-900
            xs:mb-8
            lg:mb-20
            col-span-12
            rounded-xl
            hover:bg-neutral-50
          "
        >
          <v-img
            v-if="ultimaNoticia.attributes.imagen_referencia.data"
            height="40vh"
            class="shadow-md rounded-xl"
            :src="`${$config.apiUrl}${ultimaNoticia.attributes.imagen_referencia.data.attributes.url}`"
          >
          </v-img>

          <div class="flex flex-col items-between">
            <p class="text-gray-900 text-xl mt-6" v-if="ultimaNoticia.attributes.fecha_publicacion">
              {{ formatearFecha(ultimaNoticia.attributes.fecha_publicacion) }}
            </p>
            <p class="text-gray-900 text-xl lg:text-3xl h-36 h-36 font-semibold my-6">
              {{ ultimaNoticia.attributes.title }}
            </p>

            <div class="flex items-center mt">
              <p
                class="uppercase text-2xl text-gray-900 mb-0 mr-1 font-semibold"
              >
                Noticia
              </p>
              <v-icon dense>mdi-arrow-top-right-thick</v-icon>
            </div>
          </div>
        </nuxt-link>
      </div>

      <div
        class="grid grid-cols-12 mt-8 gap-y-12 sm:mb-0 lg:mb-24"
        v-if="noticias"
      >
        <div
          v-for="noticia in noticias.slice(1, noticias.length)"
          :key="noticia.id"
          :class="`
            hover:bg-white hover:border hover:border-gray-50 hover:shadow-md
            pa-8
            rounded-xl
            ${col_span}
          `"
        >
          <nuxt-link :to="{ name: 'noticias-id', params: { id: noticia.id } }">
            <v-img
              v-if="noticia.attributes.imagen_referencia.data"
              class="h-96 rounded-2xl"
              :src="`${$config.apiUrl}${noticia.attributes.imagen_referencia.data.attributes.url}`"
            ></v-img>
            <div class="flex flex-col items-between">
              <p class="text-gray-900 text-xl mt-6" v-if="noticia.attributes.fecha_publicacion">
                {{ formatearFecha(noticia.attributes.fecha_publicacion) }}
              </p>
              <p class="text-gray-900 text-lg lg:text-3xl font-semibold h-36 lg:h-56 my-6">
                {{ noticia.attributes.titulo }}
              </p>

              <div class="flex items-center mt-16">
                <p
                  class="
                    uppercase
                    text-2xl text-gray-900
                    mb-0
                    mr-1
                    font-semibold
                  "
                >
                  Noticia
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
    ultimaNoticia() {
      return this.$store.getters["noticias/getUltimaNoticia"];
    },
    noticias() {
      return this.$store.getters["noticias/getNoticias"];
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