<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container>
      <div class="lg:py-[50px] py-[0px] px-4">
        <span class="font-bold text-2xl lg:text-4xl text-gray-600 font-weight-light"
          >Aprende junto a Corporación Arauco</span
        >
        <span
          class="block lg:text-6xl text-2xl mb-8 font-weight-bold w-full xl:w-8/12 w-full lg:leading-relaxed text-gray-700"
          >Adquiere nuevas habilidades que son fundamentales para el desarrollo
          personal e intraemprendimiento</span
        >
        <!-- [CURSOS ]-->
        <div class="mt-24">
          <Cursos />
        </div>
        <!-- [CURSOS ]-->
      </div>
    </v-container>
  </div>
</template>

<script>
import Cursos from "~/components/centro_de_medios/Cursos.vue";

export default {
  components: { Cursos },
};
</script>

<style></style>
