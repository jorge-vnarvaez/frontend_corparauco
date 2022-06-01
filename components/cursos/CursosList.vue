<template>
  <div>
    <p v-if="$fetchState.pending">Cargando...</p>
    <p v-else-if="$fetchState.error">Ha ocurrido un error :(</p>
    <div v-else>
      <nuxt-link
        v-for="(curso, index) of cursos"
        :key="index"
        :to="{ name: 'cursos-id', params: { id: curso.id } }"
      >
        {{ curso.attributes.titulo  }}

      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    cursos: [],
  }),
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    const res = await fetch(`${this.$config.apiUrl}/api/cursos`).then(
      (res) => res.json()
    );
    
    this.cursos = res.data;
  },
};
</script>

<style>
</style>