<template>
  <div>
    <div class="flex justify-between">
      <span class="block text-gray-400 font-bold"
        >Crecimiento histórico usuarios</span
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
    <!-- TAXONOMIES -->
    <div class="mt-4 h-12">
      <div class="flex align-center space-x-2">
        <div class="block w-6 h-2 bg-[#1E90FF]"></div>
        <span class="text-sm">Usuarios nuevos</span>
      </div>
    </div>
    <!-- TAXONOMIES -->

    <!-- Gráfico curva -->
    <chart-svg :contain="true" v-if="max_value > 0">
      <chart-g
        :scales="{
          meses: {
            scale: 'scaleBand',
            bands: register_dates.length,
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

          <!-- Valores de crecimiento -->
          <chart-curve
            fill="transparent"
            :strokeWidth="0.8"
            stroke="#1E90FF"
            autoPoints
            :data="data.map((date) => date[1])"
            :width="plotWidth"
            :height="plotHeight"
            :curveStyle="'curveCardinal'"
            :min="0"
            :max="max_value"
          />
          <!-- Valores de crecimiento -->

          <!-- Meses -->
          <chart-g v-for="(fecha, index) in data" :key="fecha[0]">
            <chart-text
              v-if="meses_indexes.includes(index)"
              :width="scales.meses.bandwidth()"
              :ty="20"
              :bx="scales.meses(index)"
              :font-size="$vuetify.breakpoint.mobile ? 12 : 6"
              >{{ fecha[0] }}</chart-text
            >
          </chart-g>
          <!-- Meses -->

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
    <!-- Gráfico curva -->

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
      register_dates: [],
      meses_indexes: [],
      data: [],
    };
  },
  components: {
    ChartSvg,
    ChartG,
    ChartCurve,
    ChartText,
    ChartRect,
  },
  mounted() {
    moment.locale("es");
    this.year_selected = this.current_year;
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
  async fetch() {
    const data = await fetch(`${this.$config.apiUrl}/api/users`).then((res) =>
      res.json()
    );

    const users = data.filter((user) => user.is_admin !== true);

    this.register_dates = users.map((user) => {
      return moment(user.createdAt).unix();
    });

    this.segmentarTodos(2022);
    this.$store.dispatch("ui/printScales", this.max_value);
    this.values = this.$store.getters["ui/getScales"];
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

      const logsCrecimiento = months
        .map((month) => {
          return {
            [moment.unix(month.start).format("MMMM")]: this.register_dates
              .flat()
              .filter((date) => {
                return date >= month.start && date <= month.end;
              }).length,
          };
        })
        .reduce((acc, curr) => {
          return {
            ...acc,
            ...curr,
          };
        }, {});

      const logsHistoricoCrecimiento = Object.keys(logsCrecimiento)
        .map((key) => {
          return [key, logsCrecimiento[key]];
        })
        .reduce((acc, curr) => {
          return [...acc, curr];
        }, []);

      this.data = logsHistoricoCrecimiento;
      const length = this.data.length;
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
  computed: {
    max_value() {
      return Math.max(...this.data.map((date) => date[1]));
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
};
</script>

<style></style>
