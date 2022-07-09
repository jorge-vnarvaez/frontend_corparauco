<template>
  <div v-if="curso">
    <div class="grid grid-cols-12">
      <div class="col-span-12 lg:col-span-9">
        <div v-if="contenido_seleccionado">
          <youtube
            v-if="contenido_seleccionado.es_video"
            :video-id="getId(contenido_seleccionado.url)"
            :player-vars="playerVars"
            class="w-full h-screen"
          ></youtube>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-3">
        <span class="block text-xl font-bold p-[20px] border-b border-gray-200"
          >Contenido del curso</span
        >
        <div class="p-[20px] lg:p-[0px]">
          <div v-for="(modulo, index) in curso.attributes.modulos" :key="index">
            <div
              class="flex justify-between bg-gray-100 border-b border-gray-200"
            >
              <span class="font-black p-4"
                >Módulo {{ index + 1 }}: {{ modulo.titulo }}</span
              >
              <v-icon
                v-if="!indexes_open.includes(index)"
                @click="openIndex(index)"
                >mdi-chevron-down</v-icon
              >
              <v-icon
                v-if="indexes_open.includes(index)"
                @click="closeIndex(index)"
                >mdi-chevron-up</v-icon
              >
            </div>

            <div v-if="indexes_open.includes(index)">
              <div
                v-for="(contenido, index) in modulo.contenidos"
                :key="index"
                :class="
                  `${
                    id_contenido_seleccionado == contenido.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : ''
                  }` + ' p-4'
                "
                @click="seleccionarContenido(contenido.id, contenido)"
              >
                <div class="flex flex-col align-start" v-if="contenido.url">
                  <span>
                    {{ contenido.titulo }}
                  </span>
                  <v-icon
                    v-if="contenido.es_video"
                    :color="
                      id_contenido_seleccionado == contenido.id ? 'white' : ''
                    "
                  >
                    mdi-youtube
                  </v-icon>

                  <v-icon
                    v-if="!contenido.es_video"
                    :color="
                      id_contenido_seleccionado == contenido.id ? 'white' : ''
                    "
                  >
                    mdi-file-pdf-box
                  </v-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <h1>{{ curso.attributes.titulo }}</h1>

    <div v-if="curso.attributes.contenidos && curso.attributes.contenidos.data.length > 0">
      <h3>Contenidos</h3>
      <span
        v-for="contenido in curso.attributes.contenidos.data"
        :key="contenido.id"
      >
        {{ contenido.attributes.titulo }}
      </span>
    </div>

    <div>Info</div>

    <span>{{ curso.attributes.descripcion }} </span>

    <button>Inscripcion</button> -->
  </div>
</template>

<script>

import { Youtube } from "vue-youtube";

export default {
  components: { Youtube },
  data() {
    return {
      indexes_open: [],
      id_contenido_seleccionado: -1,
      contenido_seleccionado: null,
    };
  },
  methods: {
    openIndex(index) {
      this.indexes_open.push(index);
    },
    closeIndex(index) {
      const i = this.indexes_open.indexOf(index);
      this.indexes_open.splice(i, 1);
    },
    seleccionarContenido(id, contenido) {
      this.id_contenido_seleccionado = id;
      this.contenido_seleccionado = contenido;
    },
    getId(url) {
      const getYoutubeID = require("get-youtube-id");

      const id = getYoutubeID(url);

      return id;
    },
  },
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["modulos", "modulos.contenidos"],
    });

    const curso = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/cursos/${context.params.id}?${query}`
      )
      .then((res) => res.data);
    return { curso };
  },
};
</script>

<style>
</style>