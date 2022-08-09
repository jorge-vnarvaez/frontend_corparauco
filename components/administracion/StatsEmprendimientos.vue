<template>
  <div :class="col_span_chart + ' bg-white px-8 py-6 shadow-md rounded-lg'">
    <div class="flex justify-between w-full align-center">
      <div>
        <span class="block text-gray-400 font-bold">Emprendimientos</span>
      </div>
      <div
        class="flex justify-end space-x-4"
        v-if="$vuetify.breakpoint.mobile ? false : true"
      >
        <!-- Vista pie -->
        <div
          :class="
            `${vista_seleccionada == 'pie' ? 'bg-blue-700' : ''}` +
            ' px-4 py-1 cursor-pointer'
          "
          @click="vista_seleccionada = 'pie'"
          v-tippy
          content="Vista de torta"
        >
          <span :class="vista_seleccionada == 'pie' ? 'text-white' : ''"
            >Destacado</span
          >
          <v-icon small :color="vista_seleccionada == 'pie' ? 'white' : 'black'"
            >mdi-chart-pie</v-icon
          >
        </div>
        <!-- Vista pie -->

        <!-- Vista barras -->
        <div
          :class="
            `${vista_seleccionada == 'bar' ? 'bg-blue-700' : ''}` +
            ' px-4 py-1 cursor-pointer'
          "
          @click="vista_seleccionada = 'bar'"
        >
          <span :class="vista_seleccionada == 'bar' ? 'text-white' : ''"
            >Todos</span
          >
          <v-icon small :color="vista_seleccionada == 'bar' ? 'white' : 'black'"
            >mdi-chart-bar</v-icon
          >
        </div>
        <!-- Vista barras -->
      </div>
    </div>

    <div class="flex justify-around align-center w-full mt-8">
      <!-- PIE SEGMENTOS -->
      <chart-svg
        v-if="vista_seleccionada == 'pie' || $vuetify.breakpoint.mobile"
        :contain="true"
        :containPadding="10"
        :width="400"
        :height="200"
        class="flex align-center"
      >
        <chart-g
          :scales="{
            tipos: {
              scale: 'scaleBand',
              bands: tipos_data.length,
              range: [0, plotWidth - 10],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            colors: {
              scale: 'scaleLinear',
              domain: [0, tipos_data.length - 1],
              range: ['#011936', '#91E5F6'],
            },
          }"
        >
          <template #default="{ scales }" class="flex align-center">
            <!-- LABELS -->
            <chart-rect
              v-for="(item, index) in angles"
              :key="index + 'rect'"
              :width="15"
              :height="15"
              :fill="scales.colors(index)"
              :by="index * 20 + 10"
              :ty="150"
              :tx="-40"
            ></chart-rect>
            <!-- LABELS -->

            <!-- TEXTOS -->
            <chart-text
              v-for="(item, index) in tipos_data"
              :key="index + 'text'"
              :width="scales.tipos.bandwidth()"
              :by="index * 20 + 10"
              :font-size="8"
              :ty="160"
              :tx="-20"
              >{{ item.tipo }}</chart-text
            >
            <!-- TEXTOS -->

            <!-- SECTORES -->
            <chart-arc
              class="cursor-pointer"
              :bx="150"
              :by="110"
              v-for="(item, index) in angles"
              :key="index + 'arc'"
              ox="+"
              oy="-"
              :fill="scales.colors(index)"
              stroke-width="3"
              :stroke="scales.colors(index)"
              :content="
                tipos_data[index].tipo + ': ' + tipos_data[index].empresas
              "
              v-tippy
              :startAngle="index == 0 ? 0 : angles[index - 1]"
              :endAngle="index == angles.length - 1 ? 360 : angles[index]"
              corner-radius="0"
              :ri="20"
              :ro="60"
            />
            <!-- SECTORES -->
          </template>
        </chart-g>
      </chart-svg>
      <!-- PIE SEGMENTOS -->
    </div>

    <!-- BARRA SEGMENTOS -->
    <chart-svg
      v-if="vista_seleccionada == 'bar' && !$vuetify.breakpoint.mobile"
      :contain="true"
    >
      <chart-g
        :scales="{
          tipos: {
            scale: 'scaleBand',
            bands: tipos_data.length,
            range: [0, plotWidth - 10],
            clamp: false,
            round: true,
            paddingOuter: 0,
            paddingInner: 0,
            align: 0.5,
          },
          color: {
            scale: 'scaleLinear',
            domain: [0, tipos_data.length - 1],
            range: ['#011936', '#91E5F6'],
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
            :tx="-40"
          >
            <chart-rect
              fill="#eeeeee"
              :width="plotWidth"
              :height="0.8"
              :by="value * 10"
            ></chart-rect>
          </chart-g>
          <!-- Lineas horizontales -->
          <chart-g
            v-for="(item, index) in tipos_data"
            :key="index + 'barra/empresas'"
          >
            <!-- BARRAS -->
            <chart-rect
              class="cursor-pointer"
              :width="10"
              :top="true"
              :height="item.empresas != 0 ? item.empresas * 10 : 1"
              :bx="scales.tipos(index)"
              :fill="scales.color(index)"
              :tx="-40"
              :content="item.tipo + ': ' + item.empresas"
              v-tippy="{ placement: 'bottom' }"
            ></chart-rect>
            <!-- BARRAS -->

            <!-- TIPOS -->
            <chart-text
              :width="scales.tipos.bandwidth()"
              :bx="scales.tipos(index)"
              :ra="-45"
              writing-mode="tb"
              :font-size="6"
              :ty="10"
              :tx="-40"
              name="externalTrigger"
              >{{ item.tipo }}</chart-text
            >

            <!-- TIPOS -->
          </chart-g>

          <!-- Serie vertical -->
          <chart-g v-for="(value, index) in values" :key="index + 'values'">
            <chart-text
              :bx="10"
              :tx="-60"
              :by="value * 10"
              :font-size="$vuetify.breakpoint.mobile ? 12 : 6"
              >{{ value }}</chart-text
            >
          </chart-g>
          <!-- Serie vertical -->
        </template>
      </chart-g>
    </chart-svg>
    <!-- BARRA SEGMENTOS -->
  </div>
</template>

<script>
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartArc from "../PrimeSvg/ChartArc.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";
import ChartText from "../PrimeSvg/ChartText.vue";

export default {
  props: ["totalEmprendimientos"],
  components: {
    ChartSvg,
    ChartArc,
    ChartG,
    ChartRect,
    ChartText,
  },
  data() {
    return {
      tipos: [],
      acum: 0,
      angles: [],
      vista_seleccionada: "pie",
      plotWidth: 400,
      plotHeight: 200,
      values: [],
    };
  },
  methods: {
    start_radius(total) {
      const total_emprendedores = this.totalEmprendedores;
      const p_emprendedores = (total * 360) / total_emprendedores;
      return p_emprendedores;
    },
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["empresas"],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/api/tipos?${query}`
    ).then((res) => res.json());

    this.tipos = data
      .map((tipo) => {
        return {
          tipo: tipo.attributes.titulo,
          empresas: tipo.attributes.empresas.data.length,
        };
      })
      .sort((a, b) => {
        return b.empresas - a.empresas;
      });

    this.tipos.forEach((tipo) => {
      const p_torta = this.start_radius(tipo.empresas);
      this.acum += p_torta;
      this.angles.push(this.acum);
    });

    // from angles remove all the angles that are equal than 360
    this.angles = this.angles.filter((angle, index) => {
      return this.angles[index] != this.angles[index + 1];
    });

    this.angles = this.angles.slice(0, 5);

    this.$store.dispatch("ui/printScales", this.max_value);
    this.values = this.$store.getters["ui/getScales"];
  },
  computed: {
    col_span_chart() {
      return this.vista_seleccionada == "pie"
        ? "col-span-12 md:col-span-6"
        : "col-span-12 md:col-span-7";
    },
    totalEmprendedores() {
      return this.tipos
        .slice(0, 5)
        .reduce((total, tipo) => total + tipo.empresas, 0);
    },
    max_value() {
      return Math.max(...this.tipos.map((tipo) => tipo.empresas));
    },
    tipos_data() {
      return this.vista_seleccionada == "pie"
        ? this.tipos.slice(0, 5)
        : this.tipos;
    },
  },
};
</script>

<style></style>
