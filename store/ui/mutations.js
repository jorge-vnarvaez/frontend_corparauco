export default {
    setPaises(state, data) {
        state.paises = data;
    },
    setRegiones(state, data) {
        state.regiones = data;
    },
    setProvincias(state, data) {
        state.provincias = data;
    },
    setComunas(state, data) {
        state.comunas = data;
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