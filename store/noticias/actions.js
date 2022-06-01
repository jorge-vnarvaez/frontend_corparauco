export default {
    async loadNoticias({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            sort: ['fecha_publicacion:desc'],
            populate: [
                'imagen_referencia',
                'secciones',
                'secciones.imagen'
            ]
        })

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/noticias?${query}`);

        commit('setNoticias', data.data);
    }
}