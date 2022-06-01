export default {
    async loadPaginas({ commit }) {

        const qs = require('qs')

        const query = qs.stringify({
            populate: [
                'paginas.header',
                'paginas.header.imagen',
                'paginas.body',
                'paginas.body.imagen',
                'paginas.programas',
            ]
        })

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/servicios?${query}`)

        commit('setPaginas', data.data);
    }
}