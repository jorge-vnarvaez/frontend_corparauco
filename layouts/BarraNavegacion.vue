<template>
  <nav
    class="
      container
      w-full
      mb-3
      grid grid-cols-12
      flex flex-col
      space-y-8
      lg:space-y-0
    "
  >
    <div
      class="flex lg:flex-row flex-col items-center justify-between col-span-12"
    >
      <div class="flex justify-between col-span-6">
        <nuxt-link v-if="appLogo" to="/"
          ><v-img class="w-64 h-28" :src="`${$config.apiUrl}${appLogo}`"></v-img
        ></nuxt-link>
        <button
          class="
            text-white
            cursor-pointer
            text-xl
            leading-none
            px-3
            py-1
            border border-solid border-transparent
            rounded
            bg-transparent
            md:block
            lg:hidden
            outline-none
            focus:outline-none
          "
          type="button"
          v-on:click="showNavBar()"
        >
          <v-icon>mdi-menu</v-icon>
        </button>
      </div>

      <div
        v-if="$vuetify.breakpoint.mobile ? false : true"
        class="
          flex flex-col
          lg:flex-row
          items-end
          space-y-4
          lg:space-y-0 lg:col-span-6
          justify-end
          col-span-12
        "
      >
        <v-btn
          v-if="userStatus == false"
          outlined
          class="lg:ml-4 col-span-12 lg:col-span-6"
          color="light-blue darken-4"
          ><nuxt-link
            :to="{ name: 'iniciar_sesion' }"
            class="text-decoration-none"
            >Iniciar sesión</nuxt-link
          ></v-btn
        >
        <v-btn  v-if="userStatus == false" class="lg:ml-4 col-span-12 lg:col-span-6" color="teal darken-1"
          ><nuxt-link to="/registro" class="text-decoration-none"
            ><span class="text-white">Crear cuenta</span></nuxt-link
          ></v-btn
        >
      </div>

      <div
        v-else
        class="
          flex flex-col
          lg:flex-row justify-end
          items-center
          space-y-4
          lg:space-y-0 lg:col-span-3
          col-span-12
        "
      >
        <v-btn
          v-if="userStatus == false"
          outlined
          class="lg:ml-4 col-span-12 lg:col-span-6"
          color="light-blue darken-4"
          ><nuxt-link
            @click="hideNavBar"
            :to="{ name: 'iniciar_sesion' }"
            class="text-decoration-none"
            >Iniciar sesión</nuxt-link
          ></v-btn
        >
        <v-btn  v-if="userStatus == false" class="lg:ml-4 col-span-12 lg:col-span-6" color="teal darken-1"
          ><nuxt-link to="/registro" class="text-decoration-none"
            ><span @click="hideNavBar" class="text-white"
              >Crear cuenta</span
            ></nuxt-link
          ></v-btn
        >
      </div> 

      <div
        v-if="userStatus && user"
        class="
          flex
          col-span-2
          items-center
          lg:flex-row
          flex-col
          justify-end
        "
      >
        <div>
          <nuxt-link class="mr-4" :to="{ name: 'home' }">
            <span class="text-xl">
              {{ user.nombre }} {{ user.apellidoPaterno }}
              {{ user.apellidoMaterno }}
            </span>
          </nuxt-link>
        </div>
        <div>
          <button @click="desconectar" class="flex items-center">
            <p class="mb-0">Desconectar</p>
            <v-icon>mdi-logout-variant</v-icon>
          </button>
        </div>
      </div>
    </div>

    <div
      class="
        flex
        lg:flex-row
        flex-col flex-wrap
        justify-between
        grid grid-cols-12
        col-span-12
        space-y-8
        lg:space-y-0
      "
      v-show="$vuetify.breakpoint.mobile ? showMenu : true"
    >
      <div
        :class="`
          md:text-md
          lg:text-2xl
          flex
          lg:flex-row
          flex-col
          space-y-8
          lg:space-y-0
          space-x-0
          lg:space-x-12
          items-center
          align-center
          ${col_span}
        `"
      >
        <nosotros-listado-paginas />

        <nuxt-link
          :to="{ name: 'noticias' }"
          v-if="$vuetify.breakpoint.mobile ? false : true"
        >
          <span class="text-gray-500">Noticias</span></nuxt-link
        >

        <nuxt-link :to="{ name: 'noticias' }" v-else>
          <span @click="showNavBar" class="text-gray-500"
            >Noticias</span
          ></nuxt-link
        >

        <servicios-listado-paginas />

        <nuxt-link
          :to="{ name: 'eventos' }"
          v-if="$vuetify.breakpoint.mobile ? false : true"
        >
          <span class="text-gray-500">Eventos</span></nuxt-link
        >

        <nuxt-link :to="{ name: 'eventos' }" v-else>
          <span @click="showNavBar" class="text-gray-500"
            >Eventos</span
          ></nuxt-link
        >

        <div>
          <div
            v-if="$vuetify.breakpoint.mobile ? false : true"
            @mouseover="showOptions = true"
            @mouseleave="showOptions = false"
            class="text-gray-500 relative cursor-pointer"
          >
            Emprendedores
            <div
              @mouseleave="showOptions = false"
              @mouseover="showOptions = true"
              class="absolute z-10 transition ease-in-out px-2"
              v-bind:class="{ hidden: !showOptions, flex: showOptions }"
            >
              <div class="bg-white rounded-xl mt-4 shadow-lg">
                <v-list-item-title>
                  <nuxt-link :to="{ name: 'emprendedores' }">
                    <p
                      class="
                        text-gray-500
                        px-6
                        py-4
                        my-0
                        hover:bg-gray-50
                        rounded-pill
                        hover:text-blue-600
                        text-2xl
                      "
                    >
                      Vitrina Emprendedores
                    </p></nuxt-link
                  ></v-list-item-title
                >

                <v-list-item-title>
                  <nuxt-link :to="{ name: 'emprendedores-testimonios' }">
                    <p
                      class="
                        text-gray-500
                        px-6
                        py-4
                        my-0
                        hover:bg-gray-50
                        rounded-pill
                        hover:text-blue-600
                        text-2xl
                      "
                    >
                      Testimonios
                    </p></nuxt-link
                  ></v-list-item-title
                >
              </div>
            </div>
          </div>

          <div v-else class="text-gray-500 cursor-pointer w-full">
            <div class="flex justify-center w-full">
              Emprendedores
              <v-icon v-if="showOptions == false" @click="showOptions = true"
                >mdi-chevron-down</v-icon
              >
              <v-icon v-if="showOptions" @click="showOptions = false"
                >mdi-chevron-up</v-icon
              >
            </div>

            <div v-if="showOptions">
              <div class="mt-4 flex flex-col align-center">
                <v-list-item-title class="my-4"
                  ><nuxt-link
                    class="text-decoration-none"
                    :to="{ name: 'emprendedores' }"
                    ><p @click="showNavBar" class="text-gray-500 my-0 text-xs">
                      Vitrina Emprendedores
                    </p></nuxt-link
                  ></v-list-item-title
                >

                <v-list-item-title class="my-4"
                  ><nuxt-link
                    class="text-decoration-none"
                    :to="{ name: 'emprendedores-testimonios' }"
                    ><p @click="showNavBar" class="text-gray-500 my-0 text-xs">
                      Testimonios
                    </p></nuxt-link
                  ></v-list-item-title
                >
              </div>
            </div>
          </div>
        </div>

        <nuxt-link
          :to="{ name: 'contacto' }"
          v-if="$vuetify.breakpoint.mobile ? false : true"
        >
          <span class="text-gray-500">Contacto</span></nuxt-link
        >

        <nuxt-link :to="{ name: 'contacto' }" v-else>
          <span @click="showNavBar" class="text-gray-500"
            >Contacto</span
          ></nuxt-link
        >
      </div>

      <div
        class="flex lg:justify-end col-span-12 lg:col-span-3"
        v-if="$vuetify.breakpoint.mobile ? false : true"
      >
        <a
          href="https://www.linkedin.com/company/corparauco-chile/"
          target="_blank"
          class="
            mx-2
            text-gray-700
            dark:text-gray-200
            hover:text-gray-600
            dark:hover:text-gray-400
          "
          aria-label="Linkden"
        >
          <svg class="w-8 h-8 fill-current" viewBox="0 0 512 512">
            <path
              d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
            />
          </svg>
        </a>

        <a
          href="https://www.facebook.com/corparauco/"
          target="_blank"
          class="
            mx-2
            text-gray-700
            dark:text-gray-200
            hover:text-gray-600
            dark:hover:text-gray-400
          "
          aria-label="Facebook"
        >
          <svg class="w-8 h-8 fill-current" viewBox="0 0 512 512">
            <path
              d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
            />
          </svg>
        </a>

        <a
          href="https://twitter.com/corparauco"
          target="_blank"
          class="
            mx-2
            text-gray-700
            dark:text-gray-200
            hover:text-gray-600
            dark:hover:text-gray-400
          "
          aria-label="Twitter"
        >
          <svg class="w-8 h-8 fill-current" viewBox="0 0 512 512">
            <path
              d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
            />
          </svg>
        </a>

        <a
          href="https://www.instagram.com/corparauco/"
          target="_blank"
          class="
            text-gray-700
            dark:text-gray-200
            hover:text-gray-600
            dark:hover:text-gray-400
          "
          aria-label="Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            style="fill: #1976d2"
            class="w-8 h-8"
          >
            <path
              d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import NosotrosListadoPaginas from "../components/paginas/nosotros/NosotrosListadoPaginas.vue";
import ServiciosListadoPaginas from "../components/paginas/servicios/ServiciosListadoPaginas.vue";

export default {
  components: {
    NosotrosListadoPaginas,
    ServiciosListadoPaginas,
  },
  data() {
    return {
      is_logged: false,
      showOptions: false,
      user: null,
    };
  },
  async updated() {
    if (this.$cookies.get("user")) {
      this.user = await fetch(
        `${this.$config.apiUrl}/api/users/${this.$cookies.get(
          "user"
        )}?populate=*`
      ).then((res) => res.json());
    }
  },

  methods: {
    showNavBar: function () {
      this.$store.dispatch("ui/toggleMenu");
    },
    hideNavBar: function() {
      this.$store.dispatch('ui/hideMenu');
    },
    toggleNavbar: function () {
      this.showOptions = !this.showOptions;
    },
    desconectar() {
      this.$store.dispatch("session/desconectar");
    },
  },
  computed: {
    showMenu() {
      return this.$store.getters["ui/getMenuStatus"];
    },
    userStatus() {
      return this.$store.getters["session/getUserStatus"];
    },
    appLogo() {
      return this.$store.getters["paginas/inicio/getAppLogo"];
    },
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-12";
        case "lg":
          return "col-span-9";
        case "xl":
          return "col-span-9";
        default:
          return "col-span-12";
      }
    },
  },
};
</script>