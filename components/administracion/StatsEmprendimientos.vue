<template>
  <div class="bg-white col-span-6 px-8 py-6 shadow-md rounded-lg">
    <span class="block text-sky-900 font-bold text-xl mb-4">Emprendimientos</span>
    {{ tipos }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      tipos: [],
    }
  },  
    async fetch() {
        const qs = require('qs');

        const query = qs.stringify({
            populate: ['empresas']
        });

        const { data } = await fetch(`${this.$config.apiUrl}/api/tipos?${query}`).then(res => res.json());


        this.tipos = data.map((tipo) => {
          return {
            tipo: tipo.attributes.titulo,
            empresas: tipo.attributes.empresas.data.length,
          }
        }).sort((a, b) => {
          return b.empresas - a.empresas;
        });
    }
}
</script>

<style>

</style>