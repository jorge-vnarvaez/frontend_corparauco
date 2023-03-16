<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container v-if="pagina">
      <div v-if="pagina.header" class="py-[20px] lg:py-[50px] px-4">
        <p class="lg:text-4xl text-2xl text-gray-600 font-weight-light px-0">
          {{ pagina.header.titulo }}
        </p>

        <div class="flex items-center grid grid-cols-12 lg:gap-x-20">
          <p
            v-if="pagina.body"
            class="lg:text-3xl text-2xl mb-8 mt-4 font-weight-bold w-full lg:leading-loose col-span-12 lg:col-span-8 text-gray-700"
          >
            {{ pagina.body.texto }}
          </p>
          <v-img
            v-if="pagina.body.imagen.data"
            class="rounded-tl-xl rounded-br-xl col-span-12 lg:col-span-3"
            contain
            :src="`${$config.apiUrl}${pagina.body.imagen.data.attributes.url}`"
          ></v-img>
        </div>

        <div
          class="flex lg:flex-row flex-col justify-center align-center items-center rounded-xl grey lighten-5 px-4 py-12 lg:my-32 lg:space-x-20 lg:space-y-0 space-y-12"
        >
          <span
            :class="[
              infoIndex == 1 ? 'text-blue-900 font-bold' : 'text-gray-600',
              'text-xl cursor-pointer',
            ]"
            @click="infoIndex = 1"
            >Programas Agenciados</span
          >
          <span class="text-xl text-gray-600 cursor-not-allowed"
            >Otros Programas</span
          >
          <span
            :class="[
              infoIndex == 3 ? 'text-blue-900 font-bold' : 'text-gray-600',
              'text-xl cursor-pointer',
            ]"
            @click="infoIndex = 3"
            >Convenios</span
          >
        </div>

        <div
          class="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 mb-24"
        >
          <div
            class="absolute inset-x-0 top-0 items-center justify-center hidden overflow-hidden md:flex md:inset-y-0"
          >
            <svg
              viewBox="0 0 88 88"
              class="w-full max-w-screen-xl text-indigo-100"
            >
              <circle fill="currentColor" cx="44" cy="44" r="15.5"></circle>
              <circle
                fill-opacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="44"
              ></circle>
              <circle
                fill-opacity="0.2"
                fill="currentColor"
                cx="44"
                cy="44"
                r="37.5"
              ></circle>
              <circle
                fill-opacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="29.5"
              ></circle>
              <circle
                fill-opacity="0.3"
                fill="currentColor"
                cx="44"
                cy="44"
                r="22.5"
              ></circle>
            </svg>
          </div>
          <div v-if="infoIndex == 1">
            <div
              class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
              v-if="pagina.programas.data"
            >
              <nuxt-link
                v-for="programa in pagina.programas.data"
                :key="programa.id"
                :to="{
                  name: 'programas-slug',
                  params: { slug: programa.attributes.slug },
                }"
                class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
              >
                <div class="p-5 text-gray-900">
                  <div
                    class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50"
                  >
                    <svg
                      class="w-8 h-8 text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      ></polygon>
                    </svg>
                  </div>
                  <p class="mb-2 font-bold">{{ programa.attributes.titulo }}</p>
                  <p class="text-sm leading-5 text-gray-900"></p>
                </div>
                <div
                  class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"
                ></div>
              </nuxt-link>
            </div>
          </div>

          <div v-if="infoIndex == 3">
            <div
              v-if="pagina.convenios"
              class="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              <a
                v-for="convenio in pagina.convenios.data"
                :key="convenio.id"
                :href="convenio.attributes.url_info"
                target="_blank"
                class="flex flex-col justify-between overflow-hidden text-left transition-shadow duration-200 bg-white rounded shadow-xl group hover:shadow-2xl"
              >
                <div class="p-5 text-gray-900">
                  <div
                    class="flex items-center justify-center w-10 h-10 mb-4 rounded-full bg-indigo-50"
                  >
                    <svg
                      class="w-8 h-8 text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      ></polygon>
                    </svg>
                  </div>
                  <p class="mb-2 font-bold">{{ convenio.attributes.nombre }}</p>
                  <p class="text-sm leading-5 text-gray-900"></p>
                </div>
                <div
                  class="w-full h-1 ml-auto duration-300 origin-left transform scale-x-0 bg-deep-purple-accent-400 group-hover:scale-x-100"
                ></div>
              </a>
            </div>

            <div
              v-if="pagina.convenios.data.length == 0"
              class="relative flex justify-center"
            >

              <p class="text-xl text-gray-600 text-center">
                No hay convenios disponibles en este momento, por favor vuelva
                más tarde.
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      infoIndex: 1,
    };
  },
  computed: {
    pagina() {
      return this.$store.getters["paginas/servicios/getPagina"](
        "agente-operador-sercotec"
      );
    },
  },
};
</script>

<style></style>
