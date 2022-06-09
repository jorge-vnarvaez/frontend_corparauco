<template>
  <div v-if="pagina">
    <!-- <div class="bg-black"> -->
    <v-img
    height="100vh"
      v-if="pagina.header.imagen.data"
      :src="`${$config.apiUrl}${pagina.header.imagen.data.attributes.url}`"
      gradient="to top right, rgba(14, 116, 144,.44), rgba(25,32,72,.22)"
      class="
        flex
        justify-center
        items-center
        align-center
        mb-24
        w-full
        object-center
        mx-auto
        relative
        py-24
        lg:py-0
      "
      cover
    >
      <div class="flex justify-center items-center text-white">
        <p class="w-5/12 text-2xl lg:text-4xl font-bold text-center lg:leading-relaxed">
          Apoyamos a emprendedores en el desarrollo de sus negocios mediante
          soluciones tecnológicas, gestión y capacitación.
        </p>
      </div>
    </v-img>

    <!-- </div> -->

    <!-- [INICIO-NOTICIAS] -->
    <v-container>
      <div class="bg-white py-6 sm:py-8 lg:py-12">
        <div
          class="
            grid grid-cols-12
            max-w-screen-2xl
            px-4
            md:px-8
            mx-auto
            lg:gap-8
          "
        >
          <div
            v-for="(noticia, index) in noticias.slice(0, 6)"
            :key="noticia.id"
            :class="`${
              index % 2 == 0 || index == 3
                ? 'lg:col-span-4 col-span-12'
                : 'lg:col-span-3 col-span-12'
            }`"
          >
            <!-- article - start -->
            <nuxt-link
              :to="{ name: 'noticias-id', params: { id: noticia.id } }"
              class="
                group
                lg:h-48
                h-96
                md:h-64
                xl:h-96
                flex flex-col
                bg-gray-900
                rounded-lg
                shadow-lg
                overflow-hidden
                relative
                hover:shadow-xl
                mt-8
              "
            >
              <img
                v-if="noticia.attributes.imagen_referencia.data"
                :src="
                  `${$config.apiUrl}${
                  noticia.attributes.imagen_referencia.data.attributes.url}`
                "
                alt="Photo by Minh Pham"
                class="
                  w-full
                  h-full
                  object-cover object-center
                  absolute
                  inset-0
                  group-hover:scale-110
                  transition
                  duration-200
                  opacity-60
                "
              />

              <div
                class="
                  bg-gradient-to-t
                  from-gray-800
                  md:via-transparent
                  to-transparent
                  absolute
                  inset-0
                  pointer-events-none
                "
              ></div>

              <div class="relative p-4 mt-auto">
                <span class="block text-gray-200 text-sm">{{
                  fechaFormateada(noticia.attributes.fecha_publicacion)
                }}</span>
                <h2
                  class="
                    text-white
                    lg:text-xl
                    text-sm
                    font-semibold
                    transition
                    duration-100
                    mb-2
                  "
                >
                  {{ noticia.attributes.titulo }}
                </h2>

                <div
                  class="
                    flex
                    items-center
                    text-blue-400
                    font-semibold
                    group-hover:text-amber-600
                  "
                >
                  <p class="mb-0 mr-2">Leer más</p>
                  <v-icon
                    color="white"
                    class="
                      ml-1
                      bg-blue-400
                      group-hover:text-white group-hover:bg-amber-600
                    "
                    dense
                    >mdi-arrow-top-right-thick</v-icon
                  >
                </div>
              </div>
            </nuxt-link>
            <!-- article - end -->
          </div>
        </div>
      </div>

      <div class="w-full flex justify-center mt-16">
        <v-btn color="amber darken-4" outlined
          ><nuxt-link :to="{ name: 'noticias' }" class="text-decoration-none"
            >Ver más noticias</nuxt-link
          ></v-btn
        >
      </div>
    </v-container>
    <!-- [FIN-NOTICIAS] -->

    <div class="grey lighten-4 py-16 px-12 my-24">
      <!-- [INICIO-CARACTERISTICAS] -->
      <div
        v-if="pagina.caracteristicas"
        class="flex lg:flex-row flex-col lg:space-y-0 space-y-20 justify-center rounded-xl grey lighten-5 px-4 py-12 my-12"
      >
        <div
          class="mx-8"
          v-for="caracteristica in pagina.caracteristicas"
          :key="caracteristica.id"
        >
          <span class="grey--text text-h5">{{ caracteristica.label }}</span>
        </div>
      </div>
      <!-- [FIN-CARACTERISTICAS] -->

      <!-- [INICIO-ORGANIZACIONES] -->
      <div
        v-if="pagina.organizaciones.data"
        class="
          flex
          flex-wrap
          justify-center
          px-12
          align-center
          rounded-xl
          py-8
        "
      >
        <div
          cols="3"
          class="mx-8"
          v-for="organizacion in pagina.organizaciones.data"
          :key="organizacion.id"
        >
          <v-img
            v-if="organizacion.attributes.logo.data"
            :src="`${$config.apiUrl}${organizacion.attributes.logo.data.attributes.url}`"
            contain
            class="h-48 w-80"
          >
          </v-img>
        </div>
      </div>
      <!-- [FIN-ORGANIZACIONES] -->
    </div>

    <!-- [INICIO-EMPRENDEDORES-SECTION] -->
    <template>
      <div
        class="
          px-4
          py-16
          mx-auto
          sm:max-w-xl
          md:max-w-full
          lg:max-w-screen-xl
          md:px-24
          lg:px-8 lg:py-20
          mb-32
        "
      >
        <div class="grid gap-10 lg:grid-cols-2">
          <div class="flex flex-col justify-center md:pr-8 xl:pr-0 lg:max-w-lg">
            <div class="max-w-xl mb-6">
              <h2
                class="
                  max-w-lg
                  mb-6
                  font-sans
                  lg:text-6xl
                  text-2xl
                  font-bold
                  tracking-tight
                  text-gray-900
                  sm:leading-none
                "
              >
                Emprendedores con Historia
              </h2>
              <p class="text-base text-gray-700 text-3xl">
                Son muchos los empresarios y emprendedores que han trabajo con
                nosotros.
              </p>
            </div>
            <div class="hover:text-deep-amber-700">
              <nuxt-link
                :to="{ name: 'emprendedores-testimonios' }"
                class="
                  inline-flex
                  items-center
                  font-semibold
                  transition-colors
                  duration-200
                  text-deep-purple-accent-400
                "
              >
                Conocer más
              </nuxt-link>
            </div>
          </div>
          <div class="flex items-center justify-center -mx-4 lg:pl-8">
            <div class="flex flex-col items-end px-3">
              <img
                class="
                  object-cover
                  mb-6
                  rounded
                  shadow-lg
                  h-28
                  sm:h-48
                  xl:h-56
                  w-28
                  sm:w-48
                  xl:w-56
                "
                :src="`${$config.apiUrl}/uploads/alejomora_018cee9d71.png?updated_at=2022-04-18T11:14:34.883Z`"
                alt=""
              />
              <img
                class="
                  object-cover
                  w-20
                  h-20
                  rounded
                  shadow-lg
                  sm:h-32
                  xl:h-40
                  sm:w-32
                  xl:w-40
                "
                :src="`${$config.apiUrl}/uploads/jorgepena_87e53c8104.png?updated_at=2022-04-18T11:14:59.623Z`"
                alt=""
              />
            </div>
            <div class="px-3">
              <img
                class="
                  object-cover
                  w-40
                  h-40
                  rounded
                  shadow-lg
                  sm:h-64
                  xl:h-80
                  sm:w-64
                  xl:w-80
                "
                :src="`${$config.apiUrl}/uploads/tania_huenul_cad48ea8a1.png?updated_at=2022-04-18T11:14:48.044Z`"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layouts: "default",
  name: "IndexPage",
  data() {
    return {
      session: null,
      value: 0,
    };
  },
  computed: {
    pagina() {
      return this.$store.getters["paginas/inicio/getPagina"];
    },
    getSession() {
      return this.$cookies.get("user");
    },
    noticias() {
      return this.$store.getters['noticias/getNoticias'];
    },
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("LL");
    },
  },
};
</script>
