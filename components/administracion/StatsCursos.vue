<template>
  <div>
    {{ cursosPorOrganizador }}

    <button @click="segmentarHoy()">Hoy</button>
    <button>Esta semana</button>
    <button @click="segmentarLastMonth()">Este mes</button>
    <button>Todos</button>

    {{ cursosByDate }}
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["defaultCursosData", "defaultOrganizadores"],
  data() {
    return {
      cursosData: this.defaultCursosData,
      organizadores: this.defaultOrganizadores,
      cursosPorOrganizador: [],
      cursosByDate: [],
      cursos: [],
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

    this.cursos = log_visitas.flat().map((key) => {
      return key.values.map((value) => {
        return {
          contenido: value.log_key,
          time: value.time,
          ts: value.ts,
        };
      });
    });

    const cursosFrecuentes = this.cursos.flat().reduce((acc, curr) => {
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
        const logsByHour = hoursSegmented.map((hour) => {
          return {
            [moment(hour.start * 1000).format("HH:mm")]: this.cursos.flat()
              .filter((log) => {
                return log.time >= hour.start && log.time <= hour.end;
              })
              .length,
          };
        }).reduce((acc, curr) => {
          return { ...acc, ...curr };
        } ,{});

        this.cursosByDate = logsByHour;
    },
    segmentarLastMonth() {
      const startOfMonth = moment().startOf("month").unix();
      const endOfMonth = moment().endOf("month").unix();

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
        const logsByDay = days.map((day) => {
            return {
                [day.start]: this.cursos.flat().filter((curso) => {
                    return curso.time >= day.start && curso.time <= day.end;
                }).length,
            };
        }).reduce((acc, curr) => {
            return {
                ...acc,
                ...curr,
            };
        } ,{});


        // format each key of logsByDay to be MM/DD/YYYY
        const formattedLogsByDay = Object.keys(logsByDay).map((key) => {
            return {
                [moment.unix(key).format("DD/MM/YYYY")]: logsByDay[key],
            };
        }).reduce((acc, curr) => {
            return {
                ...acc,
                ...curr,
            };
        } ,{});

        this.cursosByDate = formattedLogsByDay;

      //   this.cursos.flat().filter((curso) => {

      //     return curso.time > startOfMonth && curso.time < endOfMonth;
      //   });
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
