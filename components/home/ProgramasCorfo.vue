<template>
  <div class="grid grid-cols-12 gap-y-8" v-if="programas.data">
    <div
      class="col-span-12 px-8 py-8 bg-white shadow-md rounded-lg border border-gray-200"
      v-for="programa in programas.data"
      :key="programa.id"
    >
      <div class="flex justify-between items-start">
        <p class="text-2xl font-bold">{{ programa.attributes.titulo }}</p>
      </div>
      <div class="flex flex-col justify-between">
        <p class="text-justify flex items-start text-lg text-gray-600">
          {{ programa.attributes.descripcion }}
        </p>
        <nuxt-link :to="{ name: 'programas-slug', params: { slug: programa.attributes.slug } }" target="_blank" class="flex justify-end"
          ><v-btn class="text-gray-900 mt-8" outlined>Más información <v-icon>mdi-arrow-top-right-thick</v-icon></v-btn></nuxt-link
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      programas: [],
    };
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      filters: {
        organizaciones: {
          nombre: {
            $eq: "Corfo",
          },
        },
      },
    });

    this.programas = await fetch(
      `${this.$config.apiUrl}/api/programas?${query}`
    ).then((res) => res.json());
  },
};
</script>

<style>
</style>