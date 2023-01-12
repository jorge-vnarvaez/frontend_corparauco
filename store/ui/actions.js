export default {
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