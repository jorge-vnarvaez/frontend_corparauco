<template>
  <div class="grid grid-cols-12 grid-rows-12 gap-x-8 gap-y-8">

    <!-- CONTENIDOS POR ORGANIZADOR -->
    <div
      v-if="contenidosPorOrganizador"
      class="col-span-8 order-0 row-span-4 bg-white py-6 px-8 rounded-lg shadow-md"
    >
      <div class="flex flex-col space-y-8">
        <div
          v-for="(data, organizador) in contenidosPorOrganizador"
          :key="organizador"
          class="flex flex-col lg:flex-row align-center lg:grid lg:grid-cols-12"
        >
          <div class="flex flex-col lg:col-span-3">
            <span class="block text-gray-500 font-bold text-xl">{{
              data.key
            }}</span>

            <div class="flex">
              <span class="text-lg font-light">Contenidos: </span
              ><span class="text-lg font-bold">{{ data.cantidad }}</span>
            </div>
          </div>

          <div
            class="flex align-start justify-end lg:col-span-8 space-x-8 lg:space-x-0 mt-[20px] lg:mt-[0px]"
          >
            <div
              v-for="(formato, index) in data.formatos"
              :key="index"
              class="flex flex-col align-center"
            >
              <v-progress-circular
                :rotate="360"
                :size="50"
                :width="8"
                :value="formato[Object.keys(formato)[0]]"
                :color="colors[index]"
              >
                {{ formato[Object.keys(formato)[0]] }}
              </v-progress-circular>
              <span :class="`${text_colors[index]}` + ' block font-bold text-sm'">
                {{ Object.keys(formato)[0] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- CONTENIDOS POR ORGANIZADOR -->


    <!-- TOP ORGANIZADORES VISUALIZADOS -->
    <div class="col-span-4 row-span-2 bg-white py-6 px-8 rounded-lg shadow-md">
      <span class="block text-sky-900 font-bold text-xl mb-4"
        >Top organizadores visualizados</span
      >

      <ol class="flex flex-col space-y-2" style="list-style-type: number">
        <li
          v-for="(data, organizador) in frecuenciaPorOrganizador"
          :key="organizador"
        >
          <div class="flex flex-col">
            <span class="block text-gray-500 font-bold">{{ data }}</span>
            <!-- <div>
              <span class="text-xl font-bold">{{ data.cantidad }}</span>
              <span class="font-light text-gray-600"> veces consumido </span>
            </div> -->
          </div>
        </li>
      </ol>
    </div>
    <!-- TOP ORGANIZADORES VISUALIZADOS -->

      <!-- TOP FORMATOS VISUALIZADOS -->
    <div class="col-span-4 row-span-2 bg-white py-6 px-8 rounded-lg shadow-md">
      <span class="block text-sky-900 font-bold text-xl mb-4"
        >Top formatos visualizados</span
      >

      <ol class="flex flex-col space-y-2" style="list-style-type: number">
        <li v-for="(data, formato) in frecuenciaPorFormatos" :key="formato">
          <div class="flex flex-col">
            <span class="block text-gray-500 font-bold">{{ data }}</span>
            <!-- <div>
              <span class="text-xl font-bold">{{ data.cantidad }}</span>
              <span class="font-light text-gray-600"> veces consumido </span>
            </div> -->
          </div>
        </li>
      </ol>
    </div>
    <!-- TOP FORMATOS VISUALIZADOS -->

    <!-- CONTENIDO MAS POPULAR -->
    <div class="col-span-4 row-span-1 bg-white py-6 px-8 rounded-lg shadow-md">
      <span class="block text-gray-400 font-bold">Contenido más popular</span>
      <span class="text-sm font-bold">{{ contenidoPopular[0] }}</span>
    </div>
    <!-- CONTENIDO MAS POPULAR -->

    <!-- CONTENIDO MENOS POPULAR -->
    <div class="col-span-4 row-span-1 bg-white py-6 px-8 rounded-lg shadow-md">
      <span class="block text-gray-400 font-bold">Contenido menos popular</span>
      <span class="text-sm font-bold">{{ contenidoMenosPopular[0] }}</span>
    </div>
    <!-- CONTENIDO MENOS POPULAR -->

  
  </div>
</template>

<script>
export default {
  props: ["defaultContenidosData", "defaultOrganizadores", "defaultFormatos"],
  data() {
    return {
      colors: ["blue", "teal", "orange", "yellow"],
      text_colors: ["text-blue-400", "text-teal-400", "text-orange-400", "text-yellow"],
      contenidosData: this.defaultContenidosData,
      organizadores: this.defaultOrganizadores,
      formatos: this.defaultFormatos,
      contenidosPorOrganizador: [],
      frecuenciaPorOrganizador: [],
      frecuenciaPorFormatos: [],
      contenidosQuantity: [],
      contenidoPopular: [],
      contenidoMenosPopular: [],
    };
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["log", "log.keys", "log.keys.values"],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/api/logs?${query}`
    ).then((res) => res.json());

    const log = data.map((data) => {
      return data.attributes.log.keys.filter(
        (key) => key.action === "Consumió un contenido"
      );
    });

    const contenidos = log.flat().map((key) => {
      return key.values.map((value) => {
        return {
          contenido: value.log_key,
          organizador: value.grandparent,
          formato: value.parent,
        };
      });
    });

    // create a frequency table for each contenido and organizador
    const contenidosFrecuentes = contenidos.flat().reduce((acc, curr) => {
      if (acc[curr.contenido]) {
        acc[curr.contenido]++;
      } else {
        acc[curr.contenido] = 1;
      }

      if (curr.organizador) {
        if (acc[curr.organizador]) {
          acc[curr.organizador]++;
        } else {
          acc[curr.organizador] = 1;
        }
      }

      // create a frequency table for each formato that isn't null
      if (curr.formato) {
        if (acc[curr.formato]) {
          acc[curr.formato]++;
        } else {
          acc[curr.formato] = 1;
        }
      }
      return acc;
    }, {});

    // create an array of organizadores and their contenidos only if the organizador is equal to organizadores
    this.frecuenciaPorOrganizador = Object.keys(contenidosFrecuentes).reduce(
      (acc, curr) => {
        if (
          this.organizadores
            .map((organizador) => organizador.attributes.titulo)
            .includes(curr)
        ) {
          acc[curr] = {
            cantidad: contenidosFrecuentes[curr],
          };
        }
        return acc;
      },
      {}
    );

    // order the array frecuenciaPorOrganizador by cantidad and get the top 3
    this.frecuenciaPorOrganizador = Object.keys(this.frecuenciaPorOrganizador)
      .sort((a, b) => {
        return (
          this.frecuenciaPorOrganizador[b].cantidad -
          this.frecuenciaPorOrganizador[a].cantidad
        );
      })
      .slice(0, 3);

    // create an array of formatos and their contenidos only if the formato is equal to formatos
    this.frecuenciaPorFormatos = Object.keys(contenidosFrecuentes).reduce(
      (acc, curr) => {
        if (
          this.formatos
            .map((formato) => formato.attributes.nombre)
            .includes(curr)
        ) {
          acc[curr] = {
            cantidad: contenidosFrecuentes[curr],
          };
        }
        return acc;
      },
      {}
    );

    // order the array frecuenciaPorFormatos by cantidad and get the top 3
    this.frecuenciaPorFormatos = Object.keys(this.frecuenciaPorFormatos)
      .sort((a, b) => {
        return (
          this.frecuenciaPorFormatos[b].cantidad -
          this.frecuenciaPorFormatos[a].cantidad
        );
      })
      .slice(0, 3);

    // create an array of contenidos only if the contenido is equal to contenidos
    this.contenidosQuantity = Object.keys(contenidosFrecuentes).reduce(
      (acc, curr) => {
        if (
          this.contenidosData.data
            .map((contenido) => contenido.attributes.titulo)
            .includes(curr)
        ) {
          acc[curr] = {
            cantidad: contenidosFrecuentes[curr],
          };
        }
        return acc;
      },
      {}
    );

    this.contenidoPopular = Object.keys(this.contenidosQuantity).sort(
      (a, b) => {
        return (
          this.contenidosQuantity[b].cantidad -
          this.contenidosQuantity[a].cantidad
        );
      }
    );

    this.contenidoMenosPopular = Object.keys(this.contenidosQuantity).sort(
      (a, b) => {
        return (
          this.contenidosQuantity[a].cantidad -
          this.contenidosQuantity[b].cantidad
        );
      }
    );
  },
  mounted() {
    this.segmentarContenidosPorOrganizador();
  },
  methods: {
    segmentarContenidosPorOrganizador() {
      for (let i = 0; i < this.organizadores.length; i++) {
        const key = this.organizadores[i].attributes.titulo;

        this.contenidosPorOrganizador.push({
          key,
          cantidad: 0,
          formatos: this.formatos.map((formato) => {
            return { [formato.attributes.nombre]: 0 };
          }),
        });
      }

      this.contenidosPorOrganizador.forEach((contenido) => {
        this.contenidosData.data.forEach((contenidoData) => {
          if (
            contenido.key ==
            contenidoData.attributes.organizadores.data[0].attributes.titulo
          ) {
            contenido.cantidad++;
            contenido.formatos = contenido.formatos.map((formato) => {
              if (
                contenidoData.attributes.formato.data.attributes.nombre ==
                Object.keys(formato)[0]
              ) {
                formato[Object.keys(formato)[0]]++;
              }
              return formato;
            });
          }
        });
      });
    },
  },
  computed: {
    col_span() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "col-span-12";
        case "sm":
          return "col-span-12";
        case "md":
          return "col-span-6";
        case "lg":
          return "col-span-8";
        case "xl":
          return "col-span-8";
        default:
          return "col-span-3";
      }
    },
  },
};
</script>

<style></style>
