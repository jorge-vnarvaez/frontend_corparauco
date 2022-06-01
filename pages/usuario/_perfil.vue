<template>
  <div> 
      <h1>Perfil usuario</h1>
      <span>{{ perfil_id }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      perfil_id: null,
    }
  },
  mounted() {
    this.perfil_id = this.$route.params.id;
  }
}
</script>

<style>

</style>