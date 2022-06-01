<template>
  <empty-section
    defaultTitle="Sin inscripciones"
    defaultLabel="No te haz inscrito a ningún curso."
    defaultIcon="mdi-book-plus"
    defaultBtnMsg="Inscribirse a un curso"
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