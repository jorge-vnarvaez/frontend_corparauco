<template>
  <div>
    Recuperar Contraseña

    {{ code }}
  </div>
</template>

<script>
export default {
    data() {
        return {
            code: null
        }
    },
    async asyncData() {
        // get code from route params
        console.log(this.$route);
    }
}
</script>

<style>

</style>