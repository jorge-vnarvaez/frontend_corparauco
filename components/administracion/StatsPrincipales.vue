<template>
  <div class="grid grid-cols-12 lg:gap-x-8 gap-y-8">
    <div class="col-span-12 grid grid-cols-12 lg:gap-x-8 gap-y-8">
      <!-- TODOS LOS CURSOS -->
      <div :class="col_span + ' bg-white py-6 px-8 rounded-lg shadow-md'">
        <div class="flex align-center justify-between">
          <span class="block text-gray-400 font-bold">Todos los cursos</span>
          <v-icon color="blue-grey darken-4">mdi-school</v-icon>
        </div>
        <span class="block text-neutral-900 font-black text-3xl">{{
          totalCursos
        }}</span>
      </div>
      <!-- TODOS LOS CURSOS -->

      <!-- TODOS LOS CONTENIDOS-->
      <div :class="col_span + ' bg-white py-6 px-8 rounded-lg shadow-md'">
        <div class="flex align-center justify-between">
          <span class="block text-gray-400 font-bold"
            >Todos los contenidos</span
          >
          <v-icon color="blue-grey darken-4">mdi-folder-play</v-icon>
        </div>
        <span class="block text-neutral-900 font-black text-3xl">{{
          totalContenidos
        }}</span>
      </div>
      <!-- TODOS LOS CONTENIDOS-->

      <!-- EMPRENDIMIENTOS -->
      <div :class="col_span + ' bg-white py-6 px-8 rounded-lg shadow-md'">
        <div class="flex align-center justify-between">
          <span class="block text-gray-400 font-bold">Emprendimientos</span>
          <v-icon color="blue-grey darken-4">mdi-account-multiple</v-icon>
        </div>
        <div class="flex align-center space-x-1">
          <span class="text-neutral-900 font-black text-3xl">{{
            totalEmprendedores
          }}</span>
        </div>
      </div>
      <!-- EMPRENDIMIENTOS -->

      <!-- USUARIOS -->
      <div :class="col_span + ' bg-white py-6 px-8 rounded-lg shadow-md'">
        <div class="flex align-center justify-between">
          <span class="block text-gray-400 font-bold"
            >Usuarios registrados</span
          >
          <v-icon color="black">mdi-account</v-icon>
        </div>
        <div class="flex align-center space-x-1">
          <span class="text-neutral-900 font-black text-3xl">{{
            totalUsuarios
          }}</span>
        </div>
      </div>
      <!-- USUARIOS -->
    </div>

    <!-- EMPRENDIMIENTOS -->
    <stats-emprendimientos :totalEmprendimientos="totalEmprendedores" />
    <!-- EMPRENDIMIENTOS -->

    <!-- PROGRAMAS -->
    <div
      :class="col_span + ' bg-white py-6 px-8 rounded-lg shadow-md h-[400px]'"
    >
      <span class="block text-gray-400 font-bold">Programas</span>

      <!-- PROGRAMAS -->
      <div>
        <chart-svg
          :contain="true"
          :containPadding="10"
          :width="200"
          :height="200"
          class="mt-8"
        >
          <chart-arc
            :bx="150"
            :by="110"
            ox="+"
            oy="-"
            fill="#F44336"
            stroke-width="3"
            stroke="#F44336"
            :startAngle="0"
            :endAngle="start_radius(totalProgramasCorfo)"
            corner-radius="0"
            :ri="80"
            :ro="60"
            :content="totalProgramasCorfo + ` programas.`"
            v-tippy
            class="cursor-pointer"
          />
          <chart-arc
            :bx="150"
            :by="110"
            ox="+"
            oy="-"
            fill="#1e40af"
            stroke-width="3"
            stroke="#1e40af"
            :startAngle="216"
            :endAngle="360"
            corner-radius="0"
            :ri="80"
            :ro="60"
            :content="totalProgramasSercotec + ` programas.`"
            v-tippy
            class="cursor-pointer"
          />
        </chart-svg>

        <div class="flex space-x-8 mt-8">
          <div class="flex align-center space-x-2">
            <div class="block w-6 h-2 bg-[#F44336]"></div>
            <span class="text-sm">Corfo</span>
          </div>

          <div class="flex align-center space-x-2">
            <div class="block w-6 h-2 bg-[#1e40af]"></div>
            <span class="text-sm">Sercotec</span>
          </div>
        </div>
      </div>
    </div>
    <!-- PROGRAMAS -->

    <div class="col-span-12 grid grid-cols-12 lg:gap-x-8 gap-y-8">
      <!-- CRECIMIENTO USUARIOS -->
      <div
        class="col-span-12 xl:col-span-6 bg-white px-8 py-6 rounded-lg shadow-md"
      >
        <span class="block text-gray-400 font-bold"
          >Crecimiento histórico usuarios</span
        >
        <!-- TAXONOMIES -->
        <div class="mt-4 h-12">
          <div class="flex align-center space-x-2">
            <div class="block w-6 h-2 bg-[#1E90FF]"></div>
            <span class="text-sm">Usuarios nuevos</span>
          </div>
        </div>
        <!-- TAXONOMIES -->
        <crecimiento-usuarios />
      </div>
      <!-- CRECIMIENTO USUARIOS -->

      <!-- STATS PROGRAMAS -->
      <div
        class="col-span-12 xl:col-span-6 bg-white px-8 py-6 rounded-lg shadow-md"
      >
        <span class="block text-gray-400 font-bold"
          >Visitas SERCOTEC / CORFO</span
        >
        <div class="h-12">
          <!-- TAXONOMIES -->
          <div class="mt-4">
            <div class="flex align-center space-x-2">
              <div class="block w-6 h-2 bg-[#1E90FF]"></div>
              <span class="text-sm">Visualizaciones sercotec</span>
            </div>
          </div>
          <div class="mt-1">
            <div class="flex align-center space-x-2">
              <div class="block w-6 h-2 bg-[#F44336]"></div>
              <span class="text-sm">Visualizaciones corfo</span>
            </div>
          </div>
          <!-- TAXONOMIES -->
        </div>

        <stats-programas />
      </div>
      <!-- STATS PROGRAMAS -->
    </div>

    <!-- TABLA LOGS -->
    <div class="col-span-12">
      <tabla-logs />
    </div>
    <!-- TABLA LOGS -->
  </div>
</template>

<script>
import moment from "moment";
import StatsEmprendimientos from "./StatsEmprendimientos.vue";
import StatsProgramas from "./StatsProgramas.vue";
import CrecimientoUsuarios from "./CrecimientoUsuarios.vue";
import TablaLogs from "./TablaLogs.vue";
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartArc from "../PrimeSvg/ChartArc.vue";

export default {
  components: {
    StatsEmprendimientos,
    StatsProgramas,
    CrecimientoUsuarios,
    TablaLogs,
    ChartSvg,
    ChartArc,
  },
  props: [
    "totalCursos",
    "totalContenidos",
    "totalEmprendedores",
    "totalUsuarios",
    "totalProgramasCorfo",
    "totalProgramasSercotec",
  ],
  mounted() {
    moment.locale("es");
  },
  methods: {
    start_radius(total) {
      let corfo = this.totalProgramasCorfo;
      let sercotec = this.totalProgramasSercotec;

      let total_percent = corfo + sercotec;

      let percent_angle = (total * 360) / total_percent;

      return percent_angle;
    },
  },
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
          return "col-span-4";
      }
    },
  },
};
</script>

<style></style>
