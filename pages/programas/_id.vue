<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container class="mb-24 py-16" v-if="programa">
      <div>
        <div class="flex lg:flex-row flex-col align-center justify-between">
          <p class="text-2xl lg:text-6xl font-bold text-gray-700">
            {{ programa.attributes.titulo }}
          </p>
          <v-btn
            v-if="programa.attributes.pagina_programa"
            class="py-3"
            color="blue-grey darken-4"
            ><v-icon color="white">mdi-web</v-icon
            ><a class="ml-2 py-4" :href="programa.attributes.pagina_programa" target="_blank"
              ><span class="text-white">Ver página web del programa</span></a
            ></v-btn
          >
        </div>
        <p class="text-2xl font-light leading-relaxed mt-12 text-gray-600">
          {{ programa.attributes.descripcion }}
        </p>
      </div>

      <div
        class="grid grid-cols-12 mt-20 gap-x-8"
        v-if="programa.attributes.secciones"
      >
        <div
          v-for="section in programa.attributes.secciones"
          :key="section.id"
          class="flex flex-col col-span-12 lg:col-span-6"
        >
          <span class="text-xl lg:text-3xl font-bold text-gray-700">{{
            section.titulo
          }}</span>
          <span class="text-lg lg:text-2xl my-16 text-gray-600">{{
            section.texto
          }}</span>
        </div>
        <!-- <div class="col-span-6">
        <v-img
          :width="width"
          v-if="programa.attributes.featured_image.data"
          :src="`${$config.apiUrl}${programa.attributes.featured_image.data.attributes.url}`"
          class="rounded-tr-xl rounded-bl-xl shadow-md h-full"
        ></v-img>
      </div> -->
      </div>
    </v-container>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["imagen_referencia", "secciones"],
    });

    const programa = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/programas/${context.params.id}?${query}`
      )
      .then((res) => res.data);
    return { programa };
  },
  computed: {
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 320;
        case "sm":
          return 320;
        case "md":
          return 400;
        case "lg":
          return 800;
        case "xl":
          return 800;
        default:
          return 300;
      }
    },
  },
};
</script>

<style>
</style>