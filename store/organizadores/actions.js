export default {
    async loadOrganizadores({ commit }) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/organizadores`);

        commit('setOrganizadores', data.data);
    }
}