<template>
  <div> 
      {{ id_persona }}
      <!-- {{ empresas.map((empresa) => empresa.attributes.nombre) }} -->
  </div>
</template>

<script>
export default {
    async asyncData(context) {
       const empresas = await context.$axios.$get(`${context.$config.apiUrl}/api/empresas/${context.params.id.id_emprendedor}?populate=*`).then(res => res.data);

       return { empresas }
    },
    computed: {
        id_persona() {
            return this.$route.params.id.id_persona;
        },
        // empresas_data() {
        //     return this.empresas.map((empresa) => empresa.emprendedores.find(emprendedor => emprendedor.id == this.id_persona));
        // }
    }
}
</script>

<style>

</style>