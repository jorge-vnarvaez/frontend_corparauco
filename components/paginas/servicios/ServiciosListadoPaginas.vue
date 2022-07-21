<template>
  <div v-if="paginas.length > 0">
    <!--[NAV DESKTOP]-->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      @mouseover="showOptions = true"
      @mouseleave="showOptions = false"
      class="text-gray-500 relative cursor-pointer"
    >
      Servicios
      <div
        @mouseleave="showOptions = false"
        @mouseover="showOptions = true"
        class="absolute z-10 transition ease-in-out"
        v-bind:class="{ hidden: !showOptions, flex: showOptions }"
      >
        <div class="py-2 bg-white rounded-xl mt-4 shadow-lg">
          <v-list-item-title
            v-for="pagina in paginas"
            :key="pagina.id"
            class="my-0"
            ><nuxt-link
              class="text-decoration-none"
              :to="{ name: `servicios-${pagina.path}` }"
              ><p
                @mouseover="on_hover = true"
                class="
                  text-gray-500 text-2xl
                  px-6
                  py-4
                  my-0
                  hover:bg-gray-50
                  rounded-pill
                  hover:text-blue-600
                "
              >
                {{ pagina.label }}
              </p></nuxt-link
            ></v-list-item-title
          >
          <nuxt-link :to="{ name: 'centro_de_medios' }">
            <p
              @mouseover="on_hover = true"
              class="
                text-gray-500 text-2xl
                px-6
                py-4
                my-0
                hover:bg-gray-50
                rounded-pill
                hover:text-blue-600
              "
            >
              Centro de medios
            </p></nuxt-link
          >

          <nuxt-link :to="{ name: 'cursos' }">
            <p
              @mouseover="on_hover = true"
              class="
                text-gray-500 text-2xl
                px-6
                py-4
                my-0
                hover:bg-gray-50
                rounded-pill
                hover:text-blue-600
              "
            >
              Cursos
            </p></nuxt-link>
        </div>
      </div>
    </div>
    <!--[NAV DESKTOP]-->

    <!--[NAV MOBILE]-->
    <div v-else class="text-gray-500 cursor-pointer w-full">
      <div class="flex text-xl w-full justify-between font-bold">
        Servicios
        <v-icon v-if="showOptions == false" @click="showOptions = true"
          >mdi-chevron-down</v-icon
        >
        <v-icon v-if="showOptions" @click="showOptions = false"
          >mdi-chevron-up</v-icon
        >
      </div>

      <div v-if="showOptions">
        <div class="flex flex-col justify-start">
          <v-list-item-title
            v-for="pagina in paginas"
            :key="pagina.id"
            class="w-full my-[7px]"
            ><nuxt-link
              class="text-decoration-none"
              :to="{ name: `servicios-${pagina.path}` }"
              ><p @click="showMenu" class="text-gray-500 my-0">
                {{ pagina.label }}
              </p></nuxt-link
            ></v-list-item-title
          >
          <nuxt-link :to="{ name: 'centro_de_medios' }" class="my-[7px]">
            <p @click="showMenu" class="text-gray-500 my-0">
              Centro de medios
            </p></nuxt-link
          >
        </div>
      </div>
    </div>
    <!--[NAV MOBILE]-->

  </div>
</template>

<script>
export default {
  async fetch() {
    await this.$store.dispatch("paginas/servicios/loadPaginas");
  },
  data() {
    return {
      on_hover: false,
      showOptions: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showOptions = !this.showOptions;
    },
    showMenu: function () {
      this.$store.dispatch("ui/toggleMenu");
    },
  },
  computed: {
    paginas() {
      return this.$store.getters["paginas/servicios/getPaginas"];
    },
  },
};
</script>

<style>
</style>