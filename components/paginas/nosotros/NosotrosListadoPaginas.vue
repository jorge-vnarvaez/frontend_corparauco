<template>
  <div v-if="paginas.length > 0">
    <!--[NAV DESKTOP]-->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      @mouseover="showOptions = true"
      @mouseleave="showOptions = false"
      class="text-gray-500 cursor-pointer"
    >
      Nosotros

      <div
        @mouseleave="showOptions = false"
        @mouseover="showOptions = true"
        class="absolute z-10 transition ease-in-out px-2"
        v-bind:class="{ hidden: !showOptions, flex: showOptions }"
      >
        <div class="bg-white rounded-xl mt-4 shadow-lg">
          <v-list-item-title
            v-for="pagina in paginas"
            :key="pagina.id"
            class="my-0"
            ><nuxt-link
              class="text-decoration-none"
              :to="{ name: `nosotros-${pagina.path}` }"
              ><p
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
        </div>
      </div>
    </div>
    <!--[NAV DESKTOP]-->


    <!--[NAV MOBILE]-->
    <div v-else class="text-gray-500 cursor-pointer w-full">
      <div class="w-full text-xl flex justify-between w-full font-bold">
        Nosotros
        <v-icon v-if="showOptions == false" @click="showOptions = true">mdi-chevron-down</v-icon
        >
        <v-icon v-if="showOptions" @click="showOptions = false"
          >mdi-chevron-up</v-icon
        >
      </div>

      <div v-if="showOptions">
        <div class="flex flex-col justify-start w-full">
          <v-list-item-title
            v-for="pagina in paginas"
            :key="pagina.id"
            class="w-full my-[7px]"
            ><nuxt-link
              class="text-decoration-none"
              :to="{ name: `nosotros-${pagina.path}` }"
                
              ><p @click="showMenu" class="text-gray-500 my-0">
                {{ pagina.label }}
              </p></nuxt-link
            ></v-list-item-title
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
    await this.$store.dispatch('paginas/nosotros/loadPaginas');
    await this.$store.dispatch('paginas/nosotros/loadDirectorio');
  },
  data() {
    return {
      showOptions: false,
    };
  },
  methods: {
    toggleNavbar: function () {
      this.showOptions = !this.showOptions;
    },
    showMenu: function() {
        this.$store.dispatch('ui/toggleMenu');
    }
  },
  computed: {
    paginas() {
      return this.$store.getters["paginas/nosotros/getPaginas"];
    },
  },
};
</script>

<style>
</style>