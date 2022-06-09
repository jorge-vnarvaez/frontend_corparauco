<template>
  <div>
    <empty-section
      v-if="eventos.length == 0"
      defaultTitle="Sin inscripciones"
      defaultLabel="No te haz inscrito a ningún evento."
      defaultIcon="mdi-calendar"
      defaultBtnMsg="Ver eventos"
      linkTo="eventos"
      :addPlus="false"
    />

    <div v-else class="mt-8">
      <p class="font-bold px-8 text-3xl">
        Te haz inscrito a los siguientes eventos
      </p>
      <div
        v-for="evento in eventos"
        :key="evento.id"
        class="grid grid-cols-12"
      >
        <!-- <v-btn @click="cancelarInscripcion(evento_data.id)"
          >Cancelar inscripción</v-btn
        > -->
        <div class="col-span-12 px-8 py-8 bg-white shadow-md rounded-lg border border-gray-200">
         <p class="text-2xl font-bold">{{ evento.titulo }}</p>
         <p class="text-justify flex items-start text-lg text-gray-600">
          {{ evento.descripcion }}
        </p>
        <div class="flex align-end">
            <v-icon class="mr-1">mdi-map-marker</v-icon>
            <p class="mb-0 font-light">{{ evento.ubicacion }}</p>
          </div>
         <div
            class="flex align-end items-center mt-6"
            v-if="evento.fecha_inicio"
          >
            <v-icon class="mr-1">mdi-calendar</v-icon>
             <span class="mb-0 font-light">
              {{ fechaFormateada(evento.fecha_inicio) }}
            </span>
           
          </div>
       </div>
      </div>
    </div>
  </div>
</template>

<script>
import EmptySection from "./EmptySection.vue";

export default {
  props: ["eventos"],
  components: { EmptySection },
  computed: {
    fechaFormateada() {
      const moment = require("moment");

      moment.locale("ES");

      return (fecha) => moment(fecha).format("dddd DD [de] MMMM YYYY");
    },
  }
};
</script>

<style>
</style>