export default {
    setPaises(state, data) {
        state.paises = data;
    },
    toggleMenu(state) {
        state.menu = !state.menu;
    },
    hideMenu(state) {
        state.menu = false;
    },
    setScales(state, data) {
        state.responsive_chart_scale = data;
    }
}