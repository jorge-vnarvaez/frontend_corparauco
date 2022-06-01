export default {
  async loadPagina({ commit }) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: [
        "correos",
        "telefonos",
        "direcciones",
        "rrss",
        "rrss.icon",
      ],
    });

    const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/footer?${query}`);

    commit('setPagina', data.data);
  },
};
