<template>
  <div v-if="emprendedor">
    <v-img
      :src="`${
        has_image(emprendedor.attributes.imagen_referencia.data)
          ? `${$config.apiUrl}${emprendedor.attributes.imagen_referencia.data.attributes.url}`
          : ``
      }`"
      gradient="to top right, rgba(14, 116, 144,.44), rgba(25,32,72,.55)"
      class="flex space-y-8 lg:space-y-48"
    >
      <v-container class="text-white">
        <p class="text-2xl text-white font-bold lg:text-6xl">
          {{ emprendedor.attributes.nombre }}
        </p>

        <div class="mt-20 flex flex-wrap space-x-0 lg:space-x-24">
          <p class="text-xl lg:text-2xl lg:leading-relaxed font-thin lg:w-6/12">
            {{ emprendedor.attributes.descripcion }}
          </p>

          <div class="flex flex-col space-y-16">
            <div v-if="emprendedor.attributes.usuarios.data.length > 0">
              <p class="text-2xl lg:text-4xl font-bold mb-8">Emprendedores</p>
              <div class="flex">
                <div
                  v-for="(persona, index) in emprendedor.attributes.emprendedores.concat(emprendedor.attributes.usuarios.data.map((usuario) => usuario.attributes))"
                  :key="index"
                  class="w-24 h-24 mx-4"
                >
                  <v-img
                    v-if="persona.foto_perfil.data"
                    :src="`${$config.apiUrl}${persona.foto_perfil.data.attributes.url }`"
                    class="w-24 h-24 rounded-full"
                  ></v-img>

                  <v-img
                    v-if="!persona.foto_perfil.data"
                    src="/profileplaceholder.png"
                    class="w-24 h-24 rounded-full"
                  ></v-img>
                </div>
              </div>
            </div>

            <div
              v-if="
                emprendedor.attributes.correo ||
                emprendedor.attributes.telefono ||
                emprendedor.attributes.pagina_web
              "
            >
              <p class="text-2xl lg:text-4xl font-bold">Contacto</p>

              <div v-if="emprendedor.attributes.correo">
                <div class="flex items-center mt-4">
                  <v-icon color="white" x-large>mdi-email-outline</v-icon>
                  <span class="text-xl mb-0 ml-4 font-thin">{{
                    emprendedor.attributes.correo
                  }}</span>
                </div>
              </div>

              <div v-if="emprendedor.attributes.telefono">
                <div class="flex items-center mt-4">
                  <v-icon color="white" x-large>mdi-phone-outline</v-icon>
                  <span class="text-xl mb-0 ml-4">{{
                    emprendedor.attributes.telefono
                  }}</span>
                </div>
              </div>

              <div v-if="emprendedor.attributes.pagina_web">
                <div class="flex items-center mt-4">
                  <v-icon color="white" x-large>mdi-web</v-icon>
                  <a :href="emprendedor.attributes.pagina_web" target="_blank"
                    ><span class="text-xl mb-0 ml-4 text-white">
                      Visitar página web</span
                    ></a
                  >
                </div>
              </div>
            </div>

            <p
              class="text-2xl lg:text-4xl font-bold"
              v-if="
                emprendedor.attributes.facebook ||
                emprendedor.attributes.instagram ||
                emprendedor.attributes.youtube ||
                emprendedor.attributes.linkedin
              "
            >
              Redes de sociales
            </p>

            <div class="flex mt-2">
              <a
                v-if="emprendedor.attributes.facebook"
                class="mt-2"
                :href="emprendedor.attributes.facebook"
                target="_blank"
              >
                <v-icon color="white" x-large class="mr-8">mdi-facebook</v-icon>
              </a>

              <a
                v-if="emprendedor.attributes.instagram"
                class="mt-2"
                :href="emprendedor.attributes.instagram"
                target="_blank"
              >
                <v-icon color="white" x-large class="mr-8"
                  >mdi-instagram</v-icon
                >
              </a>

              <a
                v-if="emprendedor.attributes.youtube"
                class="mt-2"
                :href="emprendedor.attributes.youtube"
                target="_blank"
              >
                <v-icon color="white" x-large class="mr-8">mdi-youtube</v-icon>
              </a>

              <a
                v-if="emprendedor.attributes.linkedin"
                class="mt-2"
                :href="emprendedor.attributes.linkedin"
                target="_blank"
              >
                <v-icon color="white" x-large class="mr-8">mdi-linkedin</v-icon>
              </a>
            </div>
          </div>
        </div>

        <div v-if="emprendedor.attributes.servicios.length > 0" class="pb-48">
          <p class="text-2xl lg:text-4xl font-bold mt-20">Productos y/o servicios.</p>
          <div class="grid grid-cols-12 gap-x-8">
            <div
              v-for="(servicio, index) in emprendedor.attributes.servicios"
              :key="index"
              class="col-span-12 lg:col-span-3"
            >
              <div v-if="servicio.galeria.data" class="flex flex-col lg:flex-row space-x-0 lg:space-x-8">
                <v-img
                  v-for="imagen in servicio.galeria.data"
                  :key="imagen.id"
                  :src="`${$config.apiUrl}${imagen.attributes.url}`"
                  class="rounded-lg"
                ></v-img>
              </div>
              <p class="mt-8 text-2xl" v-if="servicio.nombre">
                {{ servicio.nombre }}
              </p>
            </div>
          </div>
        </div>
      </v-container>
    </v-img>
  </div>
</template>

<script>
export default {
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: [
        "logo",
        "galeria",
        "imagen_referencia",
        "usuarios",
        "usuarios.foto_perfil",
        "servicios",
        "servicios.galeria",
        "emprendedores",
        "emprendedores.foto_perfil"
      ],
    });

    const emprendedor = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/empresas/${context.params.id}?${query}`
      )
      .then((res) => res.data);

    return { emprendedor };
  },
  computed: {
    has_image() {
      return (image) => (image != null ? true : false);
    },
  },
};
</script>

<style>
</style>