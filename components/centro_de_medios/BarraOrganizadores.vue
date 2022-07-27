<template>
  <div class="bg-white border border-gray-300 flex justify-center px-[10px] lg:px-[32px]">
    <div class="container flex justify-center w-full space-x-8 no-scrollbar overflow-x-scroll">
      <div
        v-for="organizador in organizadores.data"
        :key="organizador.id"
        v-show="cursos(organizador.id) > 0"
      >
        <nuxt-link
          :to="{
            name: 'cursos-organizador-id',
            params: { id: organizador.id },
          }"
        >
          <span class="text-gray-700">{{ organizador.attributes.titulo }}</span>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // create a data object that will be available to the view as this.$organizadores
  data() {
    return {
      organizadores: [],
    };
  },
  // create activated function that will call fetch function every 3 minutes
  activated() {
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch();
    }
  },
  // create async fetch function to get data from API organizadores and save it to
  // this.$organizadores
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["cursos"],
    });

    const response = await this.$axios.get(
      `${this.$config.apiUrl}/api/organizadores?${query}`
    );
    this.organizadores = response.data;
  },
  // create a computed property that return for each organizador the number of cursos
  // that have the same organizador id
  computed: {
    cursos() {
      return (id) => {
        return this.organizadores.data.filter((organizador) => {
          return organizador.id === id;
        })[0].attributes.cursos.data.length;
      };
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
