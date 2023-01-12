export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('noticias/loadNoticias');
        await dispatch('paginas/footer/loadPagina');
        await dispatch('session/loadUserStatus');
        // await dispatch("ui/loadRegiones");
        // await dispatch("ui/loadProvincias");
        // await dispatch("ui/loadComunas");
    }
}