<template>
  <div
    v-if="defaultUsersData.length > 0"
    class="bg-white flex rounded-lg shadow-md col-span-6 row-span-2 px-8 py-6"
  >
    <span class="block mb-6 font-bold text-neutral-900 text-2xl"
      >Ubicación geográfica usuarios</span
    >

    {{ regiones }}
  </div>
</template>

<script>
export default {
  props: ["defaultUsersData"],
  mounted() {
    this.segmentarPorUbicacion();
  },
  data() {
    return {
      usersData: this.defaultUsersData,
      regiones: [],
    };
  },
  methods: {
    segmentarPorUbicacion() {
      this.regiones = [];

      this.usersData.forEach((user) => {
        if (user.region) {
          // count all register for each region, provincias and comunas

          let region = this.regiones.find(
            (region) => region.region === user.region
          );
          if (!region) {
            region = {
              region: user.region,
              cantidad: 1,
              provincias: [],
            };
            this.regiones.push(region);
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
                comunas: [],
              };
              region.provincias.push(provincia);
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
                provincia.comunas.push(comuna);
              } else {
                comuna.cantidad++;
              }
            }
          }
        }
      });
    },
  },
};
</script>

<style></style>
