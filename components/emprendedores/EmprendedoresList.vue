<template>
  <v-container
    v-if="empresas"
    class="grid grid-cols-12 lg:gap-x-20 gap-y-24 mb-24"
  >
    <nuxt-link
      v-for="(empresa, index) in empresas"
      :key="index"
      :class="`
        rounded-2xl
        ${col_span}
        bg-white
        pa-10
        text-gray-900 text-decoration-none
        border
        border-gray-50
        hover:shadow-md hover:border hover:border-gray-50
      `"
      :to="{ name: 'emprendedores-slug', params: { slug: empresa.attributes.slug } }"
    >
      <v-img
        v-if="empresa.attributes.imagen_referencia.data"
        :src="`${$config.apiUrl}${empresa.attributes.imagen_referencia.data.attributes.url}`"
        class="h-80 rounded-2xl shadow-md border border-gray-50"
      ></v-img>
      <v-img v-if="!empresa.attributes.imagen_referencia.data" src="/emprendimiento_no_disponible.jpeg" class="h-80 rounded-2xl border border-gray-50"> 

      </v-img>
      <div class="text-gray-900">
        <p class="mt-8 mb-4 text-3xl font-bold h-4 text-gray-700">
          {{ empresa.attributes.nombre }}
        </p>
      </div>
      <div class="flex items-center mt-32">
        <p class="uppercase text-2xl text-gray-900 mb-0 mr-1 font-semibold text-gray-600">
          emprendimiento
        </p>
        <v-icon dense>mdi-arrow-top-right-thick</v-icon>
      </div>
    </nuxt-link>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    empresas: [],
  }),
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      pagination: {
        start: 0,
        limit: 80
      },
      populate: [
        "logo",
        "galeria",
        "imagen_referencia",
        "usuarios",
        "usuarios.foto_perfil",
        "servicios.galeria",
        "emprendedores",
        "emprendedores.foto_perfil",
      ],
    });

    const res = await fetch(`${this.$config.apiUrl}/api/empresas?${query}`).then(
      (res) => res.json()
    );

    this.empresas = res.data;
  },
  computed: {
    col_span() {
      switch(this.$vuetify.breakpoint.name) {
        case 'xs': return 'col-span-12'
        case 'sm': return 'col-span-6'
        case 'md': return 'col-span-6'
        case 'lg': return 'col-span-6'
        case 'xl': return 'col-span-4'
        default: return 'col-span-6'
      }
    }
  }
};
</script>

<style>
</style>