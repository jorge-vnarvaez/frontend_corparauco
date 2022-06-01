<template>
  <empty-section
    defaultTitle="Sin inscripciones"
    defaultLabel="No te haz inscrito a ningún evento."
    defaultIcon="mdi-calendar"
    defaultBtnMsg="Ver eventos"
    linkTo="eventos"
    :addPlus="false"
  />
</template>

<script>

import EmptySection from "./EmptySection.vue";

export default {
  components: { EmptySection },

}
</script>

<style>

</style>