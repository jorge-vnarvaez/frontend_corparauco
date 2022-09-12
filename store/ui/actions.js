export default {
    async loadRegiones({ commit }) {
        const { data } = await this.$axios.get(`https://apis.digital.gob.cl/dpa/regiones`, {
            Headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });

        commit('setRegiones', data);
    },
    async loadProvincias({ commit }) {
        const { data } = await this.$axios.get(`https://apis.digital.gob.cl/dpa/provincias`, {
            Headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });

        commit('setProvincias', data);
    },
    async loadComunas({ commit }) {
        const { data } = await this.$axios.get('https://apis.digital.gob.cl/dpa/comunas', {
            Headers: {
                'Access-Control-Allow-Origin': '*',
            }
        });

        commit('setComunas', data);
    },
    toggleMenu({ commit }) {
        commit('toggleMenu');
    },
    hideMenu({ commit }) {
        commit('hideMenu');
    },
    printScales({ commit }, max_value) {
        let scales = [];


        if (max_value <= 20) {
            for (let i = 0; i <= max_value; i++) {
                scales.push(i);
            }
        }

        if (max_value > 20 && max_value <= 50) {
            for (let i = 0; i <= max_value; i += 5) {
                scales.push(i);
            }
        }

        commit('setScales', scales);
    }
}