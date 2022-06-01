export default {
    async loadPagina({ commit }) {

        const qs = require('qs');

        const query = qs.stringify({
            populate: [
                'header',
                'header.imagen',
                'body',
                'body.imagen',
            ],
        })

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/contacto?${query}`);

        commit('setPagina', data.data);
    }
}