<template>
  <div class="grid grid-cols-12 gap-x-8 gap-y-8">
    <!-- TOP ORGANIZADORES VISUALIZADOS -->
    <div
      class="col-span-12 xl:col-span-3 bg-white py-6 px-8 rounded-lg shadow-md"
    >
      <span class="block text-gray-400 font-bold mb-4"
        >Top organizadores visualizados</span
      >

      <ol class="flex flex-col space-y-2" style="list-style-type: number">
        <li
          v-for="(data, organizador) in frecuenciaPorOrganizador"
          :key="organizador"
        >
          <div class="flex justify-between">
            <span class="block font-bold mr-4 w-full">{{
              data.organizador
            }}</span>
            <!-- <v-icon v-if="organizador.top" color="light-green">mdi-arrow-top-right-thick</v-icon> -->
            <!-- <v-icon v-if="data.perdedor" color="red">mdi-arrow-bottom-right-thick</v-icon> -->
          </div>
        </li>
      </ol>
    </div>
    <!-- TOP ORGANIZADORES VISUALIZADOS -->

    <!-- TOP FORMATOS VISUALIZADOS -->
    <div
      class="col-span-12 xl:col-span-3 bg-white py-6 px-8 rounded-lg shadow-md"
    >
      <span class="block text-gray-400 font-bold mb-4"
        >Top formatos visualizados</span
      >

      <ol class="flex flex-col space-y-2" style="list-style-type: number">
        <li v-for="(data, formato) in frecuenciaPorFormatos" :key="formato">
          <div class="flex justify-between">
            <span class="block font-bold mr-4 w-full">{{ data.formato }}</span>
            <!-- <v-icon v-if="formato != 0 && data.ganador" color="light-green">mdi-arrow-top-right-thick</v-icon>
            <v-icon v-if="data.perdedor" color="red">mdi-arrow-bottom-right-thick</v-icon> -->
          </div>
        </li>
      </ol>
    </div>
    <!-- TOP FORMATOS VISUALIZADOS -->

    <!-- CONTENIDO MENOS Y MÁS POPULAR -->
    <div
      class="col-span-12 xl:col-span-3 row-span-1 bg-white py-6 px-8 rounded-lg shadow-md"
    >
      <div>
        <span class="block text-gray-400 font-bold">Contenido más popular</span>
        <span class="text-sm font-bold">{{ contenidoPopular[0] }}</span>
      </div>

      <div class="mt-8">
        <span class="block text-gray-400 font-bold"
          >Contenido menos popular</span
        >
        <span class="text-sm font-bold">{{ contenidoMenosPopular[0] }}</span>
      </div>
    </div>
    <!-- CONTENIDO MENOS Y MÁS POPULAR -->

    <!-- GRÁFICO CONSUMOS -->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      class="col-span-12 xl:col-span-6 bg-white rounded-lg shadow-md px-8 py-6"
    >
      <div class="flex justify-between align-center">
        <span class="block text-gray-400 font-bold mb-4"
          >Consumos centro de medios</span
        >

        <!-- BOTONES -->
        <div class="w-48">
          <v-select
            :items="filtro"
            v-model="filtroFechaSeleccionado"
            solo
            flat
            dense
            outlined
            hide-details
          >
          </v-select>
        </div>
        <!-- BOTONES -->
      </div>

      <consumo-centro-medios
        v-if="$vuetify.breakpoint.mobile ? false : true"
        :consumosByDate="consumosByDate"
      />
    </div>
    <!-- GRÁFICO CONSUMOS -->

    <!-- GRÁFICO SEGMENTOS -->
    <div
      class="col-span-12 xl:col-span-6"
      v-if="$vuetify.breakpoint.mobile ? false : true"
    >
      <segmentos-centro-medios
        :contenidosPorOrganizador="contenidosPorOrganizador"
      />
    </div>
    <!-- GRÁFICO SEGMENTOS -->
  </div>
</template>

<script>
import moment from "moment";
import ConsumoCentroMedios from "./ConsumoCentroMedios.vue";
import SegmentosCentroMedios from "./SegmentosCentroMedios.vue";

export default {
  props: ["defaultContenidosData", "defaultOrganizadores", "defaultFormatos"],
  components: {
    ConsumoCentroMedios,
    SegmentosCentroMedios,
  },
  data() {
    return {
      filtroFechaSeleccionado: "Este mes",
      colors: ["blue", "teal", "orange", "yellow"],
      text_colors: [
        "text-blue-400",
        "text-teal-400",
        "text-orange-400",
        "text-yellow",
      ],
      filtro: ["Hoy", "Esta semana", "Este mes", "Todos"],
      contenidosData: this.defaultContenidosData,
      organizadores: this.defaultOrganizadores,
      formatos: this.defaultFormatos,
      contenidosPorOrganizador: [],
      frecuenciaPorOrganizador: [],
      frecuenciaPorFormatos: [],
      contenidosQuantity: [],
      contenidoPopular: [],
      contenidoMenosPopular: [],
      consumosByDate: [],
    };
  },
  watch: {
    filtroFechaSeleccionado(newValue) {
      switch (newValue) {
        case "Hoy":
          this.segmentarHoy();
          break;
        case "Esta semana":
          this.segmentarLastWeek();
          break;
        case "Este mes":
          this.segmentarLastMonth();
          break;
        case "Todos":
          this.segmentarTodos();
          break;
      }
    },
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

    this.consumos = log.flat().map((key) => {
      return key.values.map((value) => {
        return {
          grandparent: value.grandparent,
          contenido: value.log_key,
          time: value.time,
          ts: value.ts,
        };
      });
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
    // add a boolean to know if the cantidad of current organizador is going is going to take place of index + 1
    // add a bolean to know if the cantidad current organizador  is going to lose place of index - 1
    this.frecuenciaPorOrganizador = Object.keys(this.frecuenciaPorOrganizador)
      .sort((a, b) => {
        return (
          this.frecuenciaPorOrganizador[b].cantidad -
          this.frecuenciaPorOrganizador[a].cantidad
        );
      })
      .map((organizador, index) => {
        return {
          organizador: organizador,
          cantidad: this.frecuenciaPorOrganizador[organizador].cantidad,
          top: index === 0,
          bottom:
            index === Object.keys(this.frecuenciaPorOrganizador).length - 1,
        };
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
    // add a boolean to know if the formato of index is going is going to take place of index + 1
    // add a bolean to know if the formato of index is going to lose place of index + 1
    this.frecuenciaPorFormatos = Object.keys(this.frecuenciaPorFormatos)
      .sort((a, b) => {
        return (
          this.frecuenciaPorFormatos[b].cantidad -
          this.frecuenciaPorFormatos[a].cantidad
        );
      })
      .map((formato, index) => {
        return {
          formato: formato,
          cantidad: this.frecuenciaPorFormatos[formato].cantidad,
          ganador: index < 2,
          perdedor: index < 1,
        };
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

    this.segmentarLastMonth();
  },
  mounted() {
    this.segmentarContenidosPorOrganizador();
  },
  methods: {
    ranking_up(cantidad, cantidad_plus) {
      return cantidad - cantidad_plus <= 2 ? true : false;
    },
    segmentar(dates, format) {
      // using the above array of days, filter the array of logs to only include logs that are within the start and end of the day
      // use the day as the key in format MM/DD/YYYY, and the value as the number of logs
      const logsConsumosByDay = dates
        .map((day) => {
          return {
            [moment.unix(day.start).format(format)]: this.consumos
              .flat()
              .filter((curso) => {
                return curso.time >= day.start && curso.time <= day.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return {
            ...acc,
            ...curr,
          };
        }, {});

      const logsConsumosByDayArray = Object.keys(logsConsumosByDay)
        .map((key) => {
          return [key, logsConsumosByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.consumosByDate = logsConsumosByDayArray;
    },
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
    segmentarHoy() {
      // create an array of hours for the current day, and for each hour, create an array with the start and end of the hour
      // the end of hour should have -1 minute to the hour
      const startOfDay = moment().startOf("day");
      const endOfDay = moment().endOf("day");
      const hours = Array.from(
        { length: endOfDay.diff(startOfDay, "hours") + 1 },
        (v, k) => k + startOfDay.hour()
      );
      const hoursSegmented = hours.map((hour) => {
        return {
          start: moment().hour(hour).minute(0).second(0).unix(),
          end: moment().hour(hour).minute(59).second(59).unix(),
        };
      });

      this.segmentar(hoursSegmented, "HH:mm");
    },
    segmentarLastWeek() {
      // create an array of days taking the start of this week and the end of this week - 1 week
      const startOfWeek = moment().startOf("week").subtract(1, "week");
      const endOfWeek = moment().endOf("week").subtract(1, "week");

      const days = Array.from(
        { length: endOfWeek.diff(startOfWeek, "days") + 1 },
        (v, k) => k + startOfWeek.day()
      );

      const daysSegmented = days.map((day) => {
        return {
          start: moment()
            .subtract(1, "week")
            .day(day)
            .hour(0)
            .minute(0)
            .second(0)
            .unix(),
          end: moment()
            .subtract(1, "week")
            .day(day)
            .hour(23)
            .minute(59)
            .second(59)
            .unix(),
        };
      });

      this.segmentar(daysSegmented, "DD/MM/YYYY");
    },
    segmentarLastMonth() {
      // create an array of days in the month, and for each day in the month, create an object with the start and end of the day
      const daysInMonth = Array.from(
        { length: moment().daysInMonth() },
        (v, k) => k + 1
      );
      const days = daysInMonth.map((day) => {
        return {
          start: moment().date(day).startOf("day").unix(),
          end: moment().date(day).endOf("day").unix(),
        };
      });

      this.segmentar(days, "DD/MM/YYYY");
    },
    segmentarTodos() {
      // create an array of dates starting on july 1st and ending on yesterday
      const current_year = new Date().getFullYear();

      const initialMonth = moment(current_year + "-01-01").month();
      const currentMonth = moment().month();

      // create an array of months starting on august 1st
      const months = Array.from(
        { length: currentMonth - initialMonth + 1 },
        (_, i) => {
          let m = moment().month(initialMonth + i);
          return {
            start: m.startOf("month").unix(),
            end: m.endOf("month").unix(),
          };
        }
      );

      this.segmentar(months, "MMMM");
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
          return "col-span-3";
        case "xl":
          return "col-span-2";
        default:
          return "col-span-4";
      }
    },
  },
};
</script>

<style></style>
