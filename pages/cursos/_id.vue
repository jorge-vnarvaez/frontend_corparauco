<template>
  <div v-if="curso">
    <div class="grid grid-cols-12">
      <div class="col-span-12 lg:col-span-9" v-if="contenido_seleccionado">
        <div v-if="infoCurso" class="bg-neutral-800">
          <div class="p-[20px] lg:px-[70px] text-white lg:py-[30px]">
            <span class="lg:text-3xl font-bold">{{
              curso.attributes.titulo
            }}</span>
            <p class="mt-2 mb-0">{{ curso.attributes.descripcion }}</p>
            <!-- <v-rating
              color="warning"
              v-model="rating"
              icon-label="custom icon label text {0} of {1}"
            ></v-rating> -->
          </div>
        </div>

        <div v-if="contenido_seleccionado.es_video">
          <div v-if="contenido_seleccionado.url" class="w-full h-screen">
            <youtube
              :video-id="getId(contenido_seleccionado.url)"
              @ended="ended()"
              width="100%"
              height="100%"
            ></youtube>
          </div>
        </div>

        <div
          v-if="contenido_seleccionado.es_solo_recurso"
          class="w-full h-screen"
        >
          <iframe
            :src="
              'https://docs.google.com/viewerng/viewer?url=' +
              `${urlRecurso}` +
              '&embedded=true'
            "
            width="100%"
            height="100%"
          ></iframe>
        </div>

        <div class="p-[20px] lg:px-[50px] lg:py-[30px]">
          <span class="text-2xl font-bold">{{
            contenido_seleccionado.titulo
          }}</span>
          <span class="block text-sm lg:text-base mt-4 mb-0">{{
            contenido_seleccionado.descripcion
          }}</span>
        </div>
      </div>

      <div class="col-span-12 lg:col-span-3">
        <div class="flex justify-between border-b border-gray-200 p-[20px]">
          <span class="block text-xl font-bold">Contenido del curso</span>
          <v-icon v-if="infoCurso == false" @click="showInfoCurso()"
            >mdi-information-outline</v-icon
          >
          <v-icon v-if="infoCurso != false" @click="showInfoCurso()"
            >mdi-close</v-icon
          >
        </div>
        <div class="p-[20px] lg:p-[0px]">
          <div
            v-for="(modulo, index_modulo) in curso.attributes.modulos"
            :key="index_modulo"
          >
            <div class="bg-gray-100 border-b border-gray-200">
              <div class="flex flex-col p-4">
                <div class="flex justify-between">
                  <span class="font-black"
                    >Módulo {{ index_modulo + 1 }}: {{ modulo.titulo }}</span
                  >
                  <v-icon
                    v-if="!indexes_open.includes(modulo.id)"
                    @click="openIndex(modulo.id)"
                    >mdi-chevron-down</v-icon
                  >
                  <v-icon
                    v-if="indexes_open.includes(modulo.id)"
                    @click="closeIndex(modulo.id)"
                    >mdi-chevron-up</v-icon
                  >
                </div>
                <span
                  >{{ nFinalizados(modulo.id) }} /
                  {{ modulo.contenidos.length }}</span
                >
              </div>
            </div>

            <div v-if="indexes_open.includes(modulo.id)">
              <div
                v-for="(contenido, index) in modulo.contenidos"
                :key="index"
                :class="
                  `${
                    id_contenido_seleccionado == contenido.id
                      ? 'bg-blue-50 shadow-sm'
                      : ''
                  }` + ' cursor-pointer hover:bg-blue-50 hover:shadow-sm p-4'
                "
              >
                <div class="flex items-start">
                  <v-checkbox
                    v-model="contenidosFinalizados"
                    :value="contenido.id"
                    hide-details
                    light
                    dense
                    @click="finalizarContenido(contenido.id, modulo.id)"
                  ></v-checkbox>

                  <div
                    class="flex flex-col items-start"
                    @click="
                      seleccionarContenido(
                        contenido.id,
                        modulo.id,
                        contenido,
                        index,
                        index_modulo
                      )
                    "
                  >
                    <span class="block mt-[7px]">
                      {{ contenido.titulo }}
                    </span>
                    <div class="flex flex-col w-full" v-if="contenido.es_video">
                      <div class="flex justify-between w-full mt-2">
                        <v-icon size="24"> mdi-youtube </v-icon>

                        <div
                          class="relative outline outline-1 px-[8px] lg:px-[16px] py-[4px] lg:py-[2px]"
                          v-if="contenido.recursos.data"
                        >
                          <v-icon
                            size="24"
                            :small="$vuetify.breakpoint.mobile ? true : false"
                            class="mr-1"
                            >mdi-folder-open</v-icon
                          >
                          <span class="text-xs lg:text-sm font-bold"
                            >Recursos</span
                          >
                          <v-icon @click="toggleRecursosList()"
                            >mdi-chevron-down</v-icon
                          >

                          <div
                            v-if="contenido.recursos.data && recursosListOpen"
                            class="bg-white py-2 px-4 absolute top-10 w-[320px] lg:w-[350px] -left-48 shadow-md z-10"
                          >
                            <div
                              v-for="recurso in contenido.recursos.data"
                              :key="recurso.id"
                              class="group"
                            >
                              <a
                                :href="$config.apiUrl + recurso.attributes.url"
                                target="_blank"
                              >
                                <v-icon small class="mr-2"
                                  >mdi-folder-arrow-down</v-icon
                                >

                                <span
                                  class="text-neutral-900 text-sm group-hover:text-blue-600"
                                  >{{
                                    recurso.attributes.alternativeText
                                  }}</span
                                >
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <v-icon v-if="!contenido.es_video">
                      mdi-file-pdf-box
                    </v-icon>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Youtube } from "vue-youtube";
import _ from "lodash";

export default {
  components: { Youtube },
  data() {
    return {
      rating: 0,
      infoCurso: false,
      recursosListOpen: false,
      urlRecurso: null,
      indexes_open: [],
      contenidosFinalizados: [],
      metaContenidosFinalizados: [],
      id_contenido_seleccionado: -1,
      id_modulo_abierto: -1,
      contenido_seleccionado: null,
    };
  },
  mounted() {
    this.urlRecurso = localStorage.getItem("urlRecurso");

    if (this.contenido_seleccionado == null) {
      this.contenido_seleccionado =
        this.curso.attributes.modulos[0].contenidos[0];
    }

    let cursosVisitados =
      localStorage.getItem("cursosVisitados") != null
        ? JSON.parse(localStorage.getItem("cursosVisitados"))
        : localStorage.getItem("cursosVisitados");

    cursosVisitados = cursosVisitados == null ? [] : cursosVisitados;

    let cursoData = cursosVisitados.find((curso) => {
      if (curso.id_curso == this.curso.id) {
        return curso;
      }
    });

    let ultimoModuloVisitado =
      cursoData == null ? null : cursoData.ultimoModuloVisitado;
    let ultimoContenido = cursoData == null ? null : cursoData.ultimoContenido;

    const contenidosFinalizados = JSON.parse(
      localStorage.getItem("contenidosFinalizados")
    );

    if (ultimoModuloVisitado && ultimoContenido) {
      this.openIndex(ultimoModuloVisitado);

      this.contenido_seleccionado = this.curso.attributes.modulos
        .find((modulo) => modulo.id == ultimoModuloVisitado)
        .contenidos.find((contenido) => contenido.id == ultimoContenido);

      this.id_contenido_seleccionado = this.contenido_seleccionado.id;
    }

    if (contenidosFinalizados) {
      this.contenidosFinalizados = contenidosFinalizados.map(
        (contenido) => contenido.id_contenido
      );
      this.metaContenidosFinalizados = contenidosFinalizados;
    }
  },
  // Espera a que el video termine y actualiza el contador finalizado y chequea que está finalizado
  created: function () {
    this.debounceGetAnswer = _.debounce(this.ended, 18000);
    this.debounceGetAnswer = _.debounce(this.seleccionarContenido, 2000);
  },
  updated() {
    this.urlRecurso = localStorage.getItem("urlRecurso");
  },
  methods: {
    ended() {
      this.finalizarContenido(
        this.id_contenido_seleccionado,
        this.id_modulo_abierto
      );
      this.nFinalizados(this.id_modulo_abierto);
    },
    openIndex(index) {
      this.indexes_open.push(index);
    },
    closeIndex(index) {
      const i = this.indexes_open.indexOf(index);
      this.indexes_open.splice(i, 1);
    },
    toggleRecursosList() {
      this.recursosListOpen = !this.recursosListOpen;
    },
    showInfoCurso() {
      this.infoCurso = !this.infoCurso;
      this.$nextTick(() => {
        window.scrollTo(0, top);
      });
    },
    seleccionarContenido(id, id_modulo, contenido, index, index_modulo) {
      // Obtener meta data de que cursos están siendo consumidos
      this.id_contenido_seleccionado = id;
      this.id_modulo_abierto = id_modulo;
      this.contenido_seleccionado = contenido;

      // Si es solo recurso, obtener el archivo para desplegar en vista previa
      if (contenido.es_solo_recurso) {
        this.urlRecurso =
          this.$config.apiUrl +
          this.contenido_seleccionado.recursos.data[0].attributes.url;
        localStorage.setItem("urlRecurso", this.urlRecurso);
      }

      // Se determina si es primera vez que se consume el curso
      let cursosVisitados =
        localStorage.getItem("cursosVisitados") != null
          ? JSON.parse(localStorage.getItem("cursosVisitados"))
          : localStorage.getItem("cursosVisitados");

      // Si no se han visitado cursos, se crea un arreglo vacio
      if (cursosVisitados == null) {
        cursosVisitados = [];
      }

      // Verificar si el curso visitado ya fue visitado anteriormente
      const existe = cursosVisitados.find((curso) => {
        if (curso.id_curso == this.curso.id) {
          return true;
        }
      });

      // Si no ha sido visitado se agrega
      if (!existe) {
        cursosVisitados.push({
          id_curso: this.curso.id,
          ultimoModuloVisitado: this.id_modulo_abierto,
          ultimoContenido: this.id_contenido_seleccionado,
          indexUltimoContenido: index * (index_modulo + 1),
        });
      }

      // Si ya fue visitado se sobreescribe el ultimo contenido consumido de dicho curso
      if (existe) {
        cursosVisitados.map((curso) => {
          if (curso.id_curso == this.curso.id) {
            curso.ultimoModuloVisitado = this.id_modulo_abierto;
            curso.ultimoContenido = this.id_contenido_seleccionado;
            curso.indexUltimoContenido = index * (index_modulo + 1);
          }
        });
      }

      localStorage.setItem("cursosVisitados", JSON.stringify(cursosVisitados));
    },
    finalizarContenido(id, id_modulo) {
      const contenidosFinalizados = JSON.parse(
        localStorage.getItem("contenidosFinalizados")
      );

      if (contenidosFinalizados || contenidosFinalizados == null) {
        this.metaContenidosFinalizados = contenidosFinalizados;

        let index = 0;

        if (contenidosFinalizados == null) {
          this.metaContenidosFinalizados = [];
          index = -1;
        } else {
          index = this.metaContenidosFinalizados.findIndex((meta) => {
            if (meta.id_contenido == id) {
              return true;
            }
          });
        }

        if (index != -1) {
          this.metaContenidosFinalizados.splice(index, 1);
        } else {
          this.metaContenidosFinalizados.push({
            id_curso: this.curso.id,
            id_modulo: id_modulo,
            id_contenido: id,
          });

          this.contenidosFinalizados.push(id);
        }

        localStorage.setItem(
          "contenidosFinalizados",
          JSON.stringify(this.metaContenidosFinalizados)
        );
      }
    },
    nFinalizados(id_modulo) {
      return this.metaContenidosFinalizados != []
        ? this.metaContenidosFinalizados.filter(
            (meta) => meta.id_modulo == id_modulo
          ).length
        : 0;
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
      populate: [
        "modulos",
        "modulos.contenidos",
        "modulos.contenidos.recursos",
        "organizadores",
      ],
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

<style></style>
