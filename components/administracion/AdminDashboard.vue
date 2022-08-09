<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <div
      class="container flex flex-col py-[20px] lg:py-[50px]"
      v-if="$fetchState.pending == false"
    >
      <!-- TABS -->
      <div class="flex mb-8">
        <div
          v-for="tab in tabs"
          :key="tab.id"
          :class="
            `${tab_open == tab.id ? 'bg-blue-700' : ''}` +
            ' cursor-pointer bg-gray-100 p-2'
          "
          @click="tab_open = tab.id"
        >
          <v-tooltip right>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                :color="tab_open == tab.id ? 'white' : 'primary'"
                dark
                v-bind="attrs"
                v-on="on"
                large
              >
                {{ tab.icon }}
              </v-icon>
            </template>
            <span>{{ tab.label }}</span>
          </v-tooltip>
        </div>
      </div>
      <!-- TABS -->

      <!-- STATS PRINCIPALES -->
      <stats-principales
        v-if="tab_open == 0"
        :totalCursos="totalCursos"
        :totalContenidos="totalContenidos"
        :totalEmprendedores="totalEmprendedores"
        :totalUsuarios="totalUsuarios"
        :totalProgramasCorfo="totalProgramasCorfo"
        :totalProgramasSercotec="totalProgramasSercotec"
      />
      <!-- STATS PRINCIPALES -->

      <!-- STATS CENTRO DE MEDIOS -->
      <stats-centro-medios
        v-if="tab_open == 1"
        :defaultContenidosData="contenidosData"
        :defaultOrganizadores="organizadores"
        :defaultFormatos="formatos"
      />
      <!-- STATS CENTRO DE MEDIOS -->

      <!-- STATS CURSOS -->
      <stats-cursos v-if="tab_open == 2" :defaultCursosData="cursosData" :defaultOrganizadores="organizadores" />
      <!-- STATS CURSOS -->

      <!-- UBICACION GEOGRAFICA USUARIOS -->
      <ubicacion-geografica-usuarios v-if="tab_open == 3" :defaultUsersData="usersData" />
      <!-- UBICACION GEOGRAFICA USUARIOS -->
    </div>
  </div>
</template>

<script>
import StatsPrincipales from "./StatsPrincipales.vue";
import StatsCentroMedios from "./StatsCentroMedios.vue";
import StatsCursos from "./StatsCursos.vue";
import UbicacionGeograficaUsuarios from "./UbicacionGeograficaUsuarios.vue";

export default {
  components: {
    StatsPrincipales,
    StatsCentroMedios,
    StatsCursos,
    UbicacionGeograficaUsuarios,
  },
  data() {
    return {
      tab_open: 0,
      tabs: [
        { id: 0, label: "Estadísticas", icon: "mdi-chart-line" },
        { id: 1, label: "Centro de medios", icon: "mdi-youtube" },
        { id: 2, label: "Cursos", icon: "mdi-school" },
        { id: 3, label: "Ubicación geográfica", icon: "mdi-map" },
      ],
      contenidosData: [],
      totalContenidos: 0,
      porcentajeContenidosNuevos: 0,
      cursosData: [],
      totalCursos: 0,
      organizadores: [],
      formatos: [],
      usersData: [],
      totalUsuarios: 0,
      emprendedoresData: [],
      totalEmprendedores: 0,
      programasData: [],
      totalProgramasCorfo: 0,
      totalProgramasSercotec: 0,
    };
  },
  async fetch() {
    // Obtener organizadores para segmentar
    await this.$store.dispatch("organizadores/loadOrganizadores");

    this.organizadores = this.$store.getters["organizadores/getOrganizadores"];

    await this.$store.dispatch("formatos/loadFormatos");

    this.formatos = this.$store.getters["formatos/getFormatos"];

    // Obtener data contenidos
    const qs = require("qs");

    const query_organizador = qs.stringify({
      populate: ["organizadores", "formato"],
    });

    const query_created_at = qs.stringify({
      where: {
        created_at: {
          $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
          $lte: new Date(
            new Date().getFullYear(),
            new Date().getMonth() + 1,
            0
          ),
        },
      },
    });

    const query_emprendimientos = qs.stringify({
      pagination: {
        limit: 70
      }
    })

    const query_programas = qs.stringify({
     populate: ['organizaciones']
    });

    // [CONTENIDOS]
    this.contenidosData = await fetch(
      `${this.$config.apiUrl}/api/contenidos?${query_organizador}`
    ).then((res) => res.json());

    let contenidosNuevosData = await fetch(
      `${this.$config.apiUrl}/api/contenidos?${query_created_at}`
    ).then((res) => res.json());

    // Obtener total contenidos
    this.totalContenidos = this.contenidosData.data.length;

    // Obtener porcentaje contenidos nuevos
    this.porcentajeContenidosNuevos =
      (contenidosNuevosData.data.length / this.totalContenidos) * 100;

    // [CURSOS]
    this.cursosData = await fetch(
      `${this.$config.apiUrl}/api/cursos?${query_organizador}`
    ).then((res) => res.json());

    this.totalCursos = this.cursosData.data.length;

    // [USUARIOS]
    this.usersData = await fetch(`${this.$config.apiUrl}/api/users`).then(
      (res) => res.json()
    );

    this.usersData = this.usersData.filter((user) => {
      return user.is_admin == false || user.is_admin == null;
    });

    this.totalUsuarios = this.usersData.length;



    // [EMPRENDEDORES]
    this.emprendedoresData = await fetch(
      `${this.$config.apiUrl}/api/empresas?${query_emprendimientos}`
    ).then((res) => res.json());

    this.totalEmprendedores = this.emprendedoresData.data.length;


    // [PROGRAMAS]
    this.programasData = await fetch(
      `${this.$config.apiUrl}/api/programas?${query_programas}`
    ).then((res) => res.json());


    // [PROGRAMAS CORFO]
    // Filter programas corfo
    this.totalProgramasCorfo = this.programasData.data.filter((programa) => {
      return programa.attributes.organizaciones.data[0].attributes.nombre == "Corfo";
    }).length;

    // [PROGRAMAS SERCOTEC]
    // Filter programas sercotec
    this.totalProgramasSercotec = this.programasData.data.filter((programa) => {
      return programa.attributes.organizaciones.data[0].attributes.nombre == "Sercotec";
    }).length;

  },
};
</script>

<style></style>
