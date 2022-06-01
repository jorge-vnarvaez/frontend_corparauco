export default {
    async loadPagina({ commit }) {

        const qs = require('qs');

        const query = qs.stringify({
            populate: [
                'app_logo',
                'header',
                'header.imagen',
                'caracteristicas',
                'organizaciones',
                'organizaciones.logo',
                'caracteristicas.icon',
                'noticias',
                'noticias.imagen_referencia'
            ]
        })

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/inicio?${query}`);

        commit('setPagina', data.data);

    }
}