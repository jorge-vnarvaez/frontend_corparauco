<template>
  <div class="mt-8">
    <chart-svg :contain="true" v-if="max_value > 0">
      <chart-g
        :scales="{
          fechas: {
            scale: 'scaleBand',
            bands: consumosByDate.length,
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
            round: false,
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
            :key="index + 'linea_horizontal'"
          >
            <chart-rect
              fill="#eeeeee"
              :width="plotWidth"
              :height="0.8"
              :by="scales.valuesToPlot(value)"
            ></chart-rect>
          </chart-g>
          <!-- Lineas horizontales -->

          <!-- Consumo contenidos -->
          <chart-curve
            fill="transparent"
            :strokeWidth="0.8"
            stroke="#1E90FF"
            autoPoints
            :data="consumosByDate.map((consumo) => consumo[1])"
            :width="plotWidth"
            :height="plotHeight"
            :curveStyle="'curveCardinal'"
            :min="0"
            :max="max_value"
          />
          <!-- Consumo contenidos -->

          <!-- Fechas -->
          <chart-g v-for="(fecha, index) in consumosByDate" :key="fecha[0]">
            <chart-text
              v-if="index % 4 === 0"
              :width="scales.fechas.bandwidth()"
              :ty="15"
              :bx="scales.fechas(index)"
              :font-size="7"
              >{{ fecha[0] }}</chart-text
            >
          </chart-g>
          <!-- Fechas -->

          <!-- Serie vertical -->
          <chart-g
            v-for="(value, index) in values"
            :key="index + 'serie_vertical'"
          >
            <chart-text
              :bx="10"
              :tx="-20"
              :by="scales.valuesToPlot(index)"
              :font-size="8"
              >{{ value }}</chart-text
            >
          </chart-g>
          <!-- Serie vertical -->
        </template>
      </chart-g>
    </chart-svg>

    <div
      v-if="max_value == 0 && !$vuetify.breakpoint.mobile"
      class="flex align-center w-full justify-center h-[400px]"
    >
      <p class="text-center text-gray-500">No hay datos para mostrar</p>
    </div>
  </div>
</template>

<script>
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartCurve from "../PrimeSvg/ChartCurve.vue";
import ChartText from "../PrimeSvg/ChartText.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";

export default {
  props: ["consumosByDate"],
  components: {
    ChartSvg,
    ChartG,
    ChartCurve,
    ChartText,
    ChartRect,
  },
  data() {
    return {
      plotWidth: 400,
      plotHeight: 140,
      values: [],
    };
  },
  watch: {
    consumosByDate(newValue) {
      this.values = [];

      this.$store.dispatch("ui/printScales", this.max_value);
      this.values = this.$store.getters["ui/getScales"];
    },
  },
  computed: {
    max_value() {
      return Math.max(...this.consumosByDate.map((consumo) => consumo[1]));
    },
  },
};
</script>

<style></style>
