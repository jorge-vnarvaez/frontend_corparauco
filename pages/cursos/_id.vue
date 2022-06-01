<template>
  <div v-if="curso.attributes">
    <h1>{{ curso.attributes.titulo }}</h1>

    <div v-if="curso.attributes.contenidos && curso.attributes.contenidos.data.length > 0">
      <h3>Contenidos</h3>
      <span
        v-for="contenido in curso.attributes.contenidos.data"
        :key="contenido.id"
      >
        {{ contenido.attributes.titulo }}
      </span>
    </div>

    <div>Info</div>

    <span>{{ curso.attributes.descripcion }} </span>

    <button>Inscripcion</button>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["contenidos"],
    });

    const curso = await context.$axios
      .$get(`${context.$config.apiUrl}/api/cursos/${context.params.id}?${query}`)
      .then((res) => res.data);
    return { curso };
  },
};
</script>

<style>
</style>