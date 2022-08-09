<template>
  <div class="bg-gradient-to-b from-slate-50 to-white">
    <v-container class="mb-24 py-16" v-if="programa">
      <div>
        <div class="flex lg:flex-row flex-col align-center justify-between">
          <p class="text-2xl lg:text-6xl font-bold text-gray-700">
            {{ programa.attributes.titulo }}
          </p>
          <v-btn
            v-if="programa.attributes.pagina_programa"
            class="py-3"
            color="blue-grey darken-4"
            ><v-icon color="white">mdi-web</v-icon
            ><a
              class="ml-2 py-4"
              :href="programa.attributes.pagina_programa"
              target="_blank"
              ><span class="text-white">Ver página web del programa</span></a
            ></v-btn
          >
        </div>
        <p class="text-2xl font-light leading-relaxed mt-12 text-gray-600">
          {{ programa.attributes.descripcion }}
        </p>
      </div>

      <div
        class="grid grid-cols-12 mt-20 gap-x-8"
        v-if="programa.attributes.secciones"
      >
        <div
          v-for="section in programa.attributes.secciones"
          :key="section.id"
          class="flex flex-col col-span-12 lg:col-span-6"
        >
          <span class="text-xl lg:text-3xl font-bold text-gray-700">{{
            section.titulo
          }}</span>
          <span class="text-lg lg:text-2xl my-16 text-gray-600">{{
            section.texto
          }}</span>
        </div>
        <!-- <div class="col-span-6">
        <v-img
          :width="width"
          v-if="programa.attributes.featured_image.data"
          :src="`${$config.apiUrl}${programa.attributes.featured_image.data.attributes.url}`"
          class="rounded-tr-xl rounded-bl-xl shadow-md h-full"
        ></v-img>
      </div> -->
      </div>
    </v-container>
  </div>
</template>

<script>

import moment from 'moment';

export default {
  mounted() {
    this.log();
  },
  methods: {
    async log() {
      // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
      const user =
        this.$cookies.get("user") != null
          ? JSON.parse(this.$cookies.get("user")).toString()
          : "0";

      // Crear un objeto con los datos a guardar
      const key = {
        action: "Visitó un programa",
        values: [
          {
            grandparent: this.organizacion,
            log_key: this.programa.attributes.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          },
        ],
      };

      const qs = require("qs");

      const query = qs.stringify({
        filters: {
          user_id: {
            $eq: user,
          },
        },
        populate: ["log", "log.keys", "log.keys.values"],
      });

      // Obtener el log del usuario actual
      const { data } = await this.$axios.get(
        `${this.$config.apiUrl}/api/logs?${query}`
      );

      // Si el log no existe, crearlo
      if (data.data.length == 0) {
        await this.$axios.post(`${this.$config.apiUrl}/api/logs`, {
          data: {
            user_id: user,
            log: {
              keys: [key],
            },
          },
        });
      }

      // Si el log existe
      if (data.data.length > 0) {
        // Obtener el log del usuario actual
        const log_id = data.data[0].id;

        // Obtener las keys del log del usuario actual
        let key_data = data.data[0].attributes.log.keys;

        // Verificar si el usuario actual ya ha activado la key de visitar un curso
        let indexKey = key_data.find(
          (key) => key.action == "Visitó un programa"
        );

        // Si la key no existe, crearla
        if (indexKey == undefined) {
          key_data.push(key);
        }

        // Si la key existe, obtener el index de la key
        if (indexKey != undefined) {
          let index = key_data.indexOf(indexKey);

          // Agregar un nuevo valor a la key
          key_data[index].values.push({
            grandparent: this.organizacion,
            log_key: this.programa.attributes.titulo,
            time: moment().unix().toString(),
            ts: moment().format("YYYY-MM-DD HH:mm:ss"),
          });
        }

        await this.$axios.put(`${this.$config.apiUrl}/api/logs/${log_id}`, {
          data: {
            log: {
              keys: key_data,
            },
          },
        });
      }
    },
  },
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["imagen_referencia", "secciones"],
    });

    const programa = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/programas/${context.params.slug}?${query}`
      )
      .then((res) => res.data);
    return { programa };
  },
  computed: {
    organizacion() {
      // crear un regex pattern con this.programa.attributes.pagina_programa
      // para saber si corfo o sercotec estan dentro de la variable
      if (this.programa.attributes.pagina_programa.includes("corfo")) {
        return "corfo";
      } else if (
        this.programa.attributes.pagina_programa.includes("sercotec")
      ) {
        return "sercotec";
      }
    },
    width() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 320;
        case "sm":
          return 320;
        case "md":
          return 400;
        case "lg":
          return 800;
        case "xl":
          return 800;
        default:
          return 300;
      }
    },
  },
};
</script>

<style></style>
