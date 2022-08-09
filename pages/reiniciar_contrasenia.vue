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
        const code = this.$route.params.code
        this.code = code;
    }
}
</script>

<style>

</style>