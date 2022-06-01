export default {
  async loadTestimonios({ commit }) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ["testimonios", "testimonios.imagen", "header", "header.imagen", "body", "indicadores"],
    });

    const { data } = await this.$axios.get(
      `${this.$config.apiUrl}/api/testimonios?${query}`
    );

    commit("setPaginaTestimonios", data.data);
  },
  async loadEmprendedores({ commit }) {
    const qs = require("qs");

    const query = qs.stringify({
      populate: ['header', 'header.imagen', 'organizaciones', 'organizaciones.logo'],
    });

    const { data } = await this.$axios.get(
      `${this.$config.apiUrl}/api/emprendedores?${query}`
    );

    commit("setPaginaEmprendedores", data.data);
  },
};
