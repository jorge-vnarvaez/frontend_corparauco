export default {
    async loadFormatos({ commit }) {
        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/formatos`);

        commit('setFormatos', data.data);
    }
}