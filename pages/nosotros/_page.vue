<template>
  <div v-if="pagina">
    <div v-if="pagina.header">
      <h1>{{ pagina.header.titulo }}</h1>
    </div>

    <div v-if="pagina.body">
      <v-img
        v-if="pagina.body.imagen && pagina.body.imagen.data"
        :src="`${$config.apiUrl}${pagina.body.imagen.data.attributes.url}`"
      ></v-img>
      <div v-html="markdownBodyToHtml"></div>
    </div>

    <div v-if="pagina.secciones">
      <div v-for="section in pagina.secciones" :key="section.id">
        <h4>{{ section.titulo}}</h4>
        <span>{{ section.texto }}</span>
      </div>
    </div>

    <div v-if="pagina.miembros">

      <div v-for="miembro in pagina.miembros" :key="miembro.id">
        {{ miembro }}
      </div>

    </div>

    <div v-if="pagina.galeria">
      {{ pagina.galeria }}
    </div>
  </div>
</template>

<script>

import { marked } from 'marked'

export default {
  layout: 'default',
  computed: {
    pagina() {
      const path = this.$route.params.page;

      return this.$store.getters["paginas/nosotros/getPagina"](path);
    },
    markdownBodyToHtml() {
      return marked(this.pagina.body.texto);
    },
    
  },
};
</script>

<style>

p {
  margin-top: 20px;
  margin-bottom: 20px;
}

strong {
  color: blue;
}

</style>