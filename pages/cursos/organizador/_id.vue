<template>
  <div class="bg-gradient-to-b from-slate-50 to-white h-full">
    <div class="container">
      <div class="lg:py-[50px] py-[0px] px-[18px] lg:px-[0px]">
        <div class="mb-[20px] lg:mb-[40px]">
          <span class="font-bold text-2xl lg:text-4xl text-gray-700"
            >Cursos sobre {{ organizador.attributes.titulo }}</span
          >
        </div>

        <!--[CURSO DESTACADO]-->
        <span class="block mb-4 text-lg lg:text-2xl font-bold"
          >Curso destacado</span
        >
        <nuxt-link
          :to="{
            name: 'cursos-slug',
            params: { slug: organizador.attributes.cursos.data[0].attributes.slug },
          }"
          class="text-decoration-none"
        >
          <div
            :class="
              `${
                $vuetify.breakpoint.mobile
                  ? 'flex-col'
                  : ' flex-row space-x-6 border border-gray-200 p-6'
              }` + ' flex'
            "
          >
            <div>
              <v-img
                v-if="
                  organizador.attributes.cursos.data[0].attributes
                    .imagen_referencia.data
                "
                width="450"
                height="250"
                :src="
                  $config.apiUrl +
                  organizador.attributes.cursos.data[0].attributes
                    .imagen_referencia.data.attributes.url
                "
              ></v-img>
            </div>

            <div class="flex flex-col text-neutral-900">
              <span
                class="block mt-[18px] lg:mt-[0px] text-lg lg:text-2xl font-bold"
                >{{
                  organizador.attributes.cursos.data[0].attributes.titulo
                }}</span
              >

              <span class="block mt-4">{{
                organizador.attributes.cursos.data[0].attributes.descripcion
              }}</span>
            </div>
          </div>
        </nuxt-link>
        <!--[CURSO DESTACADO]-->

        <!-- [CURSOS] -->
        <div
          class="mt-14"
          v-if="organizador.attributes.cursos.data.length >= 2"
        >
          <span class="block mb-4 text-lg lg:text-2xl font-bold"
            >Todos los cursos de {{ organizador.attributes.titulo }}</span
          >
          <div
            class="flex lg:grid lg:grid-cols-12 lg:gap-y-6 space-x-8 lg:space-x-0 no-scrollbar overflow-x-scroll"
          >
            <div
              v-for="curso in organizador.attributes.cursos.data.slice(
                1,
                organizador.attributes.cursos.data.length
              )"
              :key="curso.id"
              :class="`${col_span}` + ' cursor-pointer'"
              @click="reescribirRecomendaciones(curso)"
            >
              <!-- Reemplazar por slug -->
              <nuxt-link :to="{ name: 'cursos-slug', params: { id: curso.attributes.slug } }">
                <v-img
                  v-if="curso.attributes.imagen_referencia.data"
                  width="200"
                  height="180"
                  class="rounded-xl shadow-xl"
                  :src="`${$config.apiUrl}${curso.attributes.imagen_referencia.data.attributes.url}`"
                ></v-img>
                <p class="mt-4 font-bold text-blue-800 w-8/12">
                  {{ curso.attributes.titulo }}
                </p>
              </nuxt-link>
            </div>
          </div>
        </div>
        <!-- [CURSOS] -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  mounted() {
    this.log();
  },
  // create an async asyncData() method to get an specific organizador using $axios module
  // using context as parameter
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["cursos", "cursos.imagen_referencia"],
    });

    const organizador = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/organizadores/${context.route.params.id}?${query}`
      )
      .then((res) => res.data);
    return { organizador };
  },
  methods: {
    async log() {
      // Obtener el usuario actual, si no esta logueado, definir 0 como usuario
      const user =
        this.$cookies.get("user") != null
          ? JSON.parse(this.$cookies.get("user")).toString()
          : "0";

      // Obtener el titutlo del organizador (categoria) que se acaba de visitar
      const organizador_title = this.organizador.attributes.titulo;


      // Crear un objeto con los datos a guardar
      const key = {
        action: "Visitó un organizador",
        values: [
          {
            log_key: organizador_title,
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

      // Obtener el log del usuario actual, si es 0 obtendra el log general de usuarios que no han iniciado sesion
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

        // Verificar si el usuario actual ya ha activado la key de visita al organizador
        let indexKey = key_data.find(
          (key) => key.action == "Visitó un organizador"
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
            log_key: organizador_title,
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
    reescribirRecomendaciones(curso) {
      let recomendaciones =
        localStorage.getItem("recomendaciones") != null
          ? JSON.parse(localStorage.getItem("recomendaciones"))
          : localStorage.getItem("recomendaciones");

      recomendaciones = recomendaciones != null ? recomendaciones : [];

      if (recomendaciones.length == 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          recomendaciones.push({
            id_organizador: curso.attributes.organizadores.data[0].id,
            titulo_curso: curso.attributes.titulo,
            [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
          });
        }
      }

      if (recomendaciones.length > 0) {
        if (curso.attributes.organizadores.data.length > 0) {
          let index = recomendaciones.some((item) => {
            return (
              curso.attributes.organizadores.data[0].attributes.titulo in item
            );
          });

          if (index == false) {
            recomendaciones.push({
              id_organizador: curso.attributes.organizadores.data[0].id,
              titulo_curso: curso.attributes.titulo,
              [curso.attributes.organizadores.data[0].attributes.titulo]: 1,
            });
          } else {
            let index = recomendaciones.find((item) => {
              return (
                curso.attributes.organizadores.data[0].attributes.titulo in item
              );
            });

            if (index) {
              index[curso.attributes.organizadores.data[0].attributes.titulo]++;
            }
          }
        }
      }

      localStorage.setItem("recomendaciones", JSON.stringify(recomendaciones));
    },
  },
  computed: {
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-4";
        case "sm":
          return "col-span-4";
        case "md":
          return "col-span-4";
        case "lg":
          return "col-span-3";
        case "xl":
          return "col-span-2";
      }
    },
  },
};
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
