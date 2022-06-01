export default {
    async loadContenidos({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            sort: ['updatedAt:desc'],
            populate: [
                'imagen_referencia',
                'archivo',
                'archivo.archivo',
                'formato',
                'organizadores',
            ],
        })

        const  { data } = await this.$axios.get(`${this.$config.apiUrl}/api/contenidos?${query}`);

        commit('setContenidos', data.data);
    }
}