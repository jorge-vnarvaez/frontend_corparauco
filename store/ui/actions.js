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

        switch (max_value) {
            case 20:
                scales = [0, 5, 10, 15, 20];
                break;
            case 50:
                scales = [0, 10, 20, 30, 40, 50];
                break;
            case 100:
                scales = [0, 20, 40, 60, 80, 100];
                break;
            case 200:
                scales = [0, 40, 80, 120, 160, 200];
                break;
            case 500:
                scales = [0, 100, 200, 300, 400, 500];
                break;
            case 1000:
                scales = [0, 200, 400, 600, 800, 1000];
                break;
            case 2000:
                scales = [0, 400, 800, 1200, 1600, 2000];
                break;
            case 5000:
                scales = [0, 1000, 2000, 3000, 4000, 5000];
                break;
            case 10000:
                scales = [0, 2000, 4000, 6000, 8000, 10000];
                break;
            case 20000:
                scales = [0, 4000, 8000, 12000, 16000, 20000];
                break;
            case 50000:
                scales = [0, 10000, 20000, 30000, 40000, 50000];
                break;
            case 100000:
                scales = [0, 20000, 40000, 60000, 80000, 100000];
                break;
            default: 
                if(max_value <= 20) {
                    for(let i = 0; i <= max_value; i++) {
                        scales.push(i);
                    }
                } 
                break;
        }

        commit('setScales', scales);

    }
}