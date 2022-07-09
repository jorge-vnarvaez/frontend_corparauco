<template>
  <div class="bg-gradient-to-b from-slate-50 to-white px-2">
    <v-container class="grid grid-cols-12 my-12 lg:gap-x-8">
      <div
        class="
          overflow-x-scroll
          no-scrollbar
          flex
          lg:flex-col
          col-span-12
          lg:col-span-2
        "
      >
        <div v-for="menu in menus" :key="menu.id">
          <div
            @click="tab = menu.id"
            :class="
              'px-5 py-3 flex items-center' +
              `${menu.id == tab ? ' font-semibold bg-gray-200' : ''}` +
              ` hover:bg-gray-100 mb-0 rounded-lg cursor-pointer`
            "
          >
            <v-icon class="mr-2">{{ menu.icon }}</v-icon>

            <span>{{ menu.label }}</span>
          </div>
        </div>
      </div>

      <!-- center -->
      <div class="col-span-12 lg:col-span-6">
        <div
          class="
            bg-white
            px-6
            py-6
            rounded-lg
            shadow-sm
            border border-gray-200
            mb-8
            flex
            align-center
            items-center
          "
          v-if="user"
        >
          <div class="ml-6">
            <p class="mb-0 text-xl">Bienvenid@,</p>
            <p class="text-xl lg:text-2xl font-bold">
              {{ user.data.nombre }}
              {{ user.data.apellidoPaterno }}
              {{ user.data.apellidoMaterno }}
            </p>
          </div>
        </div>

        <div v-if="tab == 0">
          <inicio />
        </div>

        <!-- <div v-if="tab == 1">
          <p>Reciente</p>
        </div> -->

        <div v-if="tab == 3">
          <eventos />
        </div>

        <div v-if="tab == 4">
          <programas-corfo />
        </div>

        <div v-if="tab == 5">
          <programas-sercotec />
        </div>

        <div v-if="tab == 6">

        </div>

        <div v-if="tab == 7">
          <mis-cursos />
        </div>

         <div v-if="tab == 8">
          <mis-eventos :eventos="user.data.eventos" />
        </div>
      </div>

      <!-- <div class="col-span-4"> 
        <noticias />

      </div> -->
    </v-container>
  </div>
</template>

<script>
import EmptySection from "../components/home/EmptySection.vue";
import Eventos from "../components/home/Eventos.vue";
import Inicio from "../components/home/Inicio.vue";
import MisProgramas from "../components/home/MisProgramas.vue";
import MisCursos from "../components/home/MisCursos.vue";
import MisEventos from "../components/home/MisEventos.vue";
import ProgramasCorfo from "../components/home/ProgramasCorfo.vue";
import ProgramasSercotec from "../components/home/ProgramasSercotec.vue";
import Noticias from '../components/home/Noticias.vue';

export default {
  layouts: "home",
  components: {
    Eventos,
    ProgramasCorfo,
    ProgramasSercotec,
    EmptySection,
    Inicio,
    MisProgramas,
    MisCursos,
    MisEventos,
    Noticias,
  },
  middleware: "auth",
  async mounted() {
    this.user = await this.$axios.get(
      `${this.$config.apiUrl}/api/users/${this.$cookies.get("user")}?populate=*`
    );
  },
  data() {
    return {
      user: null,
      tab: 0,
      options: [
        { id: 0, label: "Inicio", icon: "mdi-home-outline" },
        // { id: 1, label: "Reciente", icon: "mdi-trending-up" },
        // { id: 2, label: "Cursos", icon: "mdi-book-education-outline" },
        { id: 3, label: "Eventos", icon: "mdi-calendar-blank-outline" },
      ],
      programas: [
        { id: 4, label: "CORFO", icon: "" },
        { id: 5, label: "SERCOTEC", icon: "" },
      ],
      user_menus: [
        // { id: 6, label: "Mis Programas" },
        // { id: 7, label: "Mis Cursos" },
        { id: 8, label: "Mis Eventos" },
        // { id: 9, label: "Mis Empresas" },
      ],
    };
  },
  computed: {
    menus() {
      return this.options.concat(this.programas, this.user_menus);
    },
  },
};
</script>

<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>