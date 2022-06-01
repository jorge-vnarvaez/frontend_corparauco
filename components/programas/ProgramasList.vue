<template>
  <div>
    <p v-if="$fetchState.pending">Cargando...</p>
    <p v-else-if="$fetchState.error">Ha ocurrido un error :(</p>
    <div v-else>
      <nuxt-link
        v-for="(programa, index) of programas"
        :key="index"
        :to="{ name: 'programas-id', params: { id: programa.id } }"
      >
        {{ programa.attributes.titulo }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    programas: [],
  }),
  async fetch() {
    const res = await fetch(`${this.$config.apiUrl}/api/programas`).then((res) =>
      res.json()
    );

    this.programas = res.data;
  },
};
</script>

<style>
</style>