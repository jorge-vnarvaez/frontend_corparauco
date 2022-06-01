export default {
    async loadOrganizaciones({ commit }) {
        const qs = require('qs');

        const query = qs.stringify({
            populate: [
                'logo'
            ]
        })

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/organizacions?${query}`);

        commit('setOrganizaciones', data.data);
    }
}