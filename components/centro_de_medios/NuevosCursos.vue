<template>
  <div class="px-[10px] lg:px-[32px]">
    <nuevos-cursos-component />
  </div>
</template>

<script>

import NuevosCursosComponent from './NuevosCursosComponent.vue';

export default {
  components: { NuevosCursosComponent },
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
