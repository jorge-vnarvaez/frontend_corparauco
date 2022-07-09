<template>
  <div class="mt-8">
    <div class="flex space-x-8 no-scrollbar overflow-x-scroll">
      <div
        v-for="curso in cursos"
        :key="curso.id"
        class="cursor-pointer"
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
          <p class="mt-4 font-bold text-blue-800 w-10/12">
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
      cursos: [],
    };
  },
  async fetch() {
    this.cursos = await this.$axios
      .$get(`${this.$config.apiUrl}/api/cursos?populate=*`)
      .then((res) => res.data);
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