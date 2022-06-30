export default {
    setPagina(state, data) {

        const pagina = data.attributes;
        
        state.app_name = pagina.app_name;
        state.app_subtitle = pagina.app_subtitle;
        state.pagina = pagina;

    }
}