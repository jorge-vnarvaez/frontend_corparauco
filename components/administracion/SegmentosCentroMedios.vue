<template>
  <div class="bg-white rounded-lg shadow-md px-8 py-6">
    <div class="mb-2 flex justify-between align-center">
      <span class="block text-gray-400 font-bold">Contenidos</span>
    </div>
    <div
      v-for="(formato, index) in formatos"
      :key="formato"
      class="flex align-center my-4"
    >
      <div :class="'h-[18px] w-[18px] mr-2 ' + bg_colors[index]"></div>
      <span class="h-[18px] w-full text-xs">{{ formato }}</span>
    </div>

    <!-- Grafico segmento -->
    <chart-svg :contain="true" class="mt-8">
      <chart-g
        :scales="{
          organizadores: {
            scale: 'scaleBand',
            bands: segmento.length,
            range: [0, plotWidth],
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
              :by="value * 20"
            ></chart-rect>
          </chart-g>
          <!-- Lineas horizontales -->

          <!-- BARRAS PER ORGANIZADOR -->
          <chart-g
            v-for="(organizador, index) in segmento"
            :key="organizador.key + 'toplevel'"
            :bx="scales.organizadores(index)"
          >
            <chart-rect
              v-for="(formato, index) in organizador.formatos"
              :key="organizador.key + Object.keys(formato)[0]"
              class="cursor-pointer"
              :width="8"
              :top="true"
              :height="
                Object.values(formato)[0] != 0
                  ? Object.values(formato)[0] * 20
                  : 1
              "
              :bx="index * 10 + 20"
              :tx="-25"
              :fill="colors[index]"
              :content="
                Object.keys(formato)[0] + ': ' + Object.values(formato)[0]
              "
              v-tippy
            >
            </chart-rect>
          </chart-g>
          <!-- BARRAS PER ORGANIZADOR -->

          <!-- NOMBRES ORGANIZADORES -->
          <chart-g
            :ty="15"
            v-for="(organizador, index) in segmento"
            :key="organizador.key"
          >
            <chart-text
              :width="scales.organizadores.bandwidth()"
              :bx="scales.organizadores(index)"
              :ra="-45"
              writing-mode="tb"
              :font-size="6"
              name="externalTrigger"
            >
              {{ organizador.key }}
            </chart-text>
          </chart-g>
          <!-- NOMBRES ORGANIZADORES -->

          <!-- Serie vertical -->
          <chart-g v-for="(value, index) in values" :key="index + 'values'">
            <chart-text
              :bx="10"
              :tx="-20"
              :by="value * 20"
              :font-size="$vuetify.breakpoint.mobile ? 12 : 6"
              >{{ value }}</chart-text
            >
          </chart-g>
          <!-- Serie vertical -->
        </template>
      </chart-g>
    </chart-svg>
    <!-- Grafico segmento -->
  </div>
</template>

<script>
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";
import ChartText from "../PrimeSvg/ChartText.vue";

export default {
  props: ["contenidosPorOrganizador"],
  components: {
    ChartSvg,
    ChartG,
    ChartRect,
    ChartText,
  },
  data() {
    return {
      plotWidth: 400,
      plotHeight: 200,
      colors: ["#f27f07", "#00ab66", "#1874cd"],
      bg_colors: ["bg-[#f27f07]", "bg-[#00ab66]", "bg-[#1874cd]"],
      formatos: [],
      values: [],
    };
  },
  methods: {
    getValuesLabel() {
      const max_value = this.max_value;
      for(let i = 0; i <= max_value; i++) {
        this.values.push(i);
      }
    }
  },
  watch: {
    contenidosPorOrganizador(newValue) {
      this.formatos = [];
      newValue.forEach((organizador) => {
        organizador.formatos.forEach((formato) => {
          if (!this.formatos.includes(Object.keys(formato)[0])) {
            this.formatos.push(Object.keys(formato)[0]);
          }
        });
      });
      this.getValuesLabel();
      this.$store.dispatch('ui/printScales', this.max_value);
    },
  },
  computed: {
    segmento() {
      const segmento = this.contenidosPorOrganizador.filter(
        (organizador) => organizador.key == this.seleccion_organizador
      );

      return segmento.length > 0 ? segmento : this.contenidosPorOrganizador;
    },
    max_value() {
      let max_value = 0;
      this.contenidosPorOrganizador.forEach((organizador) => {
        organizador.formatos.forEach((formato) => {
          if (Object.values(formato)[0] > max_value) {
            max_value = Object.values(formato)[0];
          }
        });
      });

      return max_value;
    },
  },
};
</script>

<style></style>
