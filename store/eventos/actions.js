export default {
  async loadAllEventos({ commit }) {
    const qs = require("qs");

    const query = qs.stringify({
      sort: ["fecha_inicio:desc"],
      populate: [
        "imagen_referencia",
        "imagen_cover",
        "galeria",
        "secciones",
        "inscripciones",
        "inscripciones_meta",
        "contenidos",
        "users",
        "calendario"
      ],
    });

    const { data } = await this.$axios.get(
      `${this.$config.apiUrl}/api/eventos?${query}`
    );

    commit("setAllEventos", data.data);
  },
  async loadEventosRecientes({ commit }) {
    const qs = require("qs");
    const moment = require("moment");

    const start = moment(Date.now()).format("YYYY-MM-DD");
    const end = moment(Date.now()).add(8, "days").format("YYYY-MM-DD");

    const query = qs.stringify({
      sort: ["fecha_inicio:asc"],
      filters: {
        fecha_inicio: {
          $gt: start,
        },
        fecha_termino: {
          $lt: end,
        },
      },
      populate: [
        "imagen_referencia",
        "imagen_cover",
        "galeria",
        "secciones",
        "inscripciones",
        "calendario"
      ],
    });

    const { data } = await this.$axios.get(
      `${this.$config.apiUrl}/api/eventos?${query}`
    );

    commit("setEventosRecientes", data.data);
  },
};
