<template>
  <div v-if="logs.length > 0">
    <v-data-table
      :headers="headers"
      :items="logs"
      multi-sort
      class="elevation-1"
      locale="es"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: "Nombre usuario", value: "username" },
        { text: "Contenidos Finalizados", value: "contenidos_finalizados" },
        { text: 'Cursos Visualizados', value: "cursos_visualizados" },
        { text: 'Cursos Finalizados', value: "cursos_finalizados" },
        { text: 'Programas Visualizados', value: "programas_visualizados" },
        { text: 'Organizadores Visualizados', value: "organizadores_visualizados" },
        { text: 'Contenidos Consumidos', value: "contenidos_consumidos" },
      ],
      logs: [],
    };
  },
  async fetch() {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["log", "log.keys", "log.keys.values"],
    });

    const { data } = await fetch(
      `${this.$config.apiUrl}/api/logs?${query}`
    ).then((res) => res.json());

    const usersData = await fetch(`${this.$config.apiUrl}/api/users`).then((res) =>
      res.json()
    );

    // using data from the response create and array of users with the user_id as the key
    data.forEach((d) => {
      const userData = usersData.find((u) =>  u.id == d.attributes.user_id)

      this.logs.push({
        user_id: d.attributes.user_id,
        username:  userData != null ? userData.nombre + ' ' + userData.apellidoPaterno + ' ' + userData.apellidoMaterno   : 'Usuarios no registrados',
        contenidos_finalizados: d.attributes.log.keys.find(
          (log) => log.action == "Finalizó un contenido"
        ) ? d.attributes.log.keys.find((log) => log.action == "Finalizó un contenido").values.length : 0,
        cursos_visualizados: d.attributes.log.keys.find(
          (log) => log.action == "Visitó un curso"
        ) ? d.attributes.log.keys.find((log) => log.action == "Visitó un curso").values.length : 0,
        cursos_finalizados: d.attributes.log.keys.find(
          (log) => log.action == "Finalizó un curso"
        ) ? d.attributes.log.keys.find((log) => log.action == "Finalizó un curso").values.length : 0,
        programas_visualizados: d.attributes.log.keys.find(
          (log) => log.action == "Visitó un programa"
        ) ? d.attributes.log.keys.find(
          (log) => log.action == "Visitó un programa"
        ).values.length : 0,
        organizadores_visualizados: d.attributes.log.keys.find(
          (log) => log.action == "Visitó un organizador"
        ) ? d.attributes.log.keys.find(
          (log) => log.action == "Visitó un organizador"
        ).values.length : 0,
        contenidos_consumidos: d.attributes.log.keys.find(
          (log) => log.action == "Consumió un contenido"
        ) ? d.attributes.log.keys.find(
          (log) => log.action == "Consumió un contenido"
        ).values.length : 0,
      });
    });

  },
};
</script>

<style></style>
