<template>
  <empty-section
    defaultTitle="Sin postulaciones"
    defaultLabel="No te haz postulado a ningún programa."
    defaultIcon="mdi-clipboard-plus-outline"
    defaultBtnMsg="Postular a un programa"
  />
</template>

<script>
import EmptySection from "./EmptySection.vue";
export default {
  components: { EmptySection },
};
</script>

<style>
</style>
EmptySection