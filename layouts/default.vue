<template>
  <v-app class="app">
    <barra-navegacion />
    <Nuxt />
    <footer-section />
  </v-app>
</template>

<script> 

import BarraNavegacion from './BarraNavegacion.vue'
import FooterSection from "../layouts/FooterSection.vue";

export default {
    components: { BarraNavegacion, FooterSection }
}


</script>

<style> 

.app {
  font-family: 'Poppins', sans-serif;
}

.text-6xl {
  font-family: 'Nunito Sans', sans-serif;
}

</style>