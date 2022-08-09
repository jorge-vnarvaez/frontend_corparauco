<template>
  <div class="grid grid-cols-12">
    <div class="col-span-8 bg-white rounded-lg shadow-md p-8">
      <div class="flex">
        <div
          v-for="curso in cursosPorOrganizador"
          :key="curso.key"
          class="flex flex-col lg:flex-row align-center lg:grid lg:grid-cols-12"
        >
          <div class="flex flex-col lg:col-span-3">
            <span class="block text-gray-500 font-bold text-xl">{{
              curso.key
            }}</span>
            <div class="flex">
              <span class="text-lg font-light">Cursos: </span
              ><span class="text-lg font-bold">{{ curso.cantidad }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-span-12 p-8">
      <div class="flex space-x-4">
        <button @click="segmentarHoy()" :class="'px-4 py-1 bg-slate-100'">Hoy</button>
        <button :class="'px-4 py-1 bg-slate-100'">Esta semana</button>
        <button @click="segmentarLastMonth()" :class="'px-4 py-1 bg-slate-100'">Este mes</button>
        <button :class="'px-4 py-1 bg-slate-100'">Todos</button>
      </div>

      <div id="main" class="w-full h-80"></div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import * as echarts from "echarts";

export default {
  props: ["defaultCursosData", "defaultOrganizadores"],
  data() {
    return {
      filtroFechaSeleccionado: "Este mes",
      cursosData: this.defaultCursosData,
      organizadores: this.defaultOrganizadores,
      cursosPorOrganizador: [],
      cursosByDate: [],
      visualizaciones: [],
      startOfMonth: null,
      endOfMonth: null,
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

    const log_visitas = data.map((data) => {
      return data.attributes.log.keys.filter(
        (key) => key.action === "Visitó un curso"
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

    const cursosFrecuentes = this.visualizaciones.flat().reduce((acc, curr) => {
      if (acc[curr.contenido]) {
        acc[curr.contenido]++;
      } else {
        acc[curr.contenido] = 1;
      }
      return acc;
    }, {});
  },
  mounted() {
    this.segmentarCursosPorOrganizador();
  },
  methods: {
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
      const logsByHour = hoursSegmented
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

      this.cursosByDate = logsByHour;
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
      const logsByDay = days
        .map((day) => {
          return {
            [day.start]: this.visualizaciones.flat().filter((curso) => {
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

      // format each key of logsByDay to be MM/DD/YYYY
      const formattedLogsByDay = Object.keys(logsByDay)
        .map((key) => {
          return {
            [moment.unix(key).format("DD/MM/YYYY")]: logsByDay[key],
          };
        })
        .reduce((acc, curr) => {
          return {
            ...acc,
            ...curr,
          };
        }, {});

      // using the array of formattedLogsByDay an parse into an array of arrays, each array containing the date and the number of logs for that day
      const logsByDayArray = Object.keys(formattedLogsByDay)
        .map((key) => {
          return [key, formattedLogsByDay[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      var chartDom = document.getElementById("main");
      var myChart = echarts.init(chartDom);
      var option;

      const dateList = logsByDayArray.map((log) => {
        return log[0];
      });

      const valueList = logsByDayArray.map((log) => {
        return log[1];
      });

      option = {
        xAxis: {
          type: "category",
          data: dateList,
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: valueList,
            type: "line",
            smooth: true,
          },
        ],
      };

      option && myChart.setOption(option);

      this.cursosByDate = logsByDayArray;
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
