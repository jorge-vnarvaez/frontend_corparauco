<template>
  <div class="mt-20 px-[10px] lg:px-[32px]" v-if="organizadores.length > 0">
    <p class="font-bold text-3xl mr-6 mb-6">Categorías recomendadas para tí</p>
    <div
      class="flex lg:grid lg:grid-cols-12 lg:gap-y-6 lg:gap-x-8 space-x-8 lg:space-x-0 no-scrollbar overflow-x-scroll"
    >
      <div
        v-for="(organizador, index) in organizadores"
        :key="index"
        class="cursor-pointer border border-gray-400 px-4 w-[210px] lg:w-full lg:col-span-2"
      >
        <nuxt-link
          :to="{
            name: 'cursos-organizador-id',
            params: { id: organizador.id_organizador },
          }"
        >
          <p class="mt-4 font-bold text-neutral-900 text-center">
            {{ Object.keys(organizador)[2] }}
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
      organizadores: [],
    };
  },
  mounted() {
    let recomendaciones =
      localStorage.getItem("recomendaciones") != null
        ? JSON.parse(localStorage.getItem("recomendaciones"))
        : localStorage.getItem("recomendaciones");

    if (recomendaciones == null) {
      this.organizadores = [];
    } else {
      this.organizadores = recomendaciones;
    }

    // iterate over this.organizadores an get the key of each index
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
}</style>
