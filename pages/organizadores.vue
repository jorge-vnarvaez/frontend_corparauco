<template>
  <div>
    <h1>Organizadores </h1>
    <div v-for="(organizador, index) in organizadores" :key="index">
      {{ organizador.attributes.title }}
    </div>
  </div>
</template>

<script>
export default {

  computed: {
    organizadores() {
      return this.$store.getters['organizadores/getOrganizadores'];
    },
  },
};
</script>

<style>
</style>