export default {
    async loadRegiones({ commit }) {
        const { data } = await this.$axios.get(`https://apis.digital.gob.cl/dpa/regiones`);

        commit('setRegiones', data);
    },
    async loadProvincias({ commit }) {
        const { data } = await this.$axios.get(`https://apis.digital.gob.cl/dpa/provincias`);

        commit('setProvincias', data);
    },
    async loadComunas({ commit }) {
        const { data } = await this.$axios.get('https://apis.digital.gob.cl/dpa/comunas');

        commit('setComunas', data);
    },
    toggleMenu({ commit }) {
        commit('toggleMenu');
    },
    hideMenu({ commit }) {
        commit('hideMenu');
    }
}