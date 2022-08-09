<template>
  <div class="bg-gradient-to-b from-slate-50 to-white py-[20px] lg:py-[50px] px-4">
    <!-- HEADER -->
    <div class="flex flex-col lg:flex-row justify-between align-center">
      <v-img
        src="/illustration_documentation.svg"
        class="w-[340px] h-[400px] lg:w-[700px] lg:h-[400px]"
        contain
      ></v-img>

      <div class="flex flex-col">
        <span class="font-bold text-base lg:text-4xl text-gray-700">Manual de usuario</span>
        <span class="block w-full lg:w-96 my-6 text-base lg:text-xl"
          >Aprende a gestionar los datos e información de corparauco.cl
        </span>
      </div>
    </div>
    <!-- HEADER -->


   <!-- TUTORIALES -->
    <div class="max-w-screen-xs mt-8">
        <v-container>
            <span class="font-bold text-base lg:text-3xl text-gray-700">Tutoriales</span>
            <grilla-tutoriales />
        </v-container>
    </div>
   <!-- TUTORIALES -->
  </div>
</template>

<script>

import GrillaTutoriales from '~/components/manual/GrillaTutoriales.vue';

export default {
    components: { GrillaTutoriales },
};
</script>

<style></style>
