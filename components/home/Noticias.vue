<template>
  <div class="grid grid-cols-12 gap-x-0 lg:gap-x-8">
    <p class="col-span-11 text-3xl font-thin">Noticias</p>

    <nuxt-link
      class="
        group
        col-span-11
        bg-white
        pa-6
        rounded-lg
        border border-gray-200
        shadow-md
      "
      v-for="(noticia, index) in noticias.slice(0, 3)"
      :key="index"
      :to="{ name: 'noticias-id', params: { id: noticia.id } }"
    >
      <div class="text-gray-900 flex">
        <v-img
          v-if="noticia.attributes.imagen_referencia.data"
          :src="`${$config.apiUrl}${noticia.attributes.imagen_referencia.data.attributes.url}`"
          class="h-full w-3/12 transition duration-200"
        ></v-img>
        <div class="ml-4">
          <p>
            {{ fechaFormateada(noticia.attributes.fecha_publicacion) }}
          </p>
          <p class="font-bold text-lg h-32 mb-4">
            {{ noticia.attributes.titulo }}
          </p>
          <div class="flex mt-8">
            <p class="mb-0 mr-2 uppercase">Noticia</p>
            <v-icon>mdi-arrow-top-right-thick</v-icon>
          </div>
        </div>
      </div>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  computed: {
    noticias() {
      return this.$store.getters["noticias/getNoticias"];
    },
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("LL");
    },
  },
};
</script>

<style>
</style>