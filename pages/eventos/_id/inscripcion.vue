<template>
  <public-evento-inscripcion :evento="evento.data"/>
</template>

<script>
import PublicEventoInscripcion from '../../../components/eventos/inscripcion/PublicEventoInscripcion.vue'

export default {
  components: { PublicEventoInscripcion },
  async asyncData(context) {

    const qs = require('qs');

    const query = qs.stringify({
      populate: 'inscripciones'
    });

    const evento = await context.$axios.$get(`${context.$config.apiUrl}/api/eventos/${context.params.id}?${query}`);

    return { evento }
  }
}
</script>

<style>

</style>