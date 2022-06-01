<template>
  <div>
    <div v-if="!evento.attributes.inscripcion_via_meet">
      <user-logged-form v-if="session" :eventDefault="evento" :regiones="regiones" />
      <public-evento-inscripcion
        v-else
        :eventDefault="evento"
        :eventDisabled="true"
        :regiones="regiones"
      />
    </div>

    <div v-else>
      <v-btn color="teal darken-4" outlined><a :href="evento.attributes.url_formulario" target="_blank"><span class="font-bold">Inscribete</span></a></v-btn>
    </div>
  </div>
</template>

<script>
import PublicEventoInscripcion from "./PublicEventoInscripcion.vue";
import UserLoggedForm from "./UserLoggedForm.vue";
export default {
  data() {
    return {
      dialog: false,
      evento: this.event,
    };
  },
  props: ["event"],
  components: { UserLoggedForm, PublicEventoInscripcion },
  computed: {
    session() {
      return this.$cookies.get("jwt");
    },
    regiones() {
      return this.$store.getters["ui/getRegiones"];
    },
  },
};
</script>

<style>
</style>