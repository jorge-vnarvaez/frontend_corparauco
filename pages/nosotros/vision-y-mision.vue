<template>
  <div v-if="pagina" class="bg-gradient-to-b from-slate-50 to-white h-full">
    <v-container class="mb-20">
      <div
        class="flex lg:flex-row flex-col lg:py-16 align-center lg:pb-0"
        v-if="pagina.header"
      >
        <div class="flex flex-col w-full mx-auto">
          <div class="mb-24 lg:w-10/12 lg:px-0 py-4 px-4 w-full" v-if="pagina.secciones">
            <div class="lg:mb-6" v-if="pagina.secciones[1]">
              <p
                class="
                  lg:text-6xl
                  text-2xl
                  mb-8
                  lg:mb-16
                  font-weight-bold
                  text-gray-700
                "
                v-if="pagina.secciones"
              >
                {{ pagina.secciones[1].titulo }}
              </p>

              <p class="lg:text-3xl text-md text-gray-600 lg:leading-loose">
                {{ pagina.secciones[1].texto }}
              </p>
            </div>
          </div>
        </div>
        <div class="px-4 lg:w-6/12 w-full">
          <v-img
            v-if="pagina.header.imagen.data"
            class="rounded-2xl shadow-sm border border-gray-50"
            contain
            :src="`${$config.apiUrl}${pagina.header.imagen.data.attributes.url}`"
          ></v-img>
        </div>
      </div>
    </v-container>

    <div
      class="
        flex
        lg:flex-row
        flex-col
        my-24
        align-center
        bg-gradient-to-b
        from-gray-50
        to-slate-50
        py-20
      "
      v-if="pagina.secciones"
    >
      <div class="lg:w-6/12 w-full" v-if="pagina.secciones[0]">
        <v-img
          v-if="pagina.secciones[0].imagen.data"
          class="lg:rounded-tl-2xl rounded-br-2xl rounded-tr-2xl"
          contain
          :src="`${$config.apiUrl}${pagina.secciones[0].imagen.data.attributes.url}`"
        ></v-img>
      </div>
      <div class="flex flex-col align-end" v-if="pagina.secciones">
        <div class="lg:mb-16 lg:w-10/12 w-full px-4" v-if="pagina.secciones[0]">
          <div class="mb-6 px-4">
            <p
              class="
                lg:text-6xl
                text-2xl
                lg:mt-0
                mt-8
                mb-8
                lg:mb-16
                font-weight-bold
                text-gray-700
              "
            >
              {{ pagina.secciones[0].titulo }}
            </p>

            <p
              class="lg:text-3xl text-md w-10/12 text-gray-600 lg:leading-loose"
            >
              {{ pagina.secciones[0].texto }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <v-container v-if="pagina.secciones" class="lg:px-0 px-4 my-20">
      <p class="lg:text-6xl text-2xl font-weight-bold text-gray-700 px-4">
        Nuestros objetivos
      </p>

      <div class="my-[20px] lg:my-[120px] grid grid-cols-12 lg:grid-rows-2 gap-6">
        <div
          v-if="pagina.secciones[4]"
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
          <v-img
            v-if="pagina.secciones[4].imagen.data"
            :src="`${$config.apiUrl}${pagina.secciones[4].imagen.data.attributes.url}`"
            class="h-80 rounded-xl lg:leading-loose"
          ></v-img>
          <p class="text-xl lg:text-3xl lg:leading-loose mt-8 text-gray-600">
            {{ pagina.secciones[4].texto }}
          </p>
        </div>

        <div
          v-if="pagina.secciones[2]"
          class="
            flex flex-col
            justify-center
            border-2 border-gray-100
            lg:row-span-2 lg:col-span-5
            col-span-12
            pa-8
            rounded-xl
          "
        >
          <v-img
            v-if="pagina.secciones[2]"
            :src="`${$config.apiUrl}${pagina.secciones[2].imagen.data.attributes.url}`"
            class="h-80 rounded-xl"
          ></v-img>

          <p class="text-xl lg:text-3xl lg:leading-loose mt-8 text-gray-600">
            {{ pagina.secciones[2].texto }}
          </p>
        </div>

        <div
          v-if="pagina.secciones[3]"
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
          <v-img
            position="top"
            v-if="pagina.secciones[3].imagen.data"
            :src="`${$config.apiUrl}${pagina.secciones[3].imagen.data.attributes.url}`"
            class="h-80 rounded-xl"
          ></v-img>
          <p class="text-xl lg:text-3xl lg:leading-loose mt-8 text-gray-600">
            {{ pagina.secciones[3].texto }}
          </p>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  layouts: "default",
  computed: {
    pagina() {
      return this.$store.getters["paginas/nosotros/getPagina"](
        "vision-y-mision"
      );
    },
  },
};
</script>

<style>
</style>