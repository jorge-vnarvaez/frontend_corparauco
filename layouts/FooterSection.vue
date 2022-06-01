<template>
  <footer class="bg-gray-100">
    <v-container>
      <div class="container py-4 mx-auto">
        <div class="lg:flex">
          <div class="w-full -mx-6 lg:w-2/5">
            <div class="px-6">
              <nuxt-link v-if="appLogo" to="/"
                ><v-img
                  class="w-64 h-28 flex align-start"
                  :src="`${$config.apiUrl}${appLogo}`"
                  contain
                ></v-img
              ></nuxt-link>

              <div v-if="pagina.direcciones" class="mt-4">
                <p
                  v-for="direccion in pagina.direcciones"
                  :key="direccion.id"
                  class="max-w-md -mt-4 text-gray-500 lg:px-3"
                >
                  {{ direccion.calle }} #{{ direccion.nro }},
                  {{ direccion.comuna }}.
                </p>
              </div>

              <div class="flex mt-4 -mx-2 lg:px-3">
                <a
                  v-if="pagina.rrss[2] && pagina.rrss[2].url_to"
                  :href="pagina.rrss[2].url_to"
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
                  <svg class="w-12 h-12 fill-current" viewBox="0 0 512 512">
                    <path
                      d="M444.17,32H70.28C49.85,32,32,46.7,32,66.89V441.61C32,461.91,49.85,480,70.28,480H444.06C464.6,480,480,461.79,480,441.61V66.89C480.12,46.7,464.6,32,444.17,32ZM170.87,405.43H106.69V205.88h64.18ZM141,175.54h-.46c-20.54,0-33.84-15.29-33.84-34.43,0-19.49,13.65-34.42,34.65-34.42s33.85,14.82,34.31,34.42C175.65,160.25,162.35,175.54,141,175.54ZM405.43,405.43H341.25V296.32c0-26.14-9.34-44-32.56-44-17.74,0-28.24,12-32.91,23.69-1.75,4.2-2.22,9.92-2.22,15.76V405.43H209.38V205.88h64.18v27.77c9.34-13.3,23.93-32.44,57.88-32.44,42.13,0,74,27.77,74,87.64Z"
                    />
                  </svg>
                </a>

                <a
                  v-if="pagina.rrss[0] && pagina.rrss[0].url_to"
                  :href="pagina.rrss[0].url_to"
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
                  <svg class="w-12 h-12 fill-current" viewBox="0 0 512 512">
                    <path
                      d="M455.27,32H56.73A24.74,24.74,0,0,0,32,56.73V455.27A24.74,24.74,0,0,0,56.73,480H256V304H202.45V240H256V189c0-57.86,40.13-89.36,91.82-89.36,24.73,0,51.33,1.86,57.51,2.68v60.43H364.15c-28.12,0-33.48,13.3-33.48,32.9V240h67l-8.75,64H330.67V480h124.6A24.74,24.74,0,0,0,480,455.27V56.73A24.74,24.74,0,0,0,455.27,32Z"
                    />
                  </svg>
                </a>

                <a
                  v-if="pagina.rrss[1] && pagina.rrss[1].url_to"
                  :href="pagina.rrss[1].url_to"
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
                  <svg class="w-12 h-12 fill-current" viewBox="0 0 512 512">
                    <path
                      d="M496,109.5a201.8,201.8,0,0,1-56.55,15.3,97.51,97.51,0,0,0,43.33-53.6,197.74,197.74,0,0,1-62.56,23.5A99.14,99.14,0,0,0,348.31,64c-54.42,0-98.46,43.4-98.46,96.9a93.21,93.21,0,0,0,2.54,22.1,280.7,280.7,0,0,1-203-101.3A95.69,95.69,0,0,0,36,130.4C36,164,53.53,193.7,80,211.1A97.5,97.5,0,0,1,35.22,199v1.2c0,47,34,86.1,79,95a100.76,100.76,0,0,1-25.94,3.4,94.38,94.38,0,0,1-18.51-1.8c12.51,38.5,48.92,66.5,92.05,67.3A199.59,199.59,0,0,1,39.5,405.6,203,203,0,0,1,16,404.2,278.68,278.68,0,0,0,166.74,448c181.36,0,280.44-147.7,280.44-275.8,0-4.2-.11-8.4-.31-12.5A198.48,198.48,0,0,0,496,109.5Z"
                    />
                  </svg>
                </a>

                <a
                  v-if="pagina.rrss[3] && pagina.rrss[3].url_to"
                  :href="pagina.rrss[3].url_to"
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
                    class="w-12 h-12"
                  >
                    <path
                      d="M 8 3 C 5.239 3 3 5.239 3 8 L 3 16 C 3 18.761 5.239 21 8 21 L 16 21 C 18.761 21 21 18.761 21 16 L 21 8 C 21 5.239 18.761 3 16 3 L 8 3 z M 18 5 C 18.552 5 19 5.448 19 6 C 19 6.552 18.552 7 18 7 C 17.448 7 17 6.552 17 6 C 17 5.448 17.448 5 18 5 z M 12 7 C 14.761 7 17 9.239 17 12 C 17 14.761 14.761 17 12 17 C 9.239 17 7 14.761 7 12 C 7 9.239 9.239 7 12 7 z M 12 9 A 3 3 0 0 0 9 12 A 3 3 0 0 0 12 15 A 3 3 0 0 0 15 12 A 3 3 0 0 0 12 9 z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div class="mt-6 lg:mt-0 lg:flex-1">
            <div class="grid grid-cols-2 gap-6 sm:grid-cols-1 md:grid-cols-4">
              <div>
                <h3 class="text-gray-800 font-bold">Nosotros</h3>
                <nuxt-link
                  class="block text-sm my-4 capitalize"
                  :to="{ name: 'nosotros-quienes-somos' }"
                  >Quiénes somos</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: 'nosotros-vision-y-mision' }"
                  >Misión y visión</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: '' }"
                  >Política de calidad</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: 'nosotros-directorio' }"
                  >Directorio</nuxt-link
                >
              </div>

              <div>
                <h3 class="text-gray-800 font-bold">Servicios</h3>
                <nuxt-link
                  class="block text-sm my-4 capitalize"
                  :to="{ name: 'servicios-agente-operador-corfo' }"
                  >Agente operador CORFO</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: 'servicios-agente-operador-sercotec' }"
                  >Agente operador SERCOTEC</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: 'centro_de_medios' }"
                  >Centro de medios</nuxt-link
                >
              </div>

              <div>
                <h3 class="text-gray-800 font-bold">Emprendedores</h3>
                <nuxt-link
                  class="block text-sm my-4 capitalize"
                  :to="{ name: 'emprendedores' }"
                  >Vitrina emprendedores</nuxt-link
                >
                <nuxt-link
                  class="block text-sm mb-4 capitalize"
                  :to="{ name: 'emprendedores-testimonios' }"
                  >Testimonios</nuxt-link
                >
              </div>

              <div v-if="pagina.correos && pagina.telefonos">
                <h3 class="text-gray-800 font-bold">Contacto</h3>
                <span class="block mt-2 text-sm text-gray-500"
                  >{{ pagina.telefonos[0].numero }}</span>
                <p
                  class="block mt-2 text-sm text-gray-500"
                  >{{ pagina.correos[0].email }}</p
                >
              </div>
            </div>
          </div>
        </div>

        <hr class="h-px my-6 bg-gray-300 border-none dark:bg-gray-700" />

        <div>
          <p class="text-center text-gray-800">
            © Corparauco 2022 - Todos los derechos reservados
          </p>
        </div>
      </div>
    </v-container>
  </footer>
</template>

<script>
export default {
  computed: {
    appLogo() {
      return this.$store.getters["paginas/inicio/getAppLogo"];
    },
    pagina() {
      return this.$store.getters["paginas/footer/getPagina"];
    },
  },
};
</script>

<style>
</style>