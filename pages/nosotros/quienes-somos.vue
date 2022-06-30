<template>
  <div v-if="pagina" class="bg-gradient-to-b from-slate-50 to-white">
    <v-container class="py-16">
      <div v-if="pagina.header">
        <div class="lg:py-24 py-4">
          <p class="lg:text-4xl text-2xl font-weight-light col-12 px-0 text-gray-600">
            {{ pagina.header.titulo }}
          </p>

          <p
            v-if="pagina.body.texto"
            class="
              lg:text-6xl
              text-2xl
              mb-8
              font-weight-bold
              lg:w-8/12
              w-full
              lg:leading-relaxed
              text-gray-700
            "
          >
            {{ pagina.body.texto }}
          </p>
        </div>

        <div
          class="my-18 lg:my-60 grid grid-cols-12 grid-rows-2 gap-x-6 gap-y-6"
        >
          <div
            class="
              px-8
              py-6
              lg:col-span-6
              col-span-12
              blue-grey
              row-span-2
              lighten-5
              rounded-xl
              shadow-sm
              border border-gray-50
            "
          >
            <div>
              <v-img
                class="rounded-tl-xl rounded-br-xl h-80"
                src="/emprendedoras.jpg"
              ></v-img>
            </div>
            <div class="mt-6 mb-4 text-gray-700">
              <span class="text-4xl font-black">+<animated-number
                :value="30"
                :duration="2500"
                :formatValue="formatearValor"
                :delay="10"
          /></span
              ><span class="d-inline-flex ml-2 lg:text-3xl text-xl"
                >años de experiencia</span
              >
            </div>
            <span class="text-2xl text-gray-600"
              >en asesoría y apoyo a emprendedores.</span
            >
          </div>

          <div
            class="
              flex flex-col
              justify-center
              blue-grey
              lighten-5
              row-span-1
              lg:col-span-6
              col-span-12
              px-12
              py-6
              rounded-xl
              shadow-sm
              border border-gray-50
              text-gray-700
            "
          >
            <p>
              <span class="text-4xl font-black"><animated-number
                :value="50"
                :duration="2500"
                :formatValue="formatearValor"
                :delay="10"
          /></span
              ><span class="d-inline-flex ml-2 lg:text-3xl text-xl"
                >socios activos</span
              >
            </p>
            <span class="text-2xl text-gray-600"
              >principalmente PYMES, así como empresas y profesionales de
              Arauco.</span
            >
          </div>

          <div
            class="
              flex flex-col
              justify-center
              blue-grey
              lighten-5
              row-span-1
              lg:col-span-6
              col-span-12
              px-12
              py-6
              rounded-xl
              shadow-sm
              text-gray-700
              border border-gray-50
            "
          >
            <p>
              <span class="lg:text-3xl text-xl"
                >Equipo multidisciplinario</span
              >
            </p>
            <span class="text-2xl text-gray-600"
              >acorde a las altas exigencias del mundo empresarial.</span
            >
          </div>
        </div>
      </div>

      <div
        v-if="pagina.galeria"
        class="
          grid
          gap-8
          row-gap-5
          my-24
          lg:my-60
          sm:grid-cols-2
          lg:grid-cols-12
        "
      >
        <v-img
          v-for="imagen in pagina.galeria.imagenes.data"
          :key="imagen.id"
          class="object-cover w-full h-96 rounded shadow-lg col-span-4"
          :src="`${$config.apiUrl}${imagen.attributes.url}`"
          alt=""
        ></v-img>
      </div> 

      <div
        class="bg-white py-6 sm:py-8 lg:py-12 lg:my-16 my-8"
        v-if="pagina.secciones"
      >
         <div class="px-4 md:px-8 grid grid-cols-12 lg:gap-x-12">
          <p
            v-if="pagina.secciones[0]"
            class="
              block
              text-gray-600
              mb-12
              lg:mb-0
              lg:text-3xl
              text-2xl
              lg:col-span-6
              col-span-12
              lg:leading-loose
            "
          >
            {{ pagina.secciones[0].texto }}
          </p>

          <p
            v-if="pagina.secciones[1]"
            class="
              text-gray-600
              mb-6
              md:mb-8
              lg:text-3xl
              text-2xl
              lg:col-span-6
              col-span-12
              lg:leading-loose
            "
          >
            {{ pagina.secciones[1].texto }}
          </p>
        </div>
      </div> 
    </v-container>
  </div>
</template>

<script>
import AnimatedNumber from "animated-number-vue";

export default {
  layouts: "default",
  components: { AnimatedNumber },
  methods: {
    formatearValor(valor) {
      return parseInt(valor);
    }
  },
  computed: {
    pagina() {
      return this.$store.getters["paginas/nosotros/getPagina"]("quienes-somos");
    },
  },
};
</script>

<style>
</style>