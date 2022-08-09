<template>
  <div class="mt-8">
    <!-- Gráfico visualizaciones sercotec / corfo-->
    <chart-svg :contain="true">
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
          <chart-g v-for="(value, index) in values" :key="index + 'lineas_horizontales'">
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
      visualizaciones_corfo: [],
      visualizaciones_sercotec: [],
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
    const log_visitas_corfo = log_visitas.flat().map((key) => {
      return key.values.filter((value) => {
        return value.grandparent === "corfo";
      });
    });

    const log_visitas_sercotec = log_visitas.flat().map((key) => {
      return key.values.filter((value) => {
        return value.grandparent === "sercotec";
      });
    });

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

    const logsByDateCorfo = months
      .map((date) => {
        return {
          [moment.unix(date.start).format("MMMM")]: log_visitas_corfo
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
          [moment.unix(date.start).format("MMMM")]: log_visitas_sercotec
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

    if(length % 2 == 1) {
      this.meses_indexes = [0, half, last];
    } else {
      this.meses_indexes = [0, half, last_half, last];
    }

    this.$store.dispatch('ui/printScales', this.max_value);
    this.values = this.$store.getters["ui/getScales"];
  },
};
</script>

<style></style>
