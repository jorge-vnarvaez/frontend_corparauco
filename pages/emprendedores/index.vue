<template>
  <div v-if="pagina" class="bg-gradient-to-br from-green-200 to-white">
    <div v-if="pagina.header">
      <v-img
        height="60vh"
        position="center"
        v-if="pagina.header.imagen.data"
        class="
          object-scale-down
          overflow-hidden
          h-full
          flex
          items-center
          justify-center
          px-8
        "
        :src="`${$config.apiUrl}${pagina.header.imagen.data.attributes.url}`"
        gradient="to top right, rgba(14, 116, 144,.33), rgba(25,32,72,.22)"
      >
        <v-img
          src="/logo_dinamizawhite.svg"
          class="w-full h-24"
          contain
        ></v-img>
      </v-img>
    </div>

    <v-container
      class="
        px-8
        lg:px-0
        my-[50px]
        lg:my-[150px]
        grid grid-cols-12
        lg:gap-x-8
        gap-x-8
        flex
        items-center
      "
    >
      <div class="col-span-10 lg:col-span-6">
        <p class="text-2xl lg:text-3xl lg:leading-loose text-gray-600">
          Provincia Arauco.
        </p>
        <p
          class="
            text-2xl
            lg:text-4xl
            w-5/12
            font-bold
            lg:leading-loose
            text-gray-700
          "
        >
          Portal de emprendimientos locales.
        </p>
      </div>

      <div v-if="organizaciones" class="flex align-center my-[20px] lg:my-[0px] col-span-10 lg:col-span-6 grid grid-cols-12 lg:gap-x-8 lg:gap-y-0 gap-y-8">
        <div
          class="lg:my-8 col-span-12 lg:col-span-6"
          v-for="organizacion in organizaciones"
          :key="organizacion.id"
        >
          <v-img
            v-if="organizacion.attributes.logo.data"
            :src="`${$config.apiUrl}${organizacion.attributes.logo.data.attributes.url}`"
            contain
            :width="width"
          >
          </v-img>
        </div>
      </div>
    </v-container>

    <emprendedores-list />
  </div>
</template>

<script>
import EmprendedoresList from "../../components/emprendedores/EmprendedoresList.vue";

export default {
  components: { EmprendedoresList },
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      filters: {
        $or: [
          {
            nombre: {
              $eq: "Dinamiza Arauco",
            },
          },
          {
            nombre: {
              $eq: "Corfo",
            },
          },
        ],
      },
      populate: ["logo"],
    });

    const organizaciones = await context.$axios
      .$get(`${context.$config.apiUrl}/api/organizacions?${query}`)
      .then((res) => res.data);

    return { organizaciones };
  },
  computed: {
    pagina() {
      return this.$store.getters[
        "paginas/emprendedores/getPaginaEmprendedores"
      ];
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 320;
        case "sm":
          return 340;
        case "md":
          return 600;
        case "lg":
          return 600;
        case "xl":
          return 600;
      }
    },
  },
};
</script>

<style>
</style>