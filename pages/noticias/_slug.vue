<template>
  <div class="bg-white py-6 sm:py-8 lg:py-12" v-if="noticia">
     <div class="max-w-screen-lg px-4 md:px-8 mx-auto">
      <h1
        class="
          text-gray-800 text-2xl
          sm:text-3xl
          font-bold
          text-center
          mb-4
          md:mb-6
        "
      >
        {{ noticia.attributes.titulo }}
      </h1>
      <p class="text-center">Publicado: {{ formatearFecha(noticia.attributes.fecha_publicacion) }}</p>
      <v-img
        v-if="noticia.attributes.imagen_referencia.data"
        :src="`${$config.apiUrl}${noticia.attributes.imagen_referencia.data.attributes.url}`"
        class="w-full h-full object-cover object-center rounded-lg my-8"
      ></v-img>

      <div v-if="noticia.attributes.descripcion"
        v-html="markdownToHtml(noticia.attributes.descripcion)"
        class="text-gray-700 text-justify text-xl leading-loose mb-6 md:mb-8"
      ></div>

      <div v-if="noticia.attributes.secciones">
        <div v-for="section in noticia.attributes.secciones" :key="section.id">
          <h2
            class="text-gray-800 text-2xl font-semibold my-8"
          >
            {{ section.titulo }}
          </h2>

          <p v-html="markdownToHtml(section.texto)" class="text-gray-700 text-xl leading-loose mb-6 md:mb-8 text-justify list-style-disc">
   
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  computed: {
    formatearFecha() {
      const moment = require('moment');

      moment.locale('ES');

      return (fecha) => moment(fecha).format('LL');
    },
    markdownToHtml() {
      return (text) => marked(text);
    },
    noticia() {
      const slug = this.$route.params.slug;
      return this.$store.getters["noticias/getNoticia"](slug);
    },
  },
};
</script>

<style>
</style>