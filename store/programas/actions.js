export default {
    async loadProgramas({ commit }) {

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/programas`);

        commit('setProgramas', data.data);

    }
}