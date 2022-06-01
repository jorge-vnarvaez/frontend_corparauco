<template>
  <div v-if="pagina">
    <div v-if="pagina.header">
      <v-img
        v-if="pagina.header.imagen.data"
        position="top"
        :height="$vuetify.breakpoint.mobile ? '100vh' : '60vh'"
        :src="`${$config.apiUrl}${pagina.header.imagen.data.attributes.url}`"
        class="w-full my-auto mx-auto"
        gradient="to top right, rgba(14, 116, 144,.33), rgba(25,32,72, .22)"
      >
        <div
          class="
            mb-24
            lg:max-w-xl
            h-full
            sm:text-center
            flex flex-col
            justify-center
            align-center
            text-white
          "
        >
          <p
            class="
              inline-flex
              justify-center
              px-3
              mt-4
              text-3xl
              lg:text-6xl
              md:text-2xl
              font-semibold
              tracking-wider
              rounded-full
            "
          >
            {{ pagina.header.titulo }}
          </p>
          <p
            class="
              text-3xl text-center
              w-8/12
              px-5
              lg:px-0 lg:w-5/12
              mt-8
              lg:leading-relaxed
            "
            v-if="pagina.body"
          >
            {{ pagina.body.texto }}
          </p>
        </div>
      </v-img>
    </div>

    <div
      class="
        grid
        gap-10
        mx-auto
        lg:max-w-screen-lg
        sm:grid-cols-2
        lg:grid-cols-4
        my-32
      "
      v-if="pagina.miembros"
    >
      <div
        class="flex flex-col items-center"
        v-for="miembro in pagina.miembros"
        :key="miembro.id"
      >
        <div class="flex flex-col items-center">
          <p class="text-xl font-bold mt-4 text-center text-gray-700">
            {{ miembro.nombre }}
          </p>
          <p class="text-lg text-gray-800 -mt-4">{{ miembro.cargo }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    pagina() {
      return this.$store.getters["paginas/nosotros/getPagina"]("directorio");
    },
  },
};
</script>

<style>
</style>