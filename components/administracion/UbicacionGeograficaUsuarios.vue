<template>
  <div v-if="defaultUsersData" class="grid grid-cols-12 gap-x-8 gap-y-8">
    <!-- USUARIOS POR REGION -->
    <div
      v-if="$vuetify.breakpoint.mobile ? false : true"
      class="col-span-12 bg-white rounded-lg shadow-md px-8 py-6"
    >
      <span class="block mb-6 font-bold text-gray-400"
        >Usuarios por región</span
      >
      <chart-svg :contain="true">
        <chart-g
          :scales="{
            regiones: {
              scale: 'scaleBand',
              bands: regiones.length,
              range: [0, plotWidth],
              clamp: false,
              round: true,
              paddingOuter: 0,
              paddingInner: 0,
              align: 0.5,
            },
            colors: {
              scale: 'scaleLinear',
              domain: [0, regiones.length - 1],
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
              :key="index + 'lineas_horizontales/regiones'"
            >
              <chart-rect
                v-if="Math.max(...values) >= 20 ? index % 10 == 0 : true"
                fill="#eeeeee"
                :width="plotWidth"
                :height="0.8"
                :by="value != 0 ? value * multiplier : 1"
              ></chart-rect>
            </chart-g>
            <!-- Lineas horizontales -->

            <chart-g v-for="(region, index) in data" :key="index">
              <!-- BARRAS PER ORGANIZADOR -->
              <chart-rect
                :top="true"
                class="cursor-pointer"
                :width="8"
                :height="
                  region.cantidad != 0 ? region.cantidad * multiplier : 1
                "
                :bx="scales.regiones(index)"
                :fill="scales.colors(index)"
              >
              </chart-rect>
              <!-- BARRAS PER ORGANIZADOR -->

              <!-- REGIONES -->
              <chart-text
                :width="scales.regiones.bandwidth()"
                :bx="scales.regiones(index)"
                :ra="-45"
                writing-mode="tb"
                :font-size="4"
                :ty="10"
                name="externalTrigger"
                >{{ region.region }}</chart-text
              >
              <!-- REGIONES -->
            </chart-g>

            <!-- VALUES -->
            <chart-g
              v-for="(value, index) in values"
              :key="index + 'values/regiones'"
            >
              <chart-text
                v-if="Math.max(...values) >= 20 ? index % 10 == 0 : true"
                :bx="10"
                :tx="-20"
                :by="value != 0 ? value * multiplier : 1"
                :font-size="4"
                >{{ value }}</chart-text
              >
            </chart-g>
            <!-- VALUES -->
          </template>
        </chart-g>
      </chart-svg>
    </div>
    <!-- USUARIOS POR REGION -->

    <!-- PROVINCIAS -->
    <div
      class="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md px-8 py-6 h-[280px]"
    >
      <div class="flex justify-between align-center">
        <span class="block font-bold text-gray-400"
          >Usuarios por provincias</span
        >
        <div class="w-48">
          <v-select
            :items="data.map((d) => d.region)"
            solo
            flat
            dense
            outlined
            hide-details
            no-data-text="Seleccione una región"
            label="Seleccione una región"
            v-model="region_seleccionada"
            :height="5"
          >
          </v-select>
        </div>
      </div>

      <div class="flex justify-around align-center">
        <!-- PIE SEGMENTO PROVINCIAS -->
        <chart-svg
          v-if="provincias.length > 0"
          :contain="true"
          :containPadding="10"
          :width="400"
          :height="200"
        >
          <chart-g
            :scales="{
              provincias: {
                scale: 'scaleBand',
                bands: provincias.length,
                range: [0, plotWidth - 10],
                clamp: false,
                round: true,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.5,
              },
              colors: {
                scale: 'scaleLinear',
                domain: [0, angles_provincias.length - 1],
                range: ['#011936', '#91E5F6'],
              },
            }"
          >
            <template #default="{ scales }">
              <chart-arc
                class="cursor-pointer focus:outline-none"
                :bx="150"
                :by="110"
                v-for="(item, index) in angles_provincias"
                :key="index + 'arc/provincias'"
                ox="+"
                oy="-"
                @click="cambiar_provincia(item.provincia)"
                :fill="scales.colors(index)"
                stroke-width="3"
                :stroke="scales.colors(index)"
                :startAngle="item.start"
                :endAngle="item.end"
                corner-radius="0"
                :ri="20"
                :ro="60"
                :content="item.provincia + ': ' + item.cantidad + ' usuario/s'"
                v-tippy
              />

              <!-- LABELS -->
              <chart-rect
                v-for="(item, index) in angles_provincias"
                :key="index + 'rect'"
                :width="15"
                :height="15"
                :fill="scales.colors(index)"
                :by="index * 20 + 10"
                :ty="130"
                :tx="-40"
              ></chart-rect>
              <!-- LABELS -->

              <!-- TEXTOS -->
              <chart-text
                v-for="(item, index) in angles_provincias"
                :key="index + 'text'"
                :width="scales.provincias.bandwidth()"
                :by="index * 20 + 10"
                :font-size="8"
                :ty="140"
                :tx="-20"
                >{{ item.provincia }}</chart-text
              >
              <!-- TEXTOS -->
            </template>
          </chart-g>
        </chart-svg>
        <!-- PIE SEGMENTO PROVINCIAS -->
      </div>

      <!-- NO DATA -->
      <div
        v-if="provincias.length == 0"
        class="flex justify-center h-full align-center"
      >
        <span class="block mb-6 text-gray-400 text-center"
          >No hay usuarios registrados en la región
          {{ region_seleccionada }}</span
        >
      </div>
      <!-- NO DATA -->
    </div>
    <!-- PROVINCIAS -->

    <!-- COMUNAS -->
    <div
      class="col-span-12 lg:col-span-4 bg-white rounded-lg shadow-md px-8 py-6 h-[280px]"
    >
      <div class="flex justify-between align-center">
        <span class="block font-bold text-gray-400">Usuarios por comunas</span>
        <div v-if="provincias.length > 0" class="w-48">
          <v-select
            :items="provincias.map((d) => d.provincia)"
            solo
            flat
            dense
            outlined
            hide-details
            label="Seleccione una región"
            v-model="provincia_seleccionada"
            :height="5"
          >
          </v-select>
        </div>
      </div>

      <div class="flex justify-around align-center">
        <!-- PIE SEGMENTO COMUNAS -->
        <chart-svg
          v-if="comunas.length > 0"
          :contain="true"
          :containPadding="10"
          :width="400"
          :height="200"
        >
          <chart-g
            :scales="{
              comunas: {
                scale: 'scaleBand',
                bands: angles_comunas.length,
                range: [0, plotWidth - 10],
                clamp: false,
                round: true,
                paddingOuter: 0,
                paddingInner: 0,
                align: 0.5,
              },
              colors: {
                scale: 'scaleLinear',
                domain: [0, angles_comunas.length - 1],
                range: ['#011936', '#91E5F6'],
              },
            }"
          >
            <template #default="{ scales }">
              <chart-arc
                class="cursor-pointer focus:outline-none"
                :bx="150"
                :by="110"
                v-for="(item, index) in angles_comunas"
                :key="index + 'arc/comunas'"
                ox="+"
                oy="-"
                @click="cambiar_provincia(item.comuna)"
                :fill="scales.colors(index)"
                stroke-width="3"
                :stroke="scales.colors(index)"
                :startAngle="item.start"
                :endAngle="item.end"
                corner-radius="0"
                :ri="20"
                :ro="60"
                :content="item.comuna + ': ' + item.cantidad + ' usuario/s'"
                v-tippy
              />

              <!-- LABELS -->
              <chart-rect
                v-for="(item, index) in angles_comunas"
                :key="index + 'rect'"
                :width="15"
                :height="15"
                :fill="scales.colors(index)"
                :by="index * 20 + 10"
                :ty="130"
                :tx="-40"
              ></chart-rect>
              <!-- LABELS -->

              <!-- TEXTOS -->
              <chart-text
                v-for="(item, index) in angles_comunas"
                :key="index + 'text'"
                :width="scales.comunas.bandwidth()"
                :by="index * 20 + 10"
                :font-size="8"
                :ty="140"
                :tx="-20"
                >{{ item.comuna }}</chart-text
              >
              <!-- TEXTOS -->
            </template>
          </chart-g>
        </chart-svg>
        <!-- PIE SEGMENTO COMUNAS -->
      </div>

      <!-- NO DATA -->
      <div
        v-if="comunas.length == 0"
        class="flex justify-center h-full align-center"
      >
        <span class="block mb-6 text-gray-400 text-center"
          >En la región {{ region_seleccionada }} no hay usuarios registrados en
          ninguna de sus provincias.</span
        >
      </div>
      <!-- NO DATA -->
    </div>
    <!-- COMUNAS -->
  </div>
</template>

<script>
import ChartSvg from "../PrimeSvg/ChartSvg.vue";
import ChartG from "../PrimeSvg/ChartG.vue";
import ChartRect from "../PrimeSvg/ChartRect.vue";
import ChartText from "../PrimeSvg/ChartText.vue";
import ChartArc from "../PrimeSvg/ChartArc.vue";

export default {
  props: ["defaultUsersData"],
  components: {
    ChartSvg,
    ChartG,
    ChartRect,
    ChartText,
    ChartArc,
  },
  mounted() {
    this.region_seleccionada = "Del Biobío";
    this.getSkeletonUbicacion();
    this.segmentarPorUbicacion();
    this.getValuesLabel();
  },
  data() {
    return {
      plotWidth: 400,
      plotHeight: 120,
      usersData: this.defaultUsersData,
      region_seleccionada: "",
      provincia_seleccionada: "",
      values: [],
      data: [],
      provincias: [],
      comunas: [],
      total_region: 0,
      angles_provincias: [],
      acum_provincias: 0,
      angles_comunas: [],
      acum_comunas: 0,
      total_provincia: 0,
    };
  },
  watch: {
    region_seleccionada: function () {
      this.getProvincias();
      this.provincia_seleccionada =
        this.provincias.length > 0 ? this.provincias[0].provincia : "";
    },
    provincia_seleccionada: function () {
      this.getComunas();
    },
  },
  methods: {
    start_radius(total_region, total_provincias) {
      const usuarios_region = total_region;
      const p_usuarios = (total_provincias * 360) / usuarios_region;
      return p_usuarios;
    },
    getSkeletonUbicacion() {
      this.data = this.regiones.map((region) => {
        return {
          region: region.nombre,
          cantidad: 0,
          provincias: this.$store.getters["ui/getProvincias"](
            region.codigo
          ).map((provincia) => {
            return {
              provincia: provincia.nombre,
              cantidad: 0,
              comunas: this.$store.getters["ui/getComunas"](
                provincia.codigo
              ).map((comuna) => {
                return {
                  comuna: comuna.nombre,
                  cantidad: 0,
                };
              }),
            };
          }),
        };
      });
    },
    segmentarPorUbicacion() {
      this.usersData.forEach((user) => {
        if (user.region) {
          // count all register for each region, provincias and comunas

          let region = this.data.find(
            (region) => region.region === user.region
          );
          if (!region) {
            region = {
              region: user.region,
              cantidad: 1,
            };
          } else {
            region.cantidad++;
          }

          // check the provincia of users and count it
          if (user.provincia) {
            let provincia = region.provincias.find(
              (provincia) => provincia.provincia === user.provincia
            );
            if (!provincia) {
              provincia = {
                provincia: user.provincia,
                cantidad: 1,
              };
            } else {
              provincia.cantidad++;
            }

            // check the comuna of users and count it
            if (user.comuna) {
              let comuna = provincia.comunas.find(
                (comuna) => comuna.comuna === user.comuna
              );
              if (!comuna) {
                comuna = {
                  comuna: user.comuna,
                  cantidad: 1,
                };
              } else {
                comuna.cantidad++;
              }
            }
          }
        }
      });
    },
    getProvincias() {
      this.angles_provincias = [];
      this.acum_provincias = 0;

      const data = this.data.find(
        (region) => region.region === this.region_seleccionada
      );

      this.provincias = data.provincias
        .filter((provincia) => provincia.cantidad > 0)
        .sort((a, b) => a.cantidad - b.cantidad);
      this.total_region = data.cantidad;

      this.angles_provincias = this.provincias.map((provincia) => {
        const p_torta = (provincia.cantidad * 360) / this.total_region;
        this.acum_provincias += p_torta;
        return {
          provincia: provincia.provincia,
          cantidad: provincia.cantidad,
          start:
            this.acum_provincias -
            this.start_radius(this.total_region, provincia.cantidad),
          end: this.acum_provincias,
        };
      });
    },
    getComunas() {
      this.comunas = [];
      this.acum_comunas = 0;
      this.angles_comunas = [];
      if (this.provincias.length > 0) {
        const data = this.provincias.find(
          (provincia) => provincia.provincia === this.provincia_seleccionada
        );

        this.comunas = data.comunas
          .filter((comuna) => comuna.cantidad > 0)
          .sort((a, b) => a.cantidad - b.cantidad);

        this.total_provincia = data.cantidad;

        this.angles_comunas = this.comunas.map((comuna) => {
          const p_torta = (comuna.cantidad * 360) / this.total_provincia;
          this.acum_comunas += p_torta;
          return {
            comuna: comuna.comuna,
            cantidad: comuna.cantidad,
            start:
              this.acum_comunas -
              this.start_radius(this.total_provincia, comuna.cantidad),
            end: this.acum_comunas,
          };
        });
      }
    },
    getValuesLabel() {
      const max_value = this.max_value;

      for (let i = 0; i <= max_value; i++) {
        this.values.push(i);
      }
    },
  },
  computed: {
    regiones() {
      return this.$store.getters["ui/getRegiones"];
    },
    max_value() {
      return Math.max(...this.data.map((d) => d.cantidad));
    },
    // Multiplica el height del plot por el valor de la data par ajustar el tamaño de la barra
    multiplier() {
      return this.max_value >= 100 ? 1 : 15;
    },
  },
};
</script>

<style></style>
