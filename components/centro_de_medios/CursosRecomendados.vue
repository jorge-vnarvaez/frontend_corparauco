<template>
  <div v-if="cursos_recomendados.length > 0" class="mt-20">
    <div class="row">
      <div class="col-12">
        <span class="font-bold text-3xl">Recomendados para ti</span>
        {{ cursos_recomendados }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cursos_recomendados: [],
    };
  },
  // create mounted lifecycle hook to get recomendados item from localStorage if recomendaciones is not empty
  // JSON parse  otherwise set it to an empty array
  async mounted() {
    let recomendaciones =
      localStorage.getItem("recomendaciones") != null
        ? JSON.parse(localStorage.getItem("recomendaciones"))
        : localStorage.getItem("recomendaciones");
    recomendaciones = recomendaciones != null ? recomendaciones : [];

    console.log(recomendaciones);

    // require qs module
    const qs = require("qs");

    // create a query string to filter organizadores where title is equal to all the titles in recomendaciones
    if (recomendaciones.length > 0) {

      recomendaciones.map((item, index) => {
        console.log(Object.values(item)[0]);
      })

      let query = qs.stringify({
        filters: {
          organizadores: {
            titulo: {
              $eq: recomendaciones.map((item) => {
                if(Object.values(item)[0] >= 2) {
                   return Object.keys(item)[0];
                } 
              }),
            },
          },
        },
      });

      // get the cursos from the api using $axios and the query string
      this.cursos_recomendados = await this.$axios
        .$get(`${this.$config.apiUrl}/api/cursos?${query}`)
        .then((response) => {
          return response.data;
        });
    }
  },
};
</script>

<style></style>
