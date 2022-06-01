<template>
  <div v-if="pagina">
    <div v-if="pagina.header">
      <h1>{{ pagina.header.titulo }}</h1>
    </div>

    <div v-if="pagina.body">
      <v-img
        v-if="pagina.body.imagen && pagina.body.imagen.data"
        :src="`${$config.apiUrl}${pagina.body.image.data.attributes.url}`"
      ></v-img>
      {{ pagina.body.texto }}
    </div>

    <div v-if="pagina.secciones">
      <div v-for="section in pagina.secciones" :key="section.id">
        <h4>{{ section.titulo }}</h4>
        <span>{{ section.texto }}</span>
      </div>
    </div>

    <div v-if="pagina.programas">
      <div v-for="programa in pagina.programas" :key="programa.id">
        {{ programa }}
      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    pagina() {
      const path = this.$route.params.page;

      return this.$store.getters["paginas/servicios/getPagina"](path);
    },
  },
};
</script>

<style>
</style>