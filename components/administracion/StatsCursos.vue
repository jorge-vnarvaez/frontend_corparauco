<template>
  <div class="grid grid-cols-12">
    <div
      class="col-span-12 xl:col-span-6 bg-white rounded-lg shadow-md px-8 py-6"
      v-if="data_visualizados.length > 0"
    >
      <div class="flex justify-between align-center">
        <span class="block text-gray-400 font-bold mb-4"
          >Cursos visualizados/finalizados</span
        >

        <!-- BOTONES -->
        <div class="w-48 flex align-center justify-end space-x-4">
          <div class="w-24">
            <v-select
              :items="years"
              v-model="year_selected"
              solo
              flat
              dense
              outlined
              hide-details
            >
            </v-select>
          </div>

          <div v-if="current_year == year_selected" class="w-40">
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

          <div v-if="current_year != year_selected" class="w-40">
            <v-select
              :items="filtro_year"
              v-model="filtroMesSeleccionado"
              item-text="name"
              item-value="id"
              solo
              flat
              dense
              outlined
              hide-details
            >
            </v-select>
          </div>
        </div>
        <!-- BOTONES -->
      </div>

      <!-- TAXONOMIES -->
      <div class="mt-4">
        <div class="flex align-center space-x-2">
          <div class="block w-6 h-2 bg-[#1E90FF]"></div>
          <span class="text-sm">Visualizados</span>
        </div>
        <div class="flex align-center space-x-2">
          <div class="block w-6 h-2 bg-[#F44336]"></div>
          <span class="text-sm">Finalizados</span>
        </div>
      </div>
      <!-- TAXONOMIES -->

      <!-- Gráfico curva -->
      <chart-svg v-if="max_value > 0" :contain="true" class="mt-8">
        <chart-g
          :scales="{
            fechas: {
              scale: 'scaleBand',
              bands: data_visualizados.length,
              range: [0, plotWidth + 20],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            values: {
              scale: 'scaleBand',
              bands: values.length,
              range: [0, plotHeight],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            valuesToPlot: {
              scale: 'scaleLinear',
              range: [0, plotHeight],
              domain: [0, max_value],
            },
          }"
        >
          <template #default="{ scales }">
            <!-- Lineas horizontales -->
            <chart-g
              v-for="(value, index) in values"
              :key="index + 'horizontales'"
            >
              <chart-rect
                fill="#eeeeee"
                :width="plotWidth"
                :height="0.8"
                :by="scales.valuesToPlot(value)"
              ></chart-rect>
            </chart-g>
            <!-- Lineas horizontales -->

            <!-- Valores visualizaciones -->
            <chart-curve
              ox="+"
              oy="+"
              fill="transparent"
              :strokeWidth="0.8"
              stroke="#1E90FF"
              autoPoints
              :data="data_visualizados"
              :width="plotWidth"
              :height="plotHeight"
              :curveStyle="'curveCardinal'"
              :min="0"
              :max="max_value"
            />
            <!-- Valores visualizaciones -->

            <!-- Valores finalizados -->
            <chart-curve
              ox="+"
              oy="+"
              fill="transparent"
              :strokeWidth="0.8"
              stroke="#F44336"
              autoPoints
              :data="data_finalizados"
              :width="plotWidth"
              :height="plotHeight"
              :curveStyle="'curveCardinal'"
              :min="0"
              :max="max_value"
            />
            <!-- Valores finalizados -->

            <!-- Fechas -->
            <chart-g
              v-for="(fecha, index) in visualizacionesCursosByDate"
              :key="fecha[0]"
            >
              <chart-text
                v-if="index % 4 == 0"
                :width="scales.fechas.bandwidth()"
                :ty="15"
                :bx="scales.fechas(index)"
                :font-size="8"
                >{{ fecha[0] }}</chart-text
              >
            </chart-g>
            <!-- Fechas -->

            <!-- Serie vertical -->
            <chart-g v-for="(value, index) in values" :key="index + 'values'">
              <chart-text
                :bx="10"
                :tx="-20"
                :by="scales.valuesToPlot(value)"
                :font-size="8"
                >{{ value }}</chart-text
              >
            </chart-g>
            <!-- Serie vertical -->
          </template>
        </chart-g>
      </chart-svg>
      <!-- Gráfico curva -->

      <div
        v-if="max_value == 0"
        class="flex align-center w-full justify-center h-[400px]"
      >
        <p class="text-center text-gray-500">No hay datos para mostrar</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartCurve from "../PrimeSvg/ChartCurve.vue";
import ChartText from "../PrimeSvg/ChartText.vue";
import ChartArc from "../PrimeSvg/ChartArc.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";

export default {
  props: ["defaultCursosData", "defaultOrganizadores"],
  components: {
    ChartSvg,
    ChartG,
    ChartCurve,
    ChartText,
    ChartArc,
    ChartRect,
  },
  data() {
    return {
      values: [],
      data_visualizados: [],
      data_finalizados: [],
      plotHeight: 140,
      filtroFechaSeleccionado: "Todos",
      filtroMesSeleccionado: null,
      filtro: ["Hoy", "Esta semana", "Este mes", "Todos"],
      filtro_year: [
        {
          id: 1,
          name: "Enero",
          value: "01",
        },
        {
          id: 2,
          name: "Febrero",
          value: "02",
        },
        {
          id: 3,
          name: "Marzo",
          value: "03",
        },
        {
          id: 4,
          name: "Abril",
          value: "04",
        },
        {
          id: 5,
          name: "Mayo",
          value: "05",
        },
        {
          id: 6,
          name: "Junio",
          value: "06",
        },
        {
          id: 7,
          name: "Julio",
          value: "07",
        },
        {
          id: 8,
          name: "Agosto",
          value: "08",
        },
        {
          id: 9,
          name: "Septiembre",
          value: "09",
        },
        {
          id: 10,
          name: "Octubre",
          value: "10",
        },
        {
          id: 11,
          name: "Noviembre",
          value: "11",
        },
        {
          id: 12,
          name: "Diciembre",
          value: "12",
        },
      ],
      cursosData: this.defaultCursosData,
      organizadores: this.defaultOrganizadores,
      cursosPorOrganizador: [],
      visualizacionesCursosByDate: [],
      visualizaciones: [],
      finalizados: [],
      finalizadosCursosByDate: [],
      fechaPersonalizada: null,
      year_selected: null,
    };
  },
  computed: {
    max_value() {
      return Math.max(...this.data_visualizados);
    },
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 240 : 400;
    },
    current_year() {
      return new Date().getFullYear();
    },
    years() {
      let years = [];

      let current_year = this.current_year;

      if (current_year <= 2024) {
        for (let i = 0; i < 3; i++) {
          years.push(current_year - i);
        }
      } else {
        for (let i = 0; i < 7; i++) {
          years.push(current_year - i);
        }
      }

      return current_year != 2022 ? years : [2022];
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

    const log_visitas = data.map((data) => {
      return data.attributes.log.keys.filter(
        (key) => key.action === "Visitó un curso"
      );
    });

    const log_finalizados = data.map((data) => {
      return data.attributes.log.keys.filter(
        (key) => key.action === "Finalizó un curso"
      );
    });

    this.visualizaciones = log_visitas.flat().map((key) => {
      return key.values.map((value) => {
        return {
          contenido: value.log_key,
          time: value.time,
          ts: value.ts,
        };
      });
    });

    this.finalizados = log_finalizados.flat().map((key) => {
      return key.values.map((value) => {
        return {
          contenido: value.log_key,
          time: value.time,
          ts: value.ts,
        };
      });
    });

    this.segmentarTodos();
  },
  mounted() {
    this.segmentarCursosPorOrganizador();

    moment.updateLocale("es", {
      week: {
        dow: 1, // Monday is the first day of the week
      },
    });

    this.year_selected = this.current_year;
  },
  watch: {
    visualizacionesCursosByDate(newValue) {
      this.data_visualizados = newValue.map((curso) => curso[1]);
      this.$store.dispatch("ui/printScales", this.max_value);
      this.values = this.$store.getters["ui/getScales"];
    },
    finalizadosCursosByDate(newValue) {
      this.data_finalizados = newValue.map((curso) => curso[1]);
    },
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
    year_selected(newValue) {
      if(newValue == this.current_year) {
        this.filtroFechaSeleccionado = "Todos";
      } else {
        this.filtroMesSeleccionado = 1;
      }
    },
    filtroMesSeleccionado(newValue) {
      this.consumosByDate = [];
      this.segmentarPersonalizado();
    },
  },
  methods: {
    max_visualizacionesCursosByDate() {
      return Math.max(
        ...this.visualizacionesCursosByDate.map((curso) => curso[1])
      );
    },
    segmentar(dates, format) {
      // using the above array of days, filter the array of logs to only include logs that are within the start and end of the day
      // use the day as the key in format MM/DD/YYYY, and the value as the number of logs
      const logsVisualizacionesByDay = dates
        .map((day) => {
          return {
            [moment.unix(day.start).format(format)]: this.visualizaciones
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

      const logsVisualizacionesByDayArray = Object.keys(
        logsVisualizacionesByDay
      )
        .map((key) => {
          return [key, logsVisualizacionesByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      const logsFinalizadosByDay = dates
        .map((date) => {
          return {
            [moment.unix(date.start).format("DD/MM/YYYY")]: this.finalizados
              .flat()
              .filter((curso) => {
                return curso.time >= date.start && curso.time <= date.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return {
            ...acc,
            ...curr,
          };
        }, {});

      const logsFinalizadosByDayArray = Object.keys(logsFinalizadosByDay)
        .map((key) => {
          return [key, logsFinalizadosByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.visualizacionesCursosByDate = logsVisualizacionesByDayArray;
      this.finalizadosCursosByDate = logsFinalizadosByDayArray;
    },
    segmentarPersonalizado() {
      const year_selected = this.year_selected;

      const selected_month = this.filtroMesSeleccionado;

      const daysInMonth = Array.from(
        {
          length: moment()
            .year(year_selected)
            .month(selected_month)
            .subtract(1, "month")
            .daysInMonth(),
        },
        (v, k) => k + 1
      );

      const days = daysInMonth.map((day) => {
        return {
          start: moment()
            .year(year_selected)
            .month(selected_month)
            .subtract(1, "month")
            .date(day)
            .startOf("day")
            .unix(),
          end: moment()
            .year(year_selected)
            .month(selected_month)
            .subtract(1, "month")
            .date(day)
            .endOf("day")
            .unix(),
        };
      });

      this.segmentar(days, "DD/MM/YYYY");
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

      // using the above array of hours, filter the array of logs to only include logs that are within the start and end of the hour
      // use the hour as the key in format MM/DD/YYYY, and the value as the number of logs
      const logsVisualizacionesByHour = hoursSegmented
        .map((hour) => {
          return {
            [moment(hour.start * 1000).format("HH:mm")]: this.visualizaciones
              .flat()
              .filter((log) => {
                return log.time >= hour.start && log.time <= hour.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});

      const logsFinalizadosByHour = hoursSegmented
        .map((hour) => {
          return {
            [moment(hour.start * 1000).format("HH:mm")]: this.finalizados
              .flat()
              .filter((log) => {
                return log.time >= hour.start && log.time <= hour.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});

      const logsVisualizacionesByHourArray = Object.keys(
        logsVisualizacionesByHour
      )
        .map((key) => {
          return [key, logsVisualizacionesByHour[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      const logsFinalizadosByHourArray = Object.keys(logsFinalizadosByHour)
        .map((key) => {
          return [key, logsFinalizadosByHour[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.visualizacionesCursosByDate = logsVisualizacionesByHourArray;
      this.finalizadosCursosByDate = logsFinalizadosByHourArray;
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
            .day(day)
            .hour(0)
            .minute(0)
            .second(0)
            .unix(),
          end: moment()
            .day(day)
            .hour(23)
            .minute(59)
            .second(59)
            .unix(),
        };
      });

      const logsVisualizacionesByDay = daysSegmented
        .map((day) => {
          return {
            [moment.unix(day.start).format("DD/MM/YYYY")]: this.visualizaciones
              .flat()
              .filter((log) => {
                return log.time >= day.start && log.time <= day.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        });

      const logsFinalizadosByDay = daysSegmented
        .map((day) => {
          return {
            [moment.unix(day.start).format("DD/MM/YYYY")]: this.finalizados
              .flat()
              .filter((log) => {
                return log.time >= day.start && log.time <= day.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        });

      const logsVisualizacionesByDayArray = Object.keys(
        logsVisualizacionesByDay
      )
        .map((key) => {
          return [key, logsVisualizacionesByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      const logsFinalizadosByDayArray = Object.keys(logsFinalizadosByDay)
        .map((key) => {
          return [key, logsFinalizadosByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.visualizacionesCursosByDate = logsVisualizacionesByDayArray;
      this.finalizadosCursosByDate = logsFinalizadosByDayArray;
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

      // using the above array of days, filter the array of logs to only include logs that are within the start and end of the day
      // use the day as the key in format MM/DD/YYYY, and the value as the number of logs
      const logsVisualizacionesByDay = days
        .map((day) => {
          return {
            [moment.unix(day.start).format("DD/MM/YYYY")]: this.visualizaciones
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

      const logsFinalizadosByDay = days
        .map((day) => {
          return {
            [moment.unix(day.start).format("DD/MM/YYYY")]: this.finalizados
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

      // using the array of formattedLogsByDay an parse into an array of arrays, each array containing the date and the number of logs for that day
      const logsVisualizacionesByDayArray = Object.keys(
        logsVisualizacionesByDay
      )
        .map((key) => {
          return [key, logsVisualizacionesByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      const logsFinalizadosByDayArray = Object.keys(logsFinalizadosByDay)
        .map((key) => {
          return [key, logsFinalizadosByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.visualizacionesCursosByDate = logsVisualizacionesByDayArray;
      this.finalizadosCursosByDate = logsFinalizadosByDayArray;
    },
    segmentarTodos() {
      // create an array of dates starting on july 1st and ending on yesterday
      const current_year = this.current_year;

      const initialMonth = moment()
        .year(current_year)
        .month(0)
        .startOf("month")
        .month();
      const currentMonth = moment().year(current_year).month();

      // create an array of months starting on august 1st
      const months = Array.from(
        { length: currentMonth - initialMonth + 1 },
        (_, i) => {
          let m = moment()
            .year(current_year)
            .month(initialMonth + i);
          return {
            start: m.startOf("month").unix(),
            end: m.endOf("month").unix(),
          };
        }
      );

      this.segmentar(months, "MMMM");
    },
    segmentarCursosPorOrganizador() {
      for (let i = 0; i < this.organizadores.length; i++) {
        let organizador = this.organizadores[i].attributes.titulo;

        this.cursosPorOrganizador.push({
          key: organizador,
          cantidad: 0,
        });
      }

      this.cursosPorOrganizador.forEach((curso) => {
        this.cursosData.data.forEach((cursoData) => {
          if (
            curso.key ==
            cursoData.attributes.organizadores.data[0].attributes.titulo
          ) {
            curso.cantidad++;
          }
        });
      });
    },
  },
};
</script>

<style></style>
