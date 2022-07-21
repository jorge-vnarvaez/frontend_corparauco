<template>
  <div v-if="pagina" class="bg-gradient-to-br from-green-200 to-white">
    <div v-if="pagina.header">
      <v-img
        v-if="pagina.header.imagen.data"
        position="top right"
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
          v-if="pagina.header"
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

    <v-container
    
      class="
        my-48
        flex
        w-full
        lg:flex-row
        flex-col
        lg:space-x-48 lg:space-y-0
        space-y-20
        justify-center
        items-center
      "
      v-if="pagina.indicadores"
    >
      <div v-for="indicador in pagina.indicadores" :key="indicador.id">
        <p class="text-3xl text-blue-800 font-black text-center">
          {{ indicador.titulo }}
        </p>
        <p class="text-5xl font-bold mb-0 text-gray-700 text-center">
          <animated-number
            :value="indicador.valor"
            :duration="2500"
            :formatValue="formatearValor"
            :delay="10"
          />
        </p>
        <span class="ml-2 text-2xl font-thin text-gray-600">{{
          indicador.subtitulo
        }}</span>
      </div>
    </v-container>

    <v-container
      class="
        grid grid-cols-12
        flex
        items-center
        lg:gap-x-12
        gap-y-20
        justify-center
        my-48
      "
      v-if="pagina.testimonios"
    >
      <v-card
        v-for="testimonio in pagina.testimonios"
        :key="testimonio.id"
        class="pa-8 col-span-12 lg:col-span-4 relative shadow-md rounded-lg"
        elevation="1"
      >
        <p class="text-2xl font-italic text-gray-700">
          "{{ testimonio.testimonio }}"
        </p>
        <p class="text-xl font-black mb-0 text-gray-700">
          {{ testimonio.autor }}
        </p>
        <p class="text-lg font-thin font-italic text-gray-500">
          <span>{{ testimonio.region }}</span
          ><span>{{ testimonio.comuna }}</span>
        </p>

        <div
          v-if="testimonio.imagen"
          class="absolute rounded-full w-32 h-32 right-0 -bottom-12"
        >
          <v-img
            v-if="testimonio.imagen.data"
            :src="`${$config.apiUrl}${testimonio.imagen.data.attributes.url}`"
            class="rounded-full w-32 h-32"
          ></v-img>
        </div>
      </v-card>
    </v-container>

    <v-container class="grid grid-cols-12 mb-48 gap-x-8" v-if="organizaciones">
      <div
        v-for="organizacion in organizaciones"
        :key="organizacion.id"
        class="col-span-12 lg:col-span-3"
      >
        <v-img
          v-if="organizacion.attributes.logo.data"
          :src="`${$config.apiUrl}${organizacion.attributes.logo.data.attributes.url}`"
          class="my-20 w-80 h-36"
          contain
        >
        </v-img>
      </div>
    </v-container>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  components: {
    AnimatedNumber,
  },
  async asyncData(context) {
    await context.store.dispatch('paginas/emprendedores/loadTestimonios');
    await context.store.dispatch('organizaciones/loadOrganizaciones');
  },
  data() {
    return {
      value: 10000,
    };
  },
  methods: {
    formatearValor(valor) {
      return parseInt(valor);
    }
  },
  computed: {
    pagina() {
      return this.$store.getters["paginas/emprendedores/getPaginaTestimonios"];
    },
    organizaciones() {
      return this.$store.getters["organizaciones/getOrganizaciones"];
    },
  },
};
</script>

<style>
</style>