<template>
  <div class="mt-10" v-if="cursosRecientesData">
    <p class="font-bold text-3xl mr-6 mb-6 px-[10px] lg:px-[32px]">
      Continuar viendo
    </p>
    <div
      class="flex no-scrollbar overflow-x-scroll relative px-[0px] lg:px-[32px] bg-red-000"
    >
      <div
        class="absolute left-0 z-20 h-full flex align-center"
        v-if="continuarViendoInitialIndex > 0 && !$vuetify.breakpoint.mobile"
      >
        <div
          class="bg-neutral-900 h-12 w-12 outline-2 outline-white flex justify-center align-center rounded-full cursor-pointer"
        >
          <v-icon @click="continuarViendoInitialIndex--" color="white"
            >mdi-chevron-left</v-icon
          >
        </div>
      </div>

      <div class="flex space-x-8">
        <nuxt-link
          :to="{ name: 'cursos-slug', params: { slug: curso.attributes.slug } }"
          v-for="curso in num_cursos()"
          :key="curso.id"
          :class="
            `${width}` + ' cursor-pointer hover:bg-slate-300 bg-slate-200'
          "
        >
          <div class="flex flex-col lg:flex-row">
            <div>
              <v-img
                v-if="curso.attributes.imagen_referencia.data"
                width="230"
                height="100%"
                class="shadow-xl"
                :src="`${$config.apiUrl}${curso.attributes.imagen_referencia.data.attributes.url}`"
              ></v-img>
            </div>
            <div class="flex flex-col justify-between">
              <div class="p-4 h-32">
                <p
                  v-if="curso.attributes.titulo.length > 40"
                  class="text-xs mb-2"
                >
                  {{ curso.attributes.titulo.slice(0, 38) }} ...
                </p>
                <p
                  v-if="curso.attributes.titulo.length < 25"
                  class="text-xs mb-2"
                >
                  {{ curso.attributes.titulo }}
                </p>

                <p class="font-bold text-blue-800 text-md w-10/12">
                  {{ indexUltimoContenido(curso.id) }}.
                  {{ getModulosRecientes(curso.id).titulo }}
                </p>
              </div>
              <div class="px-4">
                <p
                  v-if="getModulosRecientes(curso.id).es_video"
                  class="text-xs"
                >
                  Video
                </p>
                <p
                  v-if="!getModulosRecientes(curso.id).es_video"
                  class="text-xs"
                >
                  Lectura
                </p>
              </div>
              <v-progress-linear
                :value="
                  (contenidosFinalizados(curso.id) * 100) /
                  totalContenidos(curso.id)
                "
                :buffer-value="100"
                height="10"
              ></v-progress-linear>
            </div>
          </div>
        </nuxt-link>
      </div>
      <div
        class="absolute right-0 h-full flex align-center"
        v-if="
          continuarViendoInitialIndex < cursosRecientes.length - 2 &&
          num_cursos().length >= 1 &&
          !$vuetify.breakpoint.mobile
        "
      >
        <v-icon
          @click="continuarViendoInitialIndex++"
          class="bg-neutral-900 h-12 w-12 p-2 rounded-full cursor-pointer border border-white"
          color="white"
          >mdi-chevron-right</v-icon
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["cursos"],
  data() {
    return {
      continuarViendoInitialIndex: 0,
      cursosRecientesData: [],
    };
  },
  mounted() {
    this.cursosRecientesData = JSON.parse(
      localStorage.getItem("cursosVisitados")
    );
  },
  methods: {
    getModulosRecientes(curso_id) {
      const ultimoModuloVisitado = this.cursosRecientesData.filter(
        (curso) => curso.id_curso == curso_id
      )[0].ultimoModuloVisitado;

      const ultimoContenido = this.cursosRecientesData.filter(
        (curso) => curso.id_curso == curso_id
      )[0].ultimoContenido;

      return this.cursos
        .filter((curso) => curso.id == curso_id)
        .map(
          (curso) =>
            curso.attributes.modulos.filter(
              (modulo) => modulo.id == ultimoModuloVisitado
            )[0]
        )[0]
        .contenidos.filter((contenido) => contenido.id == ultimoContenido)[0];
    },
    indexUltimoContenido(id) {
      return this.cursosRecientesData.filter((curso) => curso.id_curso == id)[0]
        .indexUltimoContenido;
    },
    // create a method function who receive a curso_id and return the total of contenidos of all modulos of that curso
    totalContenidos(id) {
      const totalContenidos = this.cursos
        .filter((curso) => curso.id == id)
        .map((curso) =>
          curso.attributes.modulos.map((modulo) => modulo.contenidos.length)
        )[0]
        .reduce((a, b) => a + b, 0);
      return totalContenidos;
    },
    // creaye a method function who get contenidosFinalizados item from localStorage and return the total of contenidos finalizados
    // if the item is not in localStorage, return 0
    contenidosFinalizados(id) {
      const contenidosFinalizados = JSON.parse(
        localStorage.getItem("contenidosFinalizados")
      );
      if (contenidosFinalizados) {
        return contenidosFinalizados.filter(
          (contenido) => contenido.id_curso == id
        ).length;
      } else {
        return 0;
      }
    },
    num_cursos() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return this.cursosRecientes;
        case "sm":
          return this.cursosRecientes;
        case "md":
          return this.cursosRecientes.slice(
            this.continuarViendoInitialIndex,
            this.continuarViendoInitialIndex + 2
          );
        case "lg":
          return this.cursosRecientes.slice(
            this.continuarViendoInitialIndex,
            this.continuarViendoInitialIndex + 2
          );
        case "xl":
          return this.cursosRecientes.slice(
            this.continuarViendoInitialIndex,
            this.continuarViendoInitialIndex + 3
          );
        default:
          return this.cursosRecientes.slice(
            this.continuarViendoInitialIndex,
            this.continuarViendoInitialIndex + 2
          );
      }
    },
  },
  computed: {
    cursosRecientes() {
      return this.cursos.filter((curso) =>
        this.cursosRecientesData
          .map((curso) => curso.id_curso)
          .includes(curso.id)
      );
    },
    // create a computed property switch each $vuetify breakpoints
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "w-[200px]";
        case "sm":
          return "w-[900px]";
        case "md":
          return "w-[600px]";
        case "lg":
          return "w-[800px]";
        case "xl":
          return "w-[550px]";
        default:
          return "w-[900px]";
      }
    },
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

/* .v-progress-linear {
  width: 75%;
} */
</style>
