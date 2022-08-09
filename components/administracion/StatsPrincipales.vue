<template>
  <div class="grid grid-cols-12 lg:gap-x-8 gap-y-8">
    <!-- TODOS LOS CURSOS -->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Todos los cursos</span>
      <div class="flex align-center space-x-1">
        <v-icon color="black" large>mdi-school</v-icon>
        <span class="block text-neutral-900 font-black text-3xl">{{
          totalCursos
        }}</span>
      </div>
    </div>
    <!-- TODOS LOS CURSOS -->

    <!-- TODOS LOS CONTENIDOS-->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Todos los contenidos</span>
      <span class="block text-neutral-900 font-black text-3xl">{{
        totalContenidos
      }}</span>
    </div>
    <!-- TODOS LOS CONTENIDOS-->

    <!-- EMPRENDIMIENTOS -->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Emprendimientos</span>
      <div class="flex align-center space-x-1">
        <v-icon color="black" large>mdi-account-multiple</v-icon>
        <span class="text-neutral-900 font-black text-3xl">{{
          totalEmprendedores
        }}</span>
      </div>
    </div>
    <!-- EMPRENDIMIENTOS -->

    <!-- USUARIOS -->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Usuarios registrados</span>
      <div class="flex align-center space-x-1">
        <v-icon color="black" large>mdi-account</v-icon>
        <span class="text-neutral-900 font-black text-3xl">{{
          totalUsuarios
        }}</span>
      </div>
    </div>
    <!-- USUARIOS -->

    <!-- PROGRAMAS CORFO -->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Programas CORFO</span>
      <span class="block text-neutral-900 font-black text-3xl">{{
        totalProgramasCorfo
      }}</span>
    </div>
    <!-- PROGRAMAS CORFO  -->

    <!-- PROGRAMAS CORFO -->
    <div
      :class="
        `${col_span}` + ' row-span-1 bg-white py-6 px-8 rounded-lg shadow-md'
      "
    >
      <span class="block text-gray-400 font-bold">Programas SERCOTEC</span>
      <span class="block text-neutral-900 font-black text-3xl">{{
        totalProgramasSercotec
      }}</span>
    </div>
    <!-- PROGRAMAS CORFO  -->


    <!-- STATS EMPRENDIMIENTOS -->
    <stats-emprendimientos />

    <!-- STATS EMPRENDIMIENTOS -->
  </div>
</template>

<script>

import StatsEmprendimientos from './StatsEmprendimientos.vue'

export default {
  components: {
    StatsEmprendimientos
  },
  props: [
    "totalCursos",
    "totalContenidos",
    "totalEmprendedores",
    "totalUsuarios",
    "totalProgramasCorfo",
    "totalProgramasSercotec",
  ],
  computed: {
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-6";
        case "lg":
          return "col-span-3";
        case "xl":
          return "col-span-2";
        default:
          return "col-span-3";
      }
    },
  },
};
</script>

<style></style>
