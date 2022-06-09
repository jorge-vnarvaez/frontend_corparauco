<template>
  <div v-if="pagina">
    <div v-if="pagina.header">
      <v-img
        v-if="pagina.header.imagen.data"
        position="top"
        height="60vh"
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
        </div>
      </v-img>
    </div>

    <v-container class="my-48">
      <p class="text-2xl lg:text-6xl lg:leading-relaxed text-gray-700">
        {{ pagina.body.texto }}
      </p>
    </v-container>


    <v-container
      class="grid grid-cols-12 mb-48 gap-x-8"
      v-if="pagina.secciones"
    >
      <div
        v-if="pagina.secciones[0]"
        class="
          flex flex-col
          justify-center
          border-2 border-gray-100
          lg:row-span-1 lg:col-span-7
          col-span-12
          pa-8
          rounded-xl
        "
      >
        <p class="text-4xl mb-8 text-gray-700">
          {{ pagina.secciones[0].titulo }}
        </p>
          <v-img
            position="top"
            v-if="pagina.secciones[0].imagen.data"
            :src="`${$config.apiUrl}${pagina.secciones[0].imagen.data.attributes.url}`"
            class="rounded-xl h-96"
          ></v-img>
        <p class="text-xl lg:text-2xl mt-8 lg:leading-loose text-gray-600">
          {{ pagina.secciones[0].texto }}
        </p>
      </div>

   <div
        v-if="pagina.secciones[1]"
        class="
          flex flex-col
          justify-center
          border-2 border-gray-100
          lg:row-span-1 lg:col-span-5
          col-span-12
          pa-8
          rounded-xl
        "
      >
        <p class="text-4xl mb-8 text-gray-700">
          {{ pagina.secciones[1].titulo }}
        </p>
        <v-img
          v-if="pagina.secciones[1].imagen.data"
          :src="`${$config.apiUrl}${pagina.secciones[1].imagen.data.attributes.url}`"
          class="rounded-xl h-96"
          cover
        ></v-img>
        <p class="text-xl lg:text-2xl mt-8 lg:leading-loose text-gray-600">
          {{ pagina.secciones[1].texto }}
        </p>
      </div> 

     <div
        v-if="pagina.secciones[3]"
        class="
          flex flex-col
          justify-center
          border-2 border-gray-100
          lg:row-span-1 lg:col-span-6
          col-span-12
          pa-8
          rounded-xl
          mt-8
        "
      >
        <p class="text-4xl mb-8 text-gray-700">
          {{ pagina.secciones[3].titulo }}
        </p>
        <v-img
          position="top"
          cover
          v-if="pagina.secciones[3].imagen.data"
          :src="`${$config.apiUrl}${pagina.secciones[3].imagen.data.attributes.url}`"
          class="rounded-xl h-96"
        ></v-img>
        <p class="text-xl lg:text-2xl mt-8 lg:leading-loose text-gray-600">
          {{ pagina.secciones[3].texto }}
        </p>
      </div>

      <div
        v-if="pagina.secciones[2]"
        class="
          flex flex-col
          justify-center
          border-2 border-gray-100
          lg:row-span-1 lg:col-span-6
          col-span-12
          pa-8
          rounded-xl
          mt-8
        "
      >
        <p class="text-4xl mb-8 text-gray-700">
          {{ pagina.secciones[2].titulo }}
        </p>
        <v-img
          v-if="pagina.secciones[2].imagen.data"
          :src="`${$config.apiUrl}${pagina.secciones[2].imagen.data.attributes.url}`"
          class="rounded-xl h-2"
        ></v-img>
        <p class="text-xl lg:text-2xl mt-8 lg:leading-loose text-gray-600">
          {{ pagina.secciones[2].texto }}
        </p>
      </div>

      <div class="col-span-12 mt-48" v-if="pagina.secciones[4]">
        <p class="text-2xl lg:text-6xl lg:leading-relaxed text-gray-700">
          {{ pagina.secciones[4].titulo }}
        </p>
      </div>

      <div class="col-span-12 mt-12 flex align-center" v-if="pagina.secciones[5]">
        <v-icon x-large class="mr-8 mb-0">mdi-circle-medium</v-icon>
        <p class="text-2xl lg:text-4xl lg:leading-relaxed text-gray-600">
          {{ pagina.secciones[5].texto }}
        </p>
      </div>

      <div class="col-span-12 mt-12 flex" v-if="pagina.secciones[6]">
        <v-icon x-large class="mr-8 mb-0">mdi-circle-medium</v-icon>
        <p class="text-2xl lg:text-4xl lg:leading-relaxed mb-0 text-gray-600">
          {{ pagina.secciones[6].texto }}
        </p>
      </div>

      <div class="col-span-12 mt-12 flex" v-if="pagina.secciones[7]">
        <v-icon x-large class="mr-8 mb-0">mdi-circle-medium</v-icon>
        <p class="text-2xl lg:text-4xl lg:leading-relaxed text-gray-600">
          {{ pagina.secciones[7].texto }}
        </p>
      </div>
      

      <div class="col-span-12 mt-12 flex" v-if="pagina.secciones[8]">
        <v-icon x-large class="mr-8 mb-0">mdi-circle-medium</v-icon>
        <p class="text-2xl lg:text-4xl lg:leading-relaxed text-gray-600">
          {{ pagina.secciones[8].texto }}
        </p>
      </div>

      <div
      v-if="pagina.secciones[9]"
        class="text-3xl col-span-12 mt-24 font-italic text-gray-700"
        v-html="markdownToHtml(pagina.secciones[9].texto)"
      ></div>
   </v-container> 
  </div>
</template>

<script>
import { marked } from "marked";

export default {
  layouts: "default",
  computed: {
    pagina() {
      return this.$store.getters["paginas/nosotros/getPagina"](
        "politica-de-calidad"
      );
    },
    markdownToHtml() {
      return (text) => marked(text);
    },
  },
};
</script>

<style>
.list {
  list-style-type: circle;
}
</style>