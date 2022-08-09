<template>
  <div class="mt-8">
    <!-- Gráfico curva -->
    <chart-svg :contain="true">
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
            :data="register_dates.map((date) => date[1])"
            :width="plotWidth"
            :height="plotHeight"
            :curveStyle="'curveCardinal'"
            :min="0"
            :max="max_value"
          />
          <!-- Valores de crecimiento -->

          <!-- Meses -->
          <chart-g v-for="(fecha, index) in register_dates" :key="fecha[0]">
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
      values: [],
      register_dates: [],
      meses_indexes: [],
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
  },
  async fetch() {
    const data = await fetch(`${this.$config.apiUrl}/api/users`).then((res) =>
      res.json()
    );

    const users = data.filter((user) => user.is_admin !== true);

    this.register_dates = users.map((user) => {
      return moment(user.createdAt).unix();
    });

    this.segmentarTodos();
    this.$store.dispatch('ui/printScales', this.max_value);
    this.values = this.$store.getters["ui/getScales"];
  },
  methods: {
    segmentarTodos() {
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

      this.register_dates = logsHistoricoCrecimiento;

      const length = this.register_dates.length;
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
      return Math.max(...this.register_dates.map((date) => date[1]));
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
  },
};
</script>

<style></style>
