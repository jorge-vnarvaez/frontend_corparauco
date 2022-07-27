<template>
  <div>
    <!-- [NUEVOS CURSOS]-->
    <NuevosCursos />
    <!-- [NUEVOS CURSOS]-->

    <!-- [CONTINUAR VIENDO CURSOS]-->
    <CursosRecientes :cursos="cursos" />
    <!-- [CONTINUAR VIENDO CURSOS]-->

    <!-- [RECOMENDACIONES]-->
    <CursosRecomendados />
    <!-- [RECOMENDACIONES]-->

    <div class="mt-20 px-[10px] lg:px-[32px]" v-if="cursos.length > 0">
      <p class="font-bold text-3xl mr-6 mb-6">Cursos que te pueden interesar</p>
      <div
        class="flex lg:grid lg:grid-cols-12 lg:gap-y-6 space-x-8 lg:space-x-0 no-scrollbar overflow-x-scroll"
      >
        <div
          v-for="curso in cursos"
          :key="curso.id"
          :class="`${col_span}` + ' cursor-pointer'"
          @click="reescribirRecomendaciones(curso)"
        >
          <!-- Reemplazar por slug -->
          <nuxt-link :to="{ name: 'cursos-id', params: { id: curso.id } }">
            <v-img
              v-if="curso.attributes.imagen_referencia.data"
              width="200"
              height="180"
              class="rounded-xl shadow-xl"
              :src="`${$config.apiUrl}${curso.attributes.imagen_referencia.data.attributes.url}`"
            ></v-img>
            <p class="mt-4 font-bold text-blue-800 w-8/12">
              {{ curso.attributes.titulo }}
            </p>
          </nuxt-link>
        </div>
      </div>
    </div>

    <!-- [ORGANIZADORES RECOMENDADOS] -->
    <OrganizadoresRecomendados />
    <!-- [ORGANIZADORES RECOMENDADOS] -->
  </div>
</template>

<script>
import NuevosCursos from "./NuevosCursos.vue";
import CursosRecientes from "./CursosRecientes.vue";
import CursosRecomendados from "./CursosRecomendados.vue";
import OrganizadoresRecomendados from "./OrganizadoresRecomendados.vue";

export default {
  components: {
    NuevosCursos,
    CursosRecientes,
    CursosRecomendados,
    OrganizadoresRecomendados,
  },
  data() {
    return {
      cursos: [],
      loaded: false,
    };
  },
  methods: {
    reescribirRecomendaciones(curso) {
      let recomendaciones =
        localStorage.getItem("recomendaciones") != null
          ? JSON.parse(localStorage.getItem("recomendaciones"))
          : localStorage.getItem("recomendaciones");

      recomendaciones = recomendaciones != null ? recomendaciones : [];

      if (recomendaciones.length == 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          recomendaciones.push({
            id_organizador: curso.attributes.organizadores.data[0].id,
            titulo_curso: curso.attributes.titulo,
            [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
          });
        }
      }

      if (recomendaciones.length > 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          let index = recomendaciones.some((item) => {
            return (
              curso.attributes.organizadores.data[0].attributes.titulo in item
            );
          });

          if (index == false) {
            recomendaciones.push({
              id_organizador: curso.attributes.organizadores.data[0].id,
              titulo_curso: curso.attributes.titulo,
              [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
            });
          } else {
            let index = recomendaciones.find((item) => {
              return (
                curso.attributes.organizadores.data[0].attributes.titulo in item
              );
            });

            if (index) {
              index[curso.attributes.organizadores.data[0].attributes.titulo]++;
            }
          }
        }
      }

      localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
    },
  },
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      populate: [
        "imagen_referencia",
        "modulos",
        "modulos.contenidos",
        "organizadores",
      ],
    });

    this.cursos = await this.$axios
      .$get(`${this.$config.apiUrl}/api/cursos?${query}`)
      .then((res) => {
        return res.data;
      });
  },
  computed: {
    session() {
      return this.$store.getters["session/getUserStatus"];
    },
    // created a computed property that switch each $vuetify breakpoint name and assign col-span value starting at 2 increased
    // by 2 for each breakpoint.
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-4";
        case "sm":
          return "col-span-4";
        case "md":
          return "col-span-4";
        case "lg":
          return "col-span-3";
        case "xl":
          return "col-span-2";
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
</style>
