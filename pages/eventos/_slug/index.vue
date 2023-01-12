<template>
  <div v-if="evento">
    <div
      class="bg-blue-800 text-white"
      v-if="
        is_finished(
          evento.attributes.fecha_inicio,
          evento.attributes.fecha_termino
        )
      "
    >
      <v-container class="flex flex-col items-center justify-center py-12">
        <p class="mb-0 text-xl font-bold">Este evento ha terminado</p>
        <p class="my-4 text-center">
          Revisa los próximos evento que tenemos disponibles
        </p>
        <v-btn
          ><nuxt-link :to="{ name: 'eventos' }">Ver eventos</nuxt-link></v-btn
        >
      </v-container>
    </div>
    <v-img
      class="py-16 px-4 lg:py-20"
      gradient="to top right, rgba(14, 116, 144,.84), rgba(25,32,72,.80)"
      :src="`${
        evento.attributes.imagen_referencia.data
          ? `${$config.apiUrl}${evento.attributes.imagen_referencia.data.attributes.url}`
          : ''
      }`"
    >
      <div class="mx-auto max-w-screen-xl grid grid-cols-12 gap-x-8">
        <div class="col-span-10 lg:col-span-5 text-white">
          <p class="text-4xl lg:text-5xl font-bold leading-snug">
            {{ evento.attributes.titulo }}
          </p>

          <v-chip label color="teal" class="mt-2 lg:mt-0">
            <div class="text-white font-bold">
              <span v-if="evento.attributes.requiere_inscripcion"
                ><v-icon class="mr-2">mdi-cellphone-information</v-icon>Requiere
                inscripción</span
              >
              <span v-if="!evento.attributes.requiere_inscripcion"
                >Evento público</span
              >
            </div>
          </v-chip>
          <v-chip
            label
            color="green darken-1"
            class="mt-2 lg:mt-0"
            v-if="evento.attributes.pase_movilidad"
          >
            <div class="text-white font-bold">
              <v-icon class="mr-2">mdi-qrcode-scan</v-icon
              ><span>Requiere pase de movilidad</span>
            </div>
          </v-chip>
          <div class="mb-6">
            <v-chip
              color="orange darken-4"
              label
              text-color="white"
              class="mt-2 lg:mt-0"
              v-if="
                !is_finished(
                  evento.attributes.fecha_inicio,
                  evento.attributes.fecha_termino
                ) && !evento.attributes.es_publico
              "
            >
              <v-icon class="mr-2"> mdi-account-multiple-plus </v-icon>
              <span class="text-white font-bold">Inscripciones abiertas.</span>
            </v-chip>
          </div>

          <div v-if="evento.attributes.calendario">
            <div class="flex items-center mb-4">
              <v-icon color="white" large>mdi-calendar-outline</v-icon>
              <p class="font-bold mb-0 text-xl ml-3">Calendario</p>
            </div>
            <div
              class="flex items-center"
              v-for="fecha in evento.attributes.calendario"
              :key="fecha.id"
            >
              <p class="normal-case text-xl mb-0 font-light">
                <span class="font-thin">{{ formatearDia(fecha.dia) }}</span>
              </p>
            </div>
          </div>

          <div v-if="evento.attributes.ubicacion" class="my-6">
            <div class="flex items-center">
              <v-icon color="white" large>mdi-map-marker-outline</v-icon>
              <p class="font-bold mb-0 text-xl ml-3">
                Ubicación:
                <span class="text-xl mb-0 font-light">
                  {{ evento.attributes.ubicacion }}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div class="col-span-11 lg:col-span-7 bg-white rounded-lg pa-8">
          <div v-if="evento.attributes.descripcion">
            <p class="text-3xl font-bold text-blue-800 mb-6">Descripción</p>
            <span v-html="markdownToHtml(evento.attributes.descripcion)"></span>
          </div>

          <div v-if="evento.attributes.contenidos.length > 0" class="mt-6 mb-8">
            <p class="text-3xl font-bold text-blue-800 my-6">Contenidos</p>
            <div
              v-for="contenido in evento.attributes.contenidos"
              :key="contenido.id"
            >
              <p class="uppercase text-sm mt-4">
                {{ formatearDia(contenido.dia) }}
              </p>
              <v-divider class="mb-4"></v-divider>
              <div class="mb-10">
                <p>
                  <span class="font-bold"> {{ contenido.titulo }}</span> -
                  <span class="uppercase text-sm mt-6 text-blue-800 font-bold">
                    {{ formatearHora(contenido.hora_inicio) }}
                  </span>
                </p>
                <span
                  v-if="contenido.descripcion"
                  v-html="markdownToHtml(contenido.descripcion)"
                ></span>
              </div>
            </div>
          </div>

          <div
            v-if="
              !is_finished(
                evento.attributes.fecha_inicio,
                evento.attributes.fecha_termino
              )
            "
          >
            <p class="text-3xl font-bold text-blue-800 my-6">Inscripciones</p>
            <div v-if="evento.attributes.requiere_inscripcion">
              <div v-if="evento.attributes.inscripciones_meta">
                <span
                  v-html="evento.attributes.inscripciones_meta.excerpt"
                  class="mb-8"
                ></span>
              </div>
              <div class="my-6" v-if="evento.data">
                <p>
                  Este es un evento que requiere inscripción lo que significa
                  que tendrás que completar un formulario para participar el día
                  del evento, no te preocupes de todas maneras podrás seguir o
                  revivir la transmisión en vivo desde tu hogar en caso de que
                  no puedas inscribirte o asistir
                </p>
                <inscripcion-form :evento="evento.data" />
              </div>
            </div>

            <div v-else class="mb-6">
              <p>
                Este es un evento que no requiere de inscripción lo que
                significa que puedes participar de manera presencial o del
                evento en vivo sin la necesidad de inscribirte previamente ,
                disfrutalo!
              </p>
            </div>
          </div>

          <div
            v-if="
              evento.attributes.transmision_vivo &&
              evento.attributes.url_video_llamada
            "
          >
            <p class="text-3xl font-bold text-blue-800 my-6">
              <span
                v-if="
                  !is_finished(
                    evento.attributes.fecha_inicio,
                    evento.attributes.fecha_termino
                  )
                "
                >Únete a la </span
              ><span
                v-if="
                  is_finished(
                    evento.attributes.fecha_inicio,
                    evento.attributes.fecha_termino
                  )
                "
                >Revive a la </span
              >transmisión en vivo
            </p>

            <div
              v-if="
                !is_finished(
                  evento.attributes.fecha_inicio,
                  evento.attributes.fecha_termino
                ) &&
                evento.attributes.transmision_vivo &&
                evento.attributes.url_video_llamada
              "
            >
              <v-btn
                v-if="evento.attributes.transmision_vivo"
                color="amber darken-4"
                depressed
                outlined
                ><a :href="evento.attributes.url_video_llamada" target="_blank"
                  ><v-icon class="mr-2" color="red darken-2" large
                    >mdi-video</v-icon
                  ><span class="text-white font-bold"
                    >Ver evento en vivo</span
                  ></a
                ></v-btn
              >
            </div>

            <div
              v-if="
                is_finished(
                  evento.attributes.fecha_inicio,
                  evento.attributes.fecha_termino
                ) &&
                evento.attributes.transmision_vivo &&
                evento.attributes.url_video_llamada
              "
            >
              <v-btn
                v-if="evento.attributes.transmision_vivo"
                color="red darken-2"
                depressed
                outlined
                ><a :href="evento.attributes.url_video_llamada" target="_blank"
                  ><v-icon class="mr-2" color="red darken-2" large
                    >mdi-video</v-icon
                  ><span class="text-white font-bold">Revivir evento</span></a
                ></v-btn
              >
            </div>
          </div>
        </div>
      </div>
    </v-img>



    <v-container
      v-if="
        evento.attributes.galeria.length > 0 &&
        is_finished(
          evento.attributes.fecha_inicio,
          evento.attributes.fecha_termino
        )
      "
    >
      <p class="text-2xl lg:text-5xl font-bold my-16 text-center">
        ¿Cómo se vivió este evento?
      </p>
      <div class="grid grid-cols-12 lg:gap-x-8 gap-y-8">
        <div
          class="col-span-12 lg:col-span-3"
          v-for="(imagen, imagenIndex) in concatenar_imagenes(
            evento.attributes.galeria
          )"
          :key="imagenIndex"
        >
          <CoolLightBox
            :items="concatenar_imagenes(evento.attributes.galeria)"
            :index="index"
            @close="index = null"
          >
          </CoolLightBox>

          <v-img
            class="rounded-lg cursor-pointer"
            @click="index = imagenIndex"
            :src="imagen"
          >
          </v-img>
        </div>
      </div>
    </v-container>

    <div
      v-if="evento.attributes.colaboradores.length > 0"
      class="py-24 pb-48 mx-auto"
    >
      <p class="text-2xl lg:text-5xl font-bold text-center">
        Nuestros colaboradores
      </p>

      <v-container class="grid grid-cols-12 lg:gap-x-8 gap-y-16 mt-24">
        <div
          v-for="colaborador in evento.attributes.colaboradores"
          :key="colaborador.id"
          class="col-span-12 lg:col-span-2 flex-items-center"
        >
          <v-img
            contain
            class="h-24"
            v-if="colaborador.logo.data"
            :src="`${$config.apiUrl}${colaborador.logo.data.attributes.url}`"
          ></v-img>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { marked } from "marked";
import moment from "moment";
import InscripcionForm from "../../../components/eventos/inscripcion/InscripcionForm.vue";
import CoolLightBox from "vue-cool-lightbox";
import "vue-cool-lightbox/dist/vue-cool-lightbox.min.css";

export default {
  components: { InscripcionForm, CoolLightBox },
  async fetch() {
    await this.$store.dispatch("ui/loadRegiones");
    await this.$store.dispatch("ui/loadProvincias");
    await this.$store.dispatch("ui/loadComunas");
  },
  data() {
    return {
      index: null,
      data_imagenes: [],
    };
  },
  methods: {
    concatenar_imagenes(arreglos) {
      const [...arrays] = arreglos;
      const imagenes = [];
      const img = [];
      arrays.forEach((arreglo) => imagenes.push(arreglo.imagenes.data.map((imagen) => this.$config.apiUrl + imagen.attributes.url)));

      imagenes.forEach((_imagenes) => {
        _imagenes.map((_img) => img.push(_img));
      });

      return img;
    },
    is_finished(fecha_inicio, fecha_termino) {
      const date = new Date();
      const ts_inicio = moment(fecha_inicio).format("x");
      const ts_termino =
        fecha_termino != null ? moment(fecha_termino).format("x") : null;

      let now = date.getTime();
      let res = false;

      if (ts_inicio && ts_termino == null) {
        res = ts_inicio < now ? true : false;
      } else if (ts_termino) {
        res = ts_termino < now ? true : false;
      }

      return res;
    },
  },
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: [
        "calendario",
        "imagen_referencia",
        "contenidos",
        "colaboradores",
        "colaboradores.logo",
        "galeria",
        "galeria.imagenes",
        "inscripciones",
      ],
    });

    const evento = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/eventos/${context.params.slug}?${query}`
      )
      .then((res) => res.data);

    return { evento };
  },
  computed: {
    fechaFormateada() {
      moment.locale("ES");

      return (fecha) =>
        moment(fecha).format("dddd DD [de] MMMM YYYY [a las] HH:mm a");
    },
    formatearDia() {
      moment.locale("ES");

      return (fecha) => moment(fecha).format("dddd DD [de] MMMM YYYY");
    },
    formatearHora() {
      moment.locale("ES");

      return (hora) => moment(hora, "HH:mm:ss").format("HH:mm a");
    },
    markdownToHtml() {
      return (text) => marked(text);
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 220;
        case "sm":
          return 400;
        case "md":
          return 500;
        case "lg":
          return 600;
        case "xl":
          return 800;
      }
    },
  },
};
</script>

<style scoped>
.list {
  list-style-type: disc;
}
</style>