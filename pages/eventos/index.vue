<template>
  <div> 
    <eventos-list />
  </div>
</template>

<script>
import EventosList from '../../components/eventos/EventosList.vue';
export default {
  components: { EventosList },
  async asyncData(context) {
    await context.store.dispatch('eventos/loadAllEventos');
    await context.store.dispatch('eventos/loadEventosRecientes');

  }

};
</script>

<style>
</style>
