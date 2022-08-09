<template>
  <div
    class="mt-20 px-[10px] lg:px-[32px]"
    v-if="cursos_recomendados.length > 0"
  >
    <p class="font-bold text-3xl mr-6 mb-6">
      Cursos recomendados, porque viste <span class="text-blue-800">"{{ recomendaciones[0].titulo_curso }}"</span>
    </p>
    <div
      class="flex lg:grid lg:grid-cols-12 lg:gap-y-6 space-x-8 lg:space-x-0 no-scrollbar overflow-x-scroll"
    >
      <div
        v-for="curso in cursos_recomendados"
        :key="curso.id"
        :class="`${col_span}` + ' cursor-pointer'"
        @click="reescribirRecomendaciones(curso)"
      >
        <!-- Reemplazar por slug -->
        <nuxt-link :to="{ name: 'cursos-slug', params: { slug: curso.attributes.slug } }">
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
</template>

<script>
export default {
  data() {
    return {
      cursos_recomendados: [],
      recomendaciones: [],
    };
  },
  // create mounted lifecycle hook to get recomendados item from localStorage if recomendaciones is not empty
  // JSON parse  otherwise set it to an empty array
  async mounted() {
    this.recomendaciones =
      localStorage.getItem("recomendaciones") != null
        ? JSON.parse(localStorage.getItem("recomendaciones"))
        : localStorage.getItem("recomendaciones");
    this.recomendaciones = this.recomendaciones != null ? this.recomendaciones : [];

    // require qs module
    const qs = require("qs");

    // create a query string to filter organizadores where title is equal to all the titles in recomendaciones
    if (this.recomendaciones.length > 0) {
      let query = qs.stringify({
        filters: {
          organizadores: {
            titulo: {
              $eq: this.recomendaciones.map((item) => {
                if (Object.values(item)[2] >= 3) {
                  return Object.keys(item)[2];
                }
              }),
            },
          },
        },
        populate: ["imagen_referencia", "organizadores"],
      });

      // get the cursos from the api using $axios and the query string
      this.cursos_recomendados = await this.$axios
        .$get(`${this.$config.apiUrl}/api/cursos?${query}`)
        .then((response) => {
          return response.data;
        });
    }
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
  computed: {
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
