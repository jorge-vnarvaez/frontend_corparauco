<template>
  <v-container v-if="user" class="grid grid-cols-12 lg:gap-y-0 gap-y-8 gap-x-8 bg-gradient-to-b from-slate-50 to-white">
    <v-img
      v-if="user.foto_perfil.data"
      :src="`${$config.apiUrl}${user.foto_perfil.data.attributes.url}`"
      class="col-span-12 lg:col-span-3 rounded-lg"
      contain
    ></v-img>

    <v-img
      v-if="!user.foto_perfil.data"
      src="/profileplaceholder.png"
      class="col-span-12 lg:col-span-3 rounded-lg"
      contain
    ></v-img>

    <div class="text-5xl col-span-9 text-gray-600 flex flex-col justify-center">
      <span>{{ user.nombre }} {{ user.apellidoPaterno }} {{ user.apellidoMaterno }}</span>
      <div class="col-span-9 text-2xl mt-8" v-if="user.descripcion">
        {{ user.descripcion }}
      </div>
    </div>

  </v-container>
</template>

<script>
export default {
  validate(context) {
    context.$cookies.set('empresa_id', context.params.id.empresa);
    context.$cookies.set('persona_id', context.params.id.persona);
    return true;
  },
  async asyncData(context) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["emprendedores", "emprendedores.foto_perfil"],
    });

    const empresa = await context.$axios
      .$get(
        `${context.$config.apiUrl}/api/empresas/${context.$cookies.get('empresa_id')}?${query}`
      )
      .then((res) => res.data);

    const user = empresa.attributes.emprendedores.find(
      (emprendedor) => emprendedor.id == context.$cookies.get('persona_id')
    );

    return { user };
  },
};
</script>

<style>
</style>