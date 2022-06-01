<template>
  <div v-if="evento">
    <div
      class="bg-blue-800 text-white"
      v-if="
        is_finished(
          evento.data.attributes.fecha_inicio,
          evento.data.attributes.fecha_termino
        )
      "
    >
      <v-container class="flex flex-col items-center justify-center py-12">
        <p class="mb-0 text-xl font-bold">Este evento ha terminado</p>
        <p class="my-4">Revisa los próximos evento que tenemos disponibles</p>
        <v-btn
          ><nuxt-link :to="{ name: 'eventos' }">Ver eventos</nuxt-link></v-btn
        >
      </v-container>
    </div>
    <v-img
      class="py-16 px-4 lg:py-20"
      gradient="to top right, rgba(14, 116, 144,.44), rgba(25,32,72,.55)"
      :src="`${
        evento.data.attributes.imagen_referencia.data
          ? `${$config.apiUrl}${evento.data.attributes.imagen_referencia.data.attributes.url}`
          : ''
      }`"
    >
      <div class="mx-auto max-w-screen-xl grid grid-cols-12 gap-x-8">
        <div class="col-span-10 lg:col-span-5 text-white">
          <p class="text-4xl lg:text-6xl w-5/12 font-bold leading-snug">
            {{ evento.data.attributes.titulo }}
          </p>

          <v-chip label color="teal" class="mt-2 lg:mt-0">
            <div class="text-white font-bold">
              <span v-if="evento.data.attributes.es_publico"
                ><v-icon class="mr-2">mdi-lock-open-variant</v-icon>Evento
                público</span
              >
              <span v-if="!evento.data.attributes.es_publico"
                ><v-icon class="mr-2">mdi-lock</v-icon>Evento privado</span
              >
            </div>
          </v-chip>
          <v-chip
            label
            color="green darken-1"
            class="mt-2 lg:mt-0"
            v-if="evento.data.attributes.pase_movilidad"
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
                  evento.data.attributes.fecha_inicio,
                  evento.data.attributes.fecha_termino
                ) && !evento.data.attributes.es_publico
              "
            >
              <v-icon class="mr-2"> mdi-account-multiple-plus </v-icon>
              <span class="text-white font-bold">Inscripciones abiertas.</span>
            </v-chip>
          </div>

          <div
            class="flex items-center"
            v-if="evento.data.attributes.fecha_inicio"
          >
            <v-icon color="white" large>mdi-calendar-outline</v-icon>
            <p class="ml-4 normal-case text-xl mb-0 font-light">
              Inicia:
              <span class="font-thin">{{
                fechaFormateada(evento.data.attributes.fecha_inicio)
              }}</span>
            </p>
          </div>

          <div
            class="flex items-center mt-4"
            v-if="evento.data.attributes.fecha_termino"
          >
            <v-icon color="white" large>mdi-calendar-lock</v-icon>
            <p class="ml-4 normal-case text-xl mb-0 font-light">
              Termina: {{ formatearDia(evento.data.attributes.fecha_termino) }}
            </p>
          </div>
          <div class="flex items-center my-6">
            <v-icon color="white" large>mdi-map-marker-outline</v-icon>
            <p class="ml-4 text-xl mb-0 font-light">
              {{ evento.data.attributes.ubicacion }}
            </p>
          </div>
        </div>

        <div class="col-span-11 lg:col-span-7 bg-white rounded-lg pa-8 h-full">
          <div v-if="evento.data.attributes.descripcion">
            <p class="text-3xl font-bold text-blue-800 mb-6">Descripción</p>
            <span
              v-html="markdownToHtml(evento.data.attributes.descripcion)"
            ></span>
          </div>

          <div
            v-if="evento.data.attributes.contenidos.length > 0"
            class="mt-6 mb-8"
          >
            <p class="text-3xl font-bold text-blue-800 my-6">Contenidos</p>
            <div
              v-for="contenido in evento.data.attributes.contenidos"
              :key="contenido.id"
            >
              <p class="uppercase text-sm mt-4">
                {{ formatearDia(contenido.dia) }}
              </p>
              <v-divider></v-divider>
              <div class="mb-10">
                <p class="uppercase text-sm mt-6 text-blue-800 font-bold">
                  {{ formatearHora(contenido.hora_inicio) }}
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
                evento.data.attributes.fecha_inicio,
                evento.data.attributes.fecha_termino
              )
            "
          >
            <p class="text-3xl font-bold text-blue-800 my-6">Inscripciones</p>
            <div v-if="!evento.data.attributes.es_publico">
              <div v-if="evento.data.attributes.inscripciones_meta">
                <span
                  v-html="evento.data.attributes.inscripciones_meta.excerpt"
                  class="mb-8"
                ></span>
              </div>
              <div class="my-6">
                <p>
                  Este es un evento privado lo que significa que tendrás que
                  completar un formulario de inscripción para participar el día
                  del evento, no te preocupes de todas maneras podrás seguir la
                  transmisión en vivo desde tu hogar dicho día en caso de que no
                  puedas inscribirte o asistir
                </p>
                <inscripcion-form :event="evento.data" />
              </div>
            </div>

            <div v-else class="mb-6">
              <p>
                Este es un evento público lo que significa que puedes participar
                de manera presencial sin la necesidad de inscribirte previamente
                , disfrutalo!
              </p>
            </div>
          </div>

          <div
            v-if="
              evento.data.attributes.transmision_vivo &&
              evento.data.attributes.url_video_llamada
            "
          >
            <p class="text-3xl font-bold text-blue-800 my-6">
              <span
                v-if="
                  !is_finished(
                    evento.data.attributes.fecha_inicio,
                    evento.data.attributes.fecha_termino
                  )
                "
                >Únete a la </span
              ><span
                v-if="
                  is_finished(
                    evento.data.attributes.fecha_inicio,
                    evento.data.attributes.fecha_termino
                  )
                "
                >Revive a la </span
              >transmisión en vivo
            </p>

            <div
              v-if="
                !is_finished(
                  evento.data.attributes.fecha_inicio,
                  evento.data.attributes.fecha_termino
                ) &&
                evento.data.attributes.transmision_vivo &&
                evento.data.attributes.url_video_llamada
              "
            >
              <v-btn
                v-if="evento.data.attributes.transmision_vivo"
                color="amber darken-4"
                depressed
                outlined
                ><a
                  :href="evento.data.attributes.url_video_llamada"
                  target="_blank"
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
                  evento.data.attributes.fecha_inicio,
                  evento.data.attributes.fecha_termino
                ) &&
                evento.data.attributes.transmision_vivo &&
                evento.data.attributes.url_video_llamada
              "
            >
              <v-btn
                v-if="evento.data.attributes.transmision_vivo"
                color="amber darken-4"
                depressed
                outlined
                ><a
                  :href="evento.data.attributes.url_video_llamada"
                  target="_blank"
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

    <v-container v-if="evento.data.attributes.galeria.length > 0">
      <p class="text-2xl lg:text-5xl font-bold mt-16 text-center">
        ¿Cómo se vivió este evento?
      </p>

      <div
        v-for="imagenes in evento.data.attributes.galeria"
        :key="imagenes.id"
        class="my-24"
      >
        <div
          class="grid grid-cols-12 gap-x-8 gap-y-8 my-8"
          v-if="imagenes.imagenes.data"
        >
          <v-img
            :src="`${$config.apiUrl}${imagenes.imagenes.data[0].attributes.url}`"
            class="col-span-3 flex align-center text-center rounded-lg"
            gradient="to top right, rgba(14, 116, 144,.33), rgba(25,32,72, .22)"
            ><p class="text-2xl font-bold text-white">
              {{ imagenes.titulo }}
            </p></v-img
          >
          <div
            v-for="imagen in imagenes.imagenes.data.slice(
              1,
              imagenes.imagenes.data.length
            )"
            :key="imagen.id"
            class="col-span-3"
          >
            <v-img
              :src="`${$config.apiUrl}${imagen.attributes.url}`"
              class="rounded-lg"
            ></v-img>
          </div>
        </div>
      </div>
    </v-container>

    <div
      v-if="evento.data.attributes.colaboradores.length > 0"
      class="py-24 pb-48 mx-auto"
    >
      <p class="text-2xl lg:text-5xl font-bold text-center">
        Nuestros colaboradores
      </p>

      <v-container class="grid grid-cols-12 lg:gap-x-8 gap-y-16 mt-24">
        <div
          v-for="colaborador in evento.data.attributes.colaboradores"
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

export default {
  components: { InscripcionForm },
  methods: {
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
        "imagen_referencia",
        "contenidos",
        "colaboradores",
        "colaboradores.logo",
        "galeria",
        "galeria.imagenes",
        "inscripciones",
      ],
    });

    const evento = await context.$axios.$get(
      `${context.$config.apiUrl}/api/eventos/${context.params.id}?${query}`
    );

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