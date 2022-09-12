<template>
  <div>
    <div class="flex justify-between">
      <span class="block text-gray-400 font-bold"
        >Visitas SERCOTEC / CORFO</span
      >
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
    </div>
    <div class="h-12">
      <!-- TAXONOMIES -->
      <div class="mt-4">
        <div class="flex align-center space-x-2">
          <div class="block w-6 h-2 bg-[#1E90FF]"></div>
          <span class="text-sm">Visualizaciones sercotec</span>
        </div>
      </div>
      <div class="mt-1">
        <div class="flex align-center space-x-2">
          <div class="block w-6 h-2 bg-[#F44336]"></div>
          <span class="text-sm">Visualizaciones corfo</span>
        </div>
      </div>
      <!-- TAXONOMIES -->
    </div>
    <!-- Gráfico visualizaciones sercotec / corfo-->
    <chart-svg v-if="max_value > 0" :contain="true">
      <chart-g
        :scales="{
          fechas: {
            scale: 'scaleBand',
            bands: visualizaciones_sercotec.length,
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
            paddingInner: 10,
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
            :key="index + 'lineas_horizontales'"
          >
            <chart-rect
              fill="#eeeeee"
              :width="plotWidth"
              :height="0.8"
              :by="scales.valuesToPlot(value)"
            ></chart-rect>
          </chart-g>
          <!-- Lineas horizontales -->

          <!-- Valores sercotec -->
          <chart-curve
            fill="transparent"
            :strokeWidth="0.8"
            stroke="#1E90FF"
            autoPoints
            :data="visualizaciones_sercotec.map((date) => date[1])"
            :width="plotWidth"
            :height="plotHeight"
            :curveStyle="'curveCardinal'"
            :min="0"
            :max="max_value"
          />
          <!-- Valores sercotec -->

          <!-- Valores corfo -->
          <chart-curve
            fill="transparent"
            :strokeWidth="0.8"
            stroke="#ff0000"
            autoPoints
            :data="visualizaciones_corfo.map((date) => date[1])"
            :width="plotWidth"
            :height="plotHeight"
            :curveStyle="'curveCardinal'"
            :min="0"
            :max="max_value"
          />
          <!-- Valores corfo -->

          <!-- Fechas -->
          <chart-g
            v-for="(fecha, index) in visualizaciones_corfo"
            :key="fecha[0]"
          >
            <chart-text
              v-if="meses_indexes.includes(index)"
              :width="scales.fechas.bandwidth()"
              :ty="20"
              :bx="scales.fechas(index)"
              :font-size="$vuetify.breakpoint.mobile ? 12 : 6"
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
              :font-size="$vuetify.breakpoint.mobile ? 12 : 6"
              >{{ value }}</chart-text
            >
          </chart-g>
          <!-- Serie vertical -->
        </template>
      </chart-g>
    </chart-svg>
    <!-- Gráfico visualizaciones sercotec / corfo-->

    <div
      v-if="max_value == 0"
      class="flex align-center w-full justify-center h-[280px]"
    >
      <p class="text-center text-gray-500">No hay datos para mostrar</p>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartCurve from "../PrimeSvg/ChartCurve.vue";
import ChartText from "../PrimeSvg/ChartText.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";

export default {
  data() {
    return {
      year_selected: null,
      values: [],
      visualizaciones_corfo: [],
      log_visitas_corfo: [],
      log_visitas_sercotec: [],
      visualizaciones_sercotec: [],
      meses_indexes: [],
    };
  },
  mounted() {
    this.year_selected = this.current_year;
  },
  components: {
    ChartSvg,
    ChartG,
    ChartCurve,
    ChartText,
    ChartRect,
  },
  computed: {
    max_value_corfo() {
      return Math.max(...this.visualizaciones_corfo.map((date) => date[1]));
    },
    max_value_sercotec() {
      return Math.max(...this.visualizaciones_sercotec.map((date) => date[1]));
    },
    max_value() {
      return Math.max(this.max_value_corfo, this.max_value_sercotec);
    },
    plotWidth() {
      return this.$vuetify.breakpoint.mobile ? 240 : 300;
    },
    plotHeight() {
      return this.$vuetify.breakpoint.mobile
        ? 140
        : this.max_value * 20 >= 80
        ? 80
        : this.max_value * 20;
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

      return current_year != 2022 ? years : [2022, 2021];
    },
  },
  watch: {
    year_selected(newValue) {
      if (newValue != this.current_year) {
        this.segmentarTodos(newValue);
      } else {
        this.segmentarTodos(this.current_year);
      }
    },
  },
  methods: {
    segmentarTodos(year) {
      const initialMonth = moment()
        .year(year)
        .month(0)
        .startOf("month")
        .month();

      const currentMonth = moment().year(year).month();

      // create an array of months starting on august 1st
      const months = Array.from(
        { length: currentMonth - initialMonth + 1 },
        (_, i) => {
          let m = moment()
            .year(year)
            .month(initialMonth + i);
          return {
            start: m.startOf("month").unix(),
            end: m.endOf("month").unix(),
          };
        }
      );

      const logsByDateCorfo = months
        .map((date) => {
          return {
            [moment.unix(date.start).format("MMMM")]: this.log_visitas_corfo
              .flat()
              .filter((log) => {
                return log.time >= date.start && log.time <= date.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});

      const logsByDateSercotec = months
        .map((date) => {
          return {
            [moment.unix(date.start).format("MMMM")]: this.log_visitas_sercotec
              .flat()
              .filter((log) => {
                return log.time >= date.start && log.time <= date.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return { ...acc, ...curr };
        }, {});

      const logsByDateCorfoArray = Object.keys(logsByDateCorfo)
        .map((key) => {
          return [key, logsByDateCorfo[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      const logsByDateSercotecArray = Object.keys(logsByDateSercotec)
        .map((key) => {
          return [key, logsByDateSercotec[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.visualizaciones_corfo = logsByDateCorfoArray;
      this.visualizaciones_sercotec = logsByDateSercotecArray;

      const length = this.visualizaciones_sercotec.length;
      const half = Math.floor(length / 2);
      const last_half = half - 1;
      const last = length - 1;

      if (length % 2 == 1) {
        this.meses_indexes = [0, half, last];
      } else {
        this.meses_indexes = [0, half, last_half, last];
      }
    },
  },
  async fetch() {
    moment.locale("es");

    const qs = require("qs");

    const query = qs.stringify({
      populate: ["log", "log.keys", "log.keys.values"],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/api/logs?${query}`
    ).then((res) => res.json());

    const log_visitas = data.map((data) => {
      return data.attributes.log.keys.filter(
        (key) => key.action === "Visitó un programa"
      );
    });

    // from log_visitas filter the log keys values that have a granparent corfo and not sercotec
    this.log_visitas_corfo = log_visitas.flat().map((key) => {
      return key.values.filter((value) => {
        return value.grandparent === "corfo";
      });
    });

    this.log_visitas_sercotec = log_visitas.flat().map((key) => {
      return key.values.filter((value) => {
        return value.grandparent === "sercotec";
      });
    });

    this.segmentarTodos(this.current_year);
    this.$store.dispatch("ui/printScales", this.max_value);
    this.values = this.$store.getters["ui/getScales"];
  },
};
</script>

<style></style>
