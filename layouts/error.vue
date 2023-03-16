<template>
  <v-app dark>
    <!-- PAGINA NO ENCONTRADA -->
    <div
      v-if="error.statusCode === 404"
      class="h-screen w-full py-8 px-8 flex justify-center align-center"
    >
      <div>
        <span
          class="block text-base lg:text-3xl text-center font-bold uppercase"
          >Página no encontrada!</span
        >
        <span class="block text-base lg:text-2xl text-center"
          >Al parecer la página a la que intentas acceder no existe.</span
        >
        <div class="flex justify-center my-4">
          <v-img src="/illustration_404.svg" class="h-80 w-full" contain></v-img>
        </div>
        <span class="block text-base lg:text-2xl text-center"
          >Verifica la dirección URL o accede nuevamente a
          <a href="https://www.corparauco.cl">Corparauco.cl</a>.</span
        >
      </div>
    </div>
    <!-- PAGINA NO ENCONTRADA -->

    <!-- ERROR -->
    <div v-else class="h-screen w-full py-8 flex justify-center align-center">
      <div>
        <span
          class="block text-base lg:text-3xl text-center font-bold uppercase"
          >!Ups!</span
        >
        <span class="block text-base lg:text-2xl text-center"
          >Al parecer ha ocurrido un problema</span
        >
        <v-img src="/illustration_error.svg" class="h-80 w-full" contain></v-img>
        <span class="block text-base lg:text-2xl text-center"
          >Vuelva a recargar la página.</span
        >
      </div>
    </div>
    <!-- ERROR -->
  </v-app>
</template>

<script>
export default {
  name: "EmptyLayout",
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
