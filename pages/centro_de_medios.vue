<template>
  <inicio />
</template>

<script>
import Inicio from "../components/centro_de_medios/Inicio.vue";
export default {
  components: { Inicio },
  async asyncData(context) {
    await context.store.dispatch("contenidos/loadContenidos");
    await context.store.dispatch("organizadores/loadOrganizadores");
    await context.store.dispatch("formatos/loadFormatos");
  },
};
</script>

<style>
</style>