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
        <div
          class="p-[20px] lg:p-[0px]"
          v-if="curso.attributes.modulos.length > 0"
        >
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
                        modulo,
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
import moment from "moment";
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
    this.log();

    this.urlRecurso = localStorage.getItem("urlRecurso");

    if (this.contenido_seleccionado == null) {
      if (this.curso.attributes.modulos.length > 0) {
        this.contenido_seleccionado =
          this.curso.attributes.modulos[0].contenidos[0];

        this.id_contenido_seleccionado = this.contenido_seleccionado.id;
      }
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

      let modulo = (this.contenido_seleccionado =
        this.curso.attributes.modulos.find(
          (modulo) => modulo.id == ultimoModuloVisitado
        ));

      if (modulo.contenidos.length > 0) {
        this.contenido_seleccionado = modulo.contenidos.find(
          (contenido) => contenido.id == ultimoContenido
        );
      }

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
    this.debounceGetAnswer = _.debounce(this.ended, 40000);
    this.debounceGetAnswer = _.debounce(this.seleccionarContenido, 12000);
  },
  updated() {
    this.urlRecurso = localStorage.getItem("urlRecurso");
  },
  methods: {
    async log() {
      // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
      const user =
        this.$cookies.get("user") != null
          ? JSON.parse(this.$cookies.get("user")).toString()
          : "0";

      // Crear un objeto con los datos a guardar
      const key = {
        action: "Visitó un curso",
        values: [
          {
            grandparent: "",
            log_key: this.curso.attributes.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ],
      };

      const qs = require("qs");

      const query = qs.stringify({
        filters: {
          user_id: {
            $eq: user,
          },
        },
        populate: ["log", "log.keys", "log.keys.values"],
      });

      // Obtener el log del usuario actual, si es 0 obtendra el log general de usuarios que no han iniciado sesion
      const { data } = await this.$axios.get(
        `${this.$config.apiUrl}/api/logs?${query}`
      );

      // Si el log no existe, crearlo
      if (data.data.length == 0) {
        await this.$axios.post(`${this.$config.apiUrl}/api/logs`, {
          data: {
            user_id: user,
            log: {
              keys: [key],
            },
          },
        });
      }

      // Si el log existe
      if (data.data.length > 0) {
        // Obtener el log del usuario actual
        const log_id = data.data[0].id;

        // Obtener las keys del log del usuario actual
        let key_data = data.data[0].attributes.log.keys;

        // Verificar si el usuario actual ya ha activado la key de visitar un curso
        let indexKey = key_data.find((key) => key.action == "Visitó un curso");

        // Si la key no existe, crearla
        if (indexKey == undefined) {
          key_data.push(key);
        }

        // Si la key existe, obtener el index de la key
        if (indexKey != undefined) {
          let index = key_data.indexOf(indexKey);

          // Agregar un nuevo valor a la key
          key_data[index].values.push({
            grandparent: "",
            log_key: this.curso.attributes.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
        }

        await this.$axios.put(`${this.$config.apiUrl}/api/logs/${log_id}`, {
          data: {
            log: {
              keys: key_data,
            },
          },
        });
      }
    },
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
    async seleccionarContenido(modulo, contenido, index, index_modulo) {
      // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
      const user =
        this.$cookies.get("user") != null
          ? JSON.parse(this.$cookies.get("user")).toString()
          : "0";

      // Crear un objeto con los datos a guardar
      const key = {
        action: "Selecciono un contenido",
        values: [
          {
            grandparent: this.curso.attributes.titulo,
            parent: "Modulo " + modulo.titulo,
            log_key: contenido.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ],
      };

      const qs = require("qs");

      const query = qs.stringify({
        filters: {
          user_id: {
            $eq: user,
          },
        },
        populate: ["log", "log.keys", "log.keys.values"],
      });

      // Obtener el log del usuario actual, si es 0 obtendra el log general de usuarios que no han iniciado sesion
      const { data } = await this.$axios.get(
        `${this.$config.apiUrl}/api/logs?${query}`
      );

      // Si el log no existe, crearlo
      if (data.data.length == 0) {
        await this.$axios.post(`${this.$config.apiUrl}/api/logs`, {
          data: {
            user_id: user,
            log: {
              keys: [key],
            },
          },
        });
      }

      // Si el log existe
      if (data.data.length > 0) {
        // Obtener el log del usuario actual
        const log_id = data.data[0].id;

        // Obtener las keys del log del usuario actual
        let key_data = data.data[0].attributes.log.keys;

        // Verificar si el usuario actual ya ha activado la key de seleccionar un contenido
        let indexKey = key_data.find(
          (key) => key.action == "Selecciono un contenido"
        );

        // Si la key no existe, crearla
        if (indexKey == undefined) {
          key_data.push(key);
        }

        // Si la key existe, obtener el index de la key
        if (indexKey != undefined) {
          let index = key_data.indexOf(indexKey);

          // Agregar un nuevo valor a la key
          key_data[index].values.push({
            grandparent: this.curso.attributes.titulo,
            parent: "Modulo " + modulo.titulo,
            log_key: contenido.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
        }

        await this.$axios.put(`${this.$config.apiUrl}/api/logs/${log_id}`, {
          data: {
            log: {
              keys: key_data,
            },
          },
        });
      }

      index = index == 0 ? 1 : index + 1;
      index_modulo = index_modulo == 0 ? 0 : index_modulo + 1;

      let index_video = index_modulo + index;

      // Obtener meta data de que cursos están siendo consumidos
      this.id_contenido_seleccionado = contenido.id;
      this.id_modulo_abierto = modulo.id;
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
          indexUltimoContenido: index_video,
        });
      }

      // Si ya fue visitado se sobreescribe el ultimo contenido consumido de dicho curso
      if (existe) {
        cursosVisitados.map((curso) => {
          if (curso.id_curso == this.curso.id) {
            curso.ultimoModuloVisitado = this.id_modulo_abierto;
            curso.ultimoContenido = this.id_contenido_seleccionado;
            curso.indexUltimoContenido = index_video;
          }
        });
      }

      localStorage.setItem("cursosVisitados", JSON.stringify(cursosVisitados));
    },
    async finalizarContenido(id, id_modulo) {
      // Encontrar el modulo correspondiente al id_modulo
      let modulo = this.curso.attributes.modulos.find(
        (modulo) => modulo.id == id_modulo
      );

      // Encontrar el curso correspondiente al id_modulo y id_curso
      let contenido = modulo.contenidos.find((contenido) => contenido.id == id);

      // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
      const user =
        this.$cookies.get("user") != null
          ? JSON.parse(this.$cookies.get("user")).toString()
          : "0";

      // Crear un objeto con los datos a guardar
      const key = {
        action: "Finalizó un contenido",
        values: [
          {
            grandparent: this.curso.attributes.titulo,
            parent: "Modulo " + modulo.titulo,
            log_key: contenido.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ],
      };

      const qs = require("qs");

      const query = qs.stringify({
        filters: {
          user_id: {
            $eq: user,
          },
        },
        populate: ["log", "log.keys", "log.keys.values"],
      });

      // Obtener el log del usuario actual, si es 0 obtendra el log general de usuarios que no han iniciado sesion
      const { data } = await this.$axios.get(
        `${this.$config.apiUrl}/api/logs?${query}`
      );

      if (data.data.length == 0) {
        await this.$axios.post(`${this.$config.apiUrl}/api/logs`, {
          data: {
            user_id: user,
            log: {
              keys: [key],
            },
          },
        });
      }

      // Si el log existe
      if (data.data.length > 0) {
        // Obtener el log del usuario actual
        const log_id = data.data[0].id;

        // Obtener las keys del log del usuario actual
        let key_data = data.data[0].attributes.log.keys;

        // Verificar si el usuario actual ya ha activado la key de seleccionar un contenido
        let indexKey = key_data.find(
          (key) => key.action == "Finalizó un contenido"
        );

        // Si la key no existe, crearla
        if (indexKey == undefined) {
          key_data.push(key);
        }

        // Si la key existe, obtener el index de la key
        if (indexKey != undefined) {
          let index = key_data.indexOf(indexKey);

          // Agregar un nuevo valor a la key
          key_data[index].values.push({
            grandparent: this.curso.attributes.titulo,
            parent: "Modulo " + modulo.titulo,
            log_key: contenido.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
        }

        await this.$axios.put(`${this.$config.apiUrl}/api/logs/${log_id}`, {
          data: {
            log: {
              keys: key_data,
            },
          },
        });
      }

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

        this.totalContenidosFinalizados();
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
    // Verificar si el total de contenidos fue finalizado
    async totalContenidosFinalizados() {
      const contenidosFinalizados =
        localStorage.getItem("contenidosFinalizados") != null
          ? JSON.parse(localStorage.getItem("contenidosFinalizados"))
          : localStorage.getItem("contenidosFinalizados");

      // from contenidosFinalizados filter all items with id_curso == this.curso.id
      const contenidosFinalizadosCurso = contenidosFinalizados.filter(
        (contenido) => contenido.id_curso == this.curso.id
      );

      if (contenidosFinalizadosCurso.length == this.contenidosLength) {
        // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
        const user =
          this.$cookies.get("user") != null
            ? JSON.parse(this.$cookies.get("user")).toString()
            : "0";

        // Crear un objeto con los datos a guardar
        const key = {
          action: "Finalizó un curso",
          values: [
            {
              grandparent: "",
              parent: "",
              log_key: this.curso.attributes.titulo,
              time: moment().unix().toString(),
              ts: moment().format("YYYY-MM-DD HH:mm:ss"),
            },
          ],
        };

        const qs = require("qs");

        const query = qs.stringify({
          filters: {
            user_id: {
              $eq: user,
            },
          },
          populate: ["log", "log.keys", "log.keys.values"],
        });

        // Obtener el log del usuario actual, si es 0 obtendra el log general de usuarios que no han iniciado sesion
        const { data } = await this.$axios.get(
          `${this.$config.apiUrl}/api/logs?${query}`
        );

        if (data.data.length == 0) {
          await this.$axios.post(`${this.$config.apiUrl}/api/logs`, {
            data: {
              user_id: user,
              log: {
                keys: [key],
              },
            },
          });
        }

        // Si el log existe
        if (data.data.length > 0) {
          // Obtener el log del usuario actual
          const log_id = data.data[0].id;

          // Obtener las keys del log del usuario actual
          let key_data = data.data[0].attributes.log.keys;

          // Verificar si el usuario actual ya ha activado la key de seleccionar un contenido
          let indexKey = key_data.find(
            (key) => key.action == "Finalizó un curso"
          );

          // Si la key no existe, crearla
          if (indexKey == undefined) {
            key_data.push(key);
          }

          // Si la key existe, obtener el index de la key
          if (indexKey != undefined) {
            let index = key_data.indexOf(indexKey);

            // Agregar un nuevo valor a la key
            key_data[index].values.push({
              grandparent: "",
              parent: "",
              log_key: this.curso.attributes.titulo,
              time: moment().unix().toString(),
              ts: moment().format("YYYY-MM-DD HH:mm:ss"),
            });
          }

          await this.$axios.put(`${this.$config.apiUrl}/api/logs/${log_id}`, {
            data: {
              log: {
                keys: key_data,
              },
            },
          });
        }
      }
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
        "valoraciones",
      ],
    });

    const curso = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/cursos/${context.params.slug}?${query}`
      )
      .then((res) => res.data);
    return { curso };
  },
  // create a computed property to get the length of the array of contenidos for this curso
  computed: {
    contenidosLength() {
      return this.curso.attributes.modulos.reduce((acc, modulo) => {
        return acc + modulo.contenidos.length;
      }, 0);
    },
  },
};
</script>

<style></style>
