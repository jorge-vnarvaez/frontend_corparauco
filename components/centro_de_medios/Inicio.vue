<template>
  <div>
    <v-container class="grid grid-cols-12 lg:gap-x-20 py-4">
      <div class="flex flex-col col-span-12 lg:col-span-2">
        <div>
          <v-text-field
            outlined
            solo
            flat
            v-model="search"
            label="Buscar"
            append-icon="mdi-magnify"
          ></v-text-field>
        </div>

        <p class="uppercase font-bold">Temáticas</p>
        <div v-if="organizadores">
          <div
            class="
              overflow-x-scroll
              no-scrollbar
              flex
              lg:flex-col
              space-x-4
              lg:space-x-0
            "
          >
            <div v-for="organizador in organizadores" :key="organizador.id">
              <div
                @click="
                  filtrarContenidosTematica(
                    organizador.id,
                    organizador.attributes.titulo
                  )
                "
                :class="
                  'px-5 py-3 flex items-center mb-3 font-bold' +
                  `${
                    tab == organizador.id
                      ? ' font-semibold bg-blue-800 text-white'
                      : ' bg-blue-50'
                  }` +
                  ` mb-0 rounded-lg cursor-pointer`
                "
              >
                <div class="flex justify-between">
                  <span>{{ organizador.attributes.titulo }}</span
                  ><span class="ml-8 lg:ml-0">{{
                    nContenidos(organizador.attributes.titulo)
                  }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="formatos">
          <p class="font-bold mt-8">Formatos</p>

          <div
            class="
              overflow-x-scroll
              no-scrollbar
              flex
              lg:flex-col
              space-x-8
              lg:space-x-0
            "
          >
            <div v-for="(formato, index) in formatos" :key="index">
              <div
                @click="filtarContenidosFormato(index, formato.attributes.nombre)"
                class="
                  py-3
                  flex
                  items-center
                  font-bold
                  mb-0
                  rounded-lg
                  cursor-pointer
                "
              >
                <div class="flex justify-between">
                  <span class="w-32">{{ formato.attributes.nombre }}</span>
                  <v-icon color="indigo darken-1 ml-8 lg:ml-0">{{
                    formato.attributes.icono
                  }}</v-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-10">
        <div
          class="flex lg:flex-row lg:items-center flex-col cursor-pointer"
          v-if="lastContenido"
        >
          <div v-if="lastContenido.attributes.archivo">
            <!-- [YOUTUBE VIDEO] -->
            <div v-if="lastContenido.attributes.archivo.url_youtube">
              <youtube
                :width="width"
                :video-id="getId(lastContenido.attributes.archivo.url_youtube)"
                :player-vars="playerVars"
                class="rounded-lg"
              ></youtube>
            </div>
            <!-- [YOUTUBE VIDEO] -->
          </div>

          <!-- [GUIAS Y CLASES WITH FILE] -->
          <div v-if="lastContenido.attributes.archivo">
            <div v-if="lastContenido.attributes.archivo.archivo.data">
              <!-- [FILES] -->
              <a
                v-if="!lastContenido.attributes.archivo.es_imagen"
                :href="`${$config.apiUrl}${lastContenido.attributes.archivo.archivo.data.attributes.url}`"
              >
                <v-img
                  v-if="lastContenido.attributes.imagen_referencia.data"
                  width="600"
                  height="300"
                  class="rounded-lg shadow-xl"
                  :src="`${$config.apiUrl}${lastContenido.attributes.imagen_referencia.data.attributes.url}`"
                ></v-img>
              </a>
              <!-- [FILES] -->

              <!-- [IMAGES] -->
              <div v-if="lastContenido.attributes.archivo.es_imagen">
                <v-img
                  @click="showImage = true"
                  width="600"
                  height="300"
                  class="rounded-lg shadow-xl"
                  :src="`${$config.apiUrl}${lastContenido.attributes.archivo.archivo.data.attributes.url}`"
                ></v-img>

                <v-overlay :value="showImage">
                  <div class="flex align-start">
                    <v-img
                      v-if="lastContenido.attributes.archivo.es_imagen"
                      width="100%"
                      height="100%"
                      class="rounded-lg shadow-xl"
                      :src="`${$config.apiUrl}${lastContenido.attributes.archivo.archivo.data.attributes.url}`"
                    ></v-img>
                    <v-icon @click="showImage = false" class="ml-4"
                      >mdi-window-close</v-icon
                    >
                  </div>
                </v-overlay>
              </div>
              <!-- [IMAGES] -->
            </div>
          </div>
          <!-- [GUIAS Y CLASES WITH FILE] -->

          <!-- [GUIAS Y CLASES WITHOUT FILE OR VIDEO] -->
          <div v-if="lastContenido.attributes.archivo == undefined">
            <v-img
              v-if="lastContenido.attributes.imagen_referencia.data"
              width="600"
              height="300"
              class="rounded-lg shadow-xl"
              :src="`${$config.apiUrl}${lastContenido.attributes.imagen_referencia.data.attributes.url}`"
            ></v-img>
          </div>
          <!-- [GUIAS Y CLASES WITHOUT FILE OR VIDEO] -->

          <div class="lg:w-3/12 ml-8 lg:ml-0 mt-8 lg:mt-0">
            <p class="text-4xl text-blue-800 font-black">
              {{ lastContenido.attributes.titulo }}
            </p>
            <span class="text-blue-900">{{
              lastContenido.attributes.sumario
            }}</span>
          </div>
        </div>

        <div class="mt-16" v-if="showVideos && videos.length > 0">
          <div class="flex mb-2">
            <p class="font-bold text-lg mr-6 mb-0">Videos</p>
            <v-icon color="indigo darken-1">mdi-arrow-right-drop-circle</v-icon>
          </div>
          <div class="flex space-x-8 no-scrollbar overflow-x-scroll">
            <div
              v-for="video in videos"
              :key="video.id"
              class="cursor-pointer"
              @click="selectContenido(video.id)"
            >
              <v-img
                v-if="video.attributes.archivo"
                width="200"
                height="180"
                class="rounded-xl shadow-xl"
                :src="`https://img.youtube.com/vi/${getId(
                  video.attributes.archivo.url_youtube
                )}/0.jpg`"
              ></v-img>
              <p class="mt-4 font-bold text-blue-800 w-10/12">
                {{ video.attributes.titulo }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12" v-if="showInfografias && infografias.length > 0">
          <div class="flex mb-2">
            <p class="font-bold text-lg mr-6 mb-0">Infografías</p>
            <v-icon color="indigo darken-1">mdi-information</v-icon>
          </div>
          <div class="flex space-x-8 no-scrollbar overflow-x-scroll">
            <div
              v-for="infografia in infografias"
              :key="infografia.id"
              class="cursor-pointer"
              @click="selectContenido(infografia.id)"
            >
              <v-img
                v-if="infografia.attributes.imagen_referencia.data"
                width="200"
                height="180"
                class="rounded-xl shadow-xl"
                :src="`${$config.apiUrl}${infografia.attributes.imagen_referencia.data.attributes.url}`"
              ></v-img>
              <p class="mt-4 font-bold text-blue-800 w-10/12">
                {{ infografia.attributes.titulo }}
              </p>
            </div>
          </div>
        </div>

        <div class="mt-12" v-if="showClases && clases.length > 0">
          <div class="flex mb-2">
            <p class="font-bold text-lg mr-6 mb-0">Guías y clases</p>
            <v-icon color="indigo darken-1">mdi-monitor</v-icon>
          </div>
          <div class="flex space-x-8 no-scrollbar overflow-x-scroll">
            <div
              v-for="clase in clases"
              :key="clase.id"
              class="cursor-pointer"
              @click="selectContenido(clase.id)"
            >
              <v-img
                v-if="clase.attributes.imagen_referencia.data"
                width="200"
                height="180"
                class="rounded-xl shadow-xl"
                :src="`${$config.apiUrl}${clase.attributes.imagen_referencia.data.attributes.url}`"
              ></v-img>
              <p class="mt-4 font-bold text-blue-800 w-10/12">
                {{ clase.attributes.titulo }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<script>
import { Youtube } from "vue-youtube";

export default {
  components: { Youtube },
  data() {
    return {
      search: "",
      tab: -1,
      tab_formatos: -1,
      lastContenido: null,
      listadoFormatos: [],
      showImage: false,
      showVideos: true,
      showClases: true,
      showInfografias: true,
      contenidos: [],
      playerVars: {
        controls: 0,
      },
    };
  },
  watch: {
    search: function (nuevaBusqueda, busquedaAntigua) {
      this.buscarContenidos(nuevaBusqueda);
    },
  },
  methods: {
    nContenidos(titulo) {
      return this.$store.getters["contenidos/getNContenidos"](titulo);
    },
    getId(url) {
      const getYoutubeID = require("get-youtube-id");

      const id = getYoutubeID(url);

      return id;
    },
    selectContenido(id) {
      this.lastContenido = this.$store.getters["contenidos/getContenido"](id);
      this.$nextTick(() => {
        window.scrollTo(0, top);
      });
    },
    async buscarContenidos(keywords) {
      if (keywords != "") {
        const qs = require("qs");

        const query = qs.stringify({
          populate: [
            "imagen_referencia",
            "archivo",
            "archivo.media",
            "formato",
            "organizadores",
          ],
          filters: {
            $or: [
              {
                organizadores: {
                  titulo: {
                    $containsi: keywords,
                  },
                },
              },
              {
                titulo: {
                  $containsi: keywords,
                },
              },
            ],
          },
        });

        const { data } = await this.$axios.get(
          `${this.$config.apiUrl}/api/contenidos?${query}`
        );

        this.contenidos = data.data;
      } else {
        this.contenidos = this.$store.getters["contenidos/getContenidos"];
      }
    },
    async filtrarContenidosTematica(id, titulo) {
      this.tab = this.tab != id ? id : -1;

      if (this.tab != -1) {
        const qs = require("qs");

        const query = qs.stringify({
          populate: [
            "imagen_referencia",
            "archivo",
            "archivo.archivo",
            "formato",
            "organizadores",
          ],
          filters: {
            organizadores: {
              titulo: {
                $eq: titulo,
              },
            },
          },
        });

        const { data } = await this.$axios.get(
          `${this.$config.apiUrl}/api/contenidos?${query}`
        );

        this.contenidos = data.data;
      } else {
        this.contenidos = this.$store.getters["contenidos/getContenidos"];
      }
    },

    filtarContenidosFormato(id, formato) {
      this.tab_formatos = this.tab_formatos != id ? id : -1;

      let filtro_formato = this.tab_formatos != -1 ? formato : "Todos";

      switch (filtro_formato) {
        case "Videos":
          this.showVideos = true;
          this.showInfografias = false;
          this.showClases = false;
          break;
        case "Infografías":
          this.showVideos = false;
          this.showInfografias = true;
          this.showClases = false;
          break;
        case "Guías y clases":
          this.showVideos = false;
          this.showInfografias = false;
          this.showClases = true;
          break;
        case "Todos":
          this.showVideos = true;
          this.showInfografias = true;
          this.showClases = true;
          break;
      }
    },
  },
  mounted() {
    this.lastContenido = this.$store.getters["contenidos/getLastContenido"];
    this.contenidos = this.$store.getters["contenidos/getContenidos"];
  },
  computed: {
    organizadores() {
      return this.$store.getters["organizadores/getOrganizadores"];
    },
    formatos() {
      return this.$store.getters["formatos/getFormatos"];
    },
    videos() {
      return this.$store.getters["contenidos/getVideos"](this.contenidos);
    },
    infografias() {
      return this.$store.getters["contenidos/getInfografias"](this.contenidos);
    },
    clases() {
      return this.$store.getters["contenidos/getClases"](this.contenidos);
    },
    width() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return 320
          case 'sm': return 340
          case 'md': return 600
          case 'lg': return 600
          case 'xl': return 600
      }
    }
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>