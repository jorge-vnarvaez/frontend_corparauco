export const actions = {
    async nuxtServerInit({ dispatch }) {
        await dispatch('organizadores/loadOrganizadores');
        await dispatch('organizaciones/loadOrganizaciones');
        await dispatch('formatos/loadFormatos');
        await dispatch('contenidos/loadContenidos');
        await dispatch('noticias/loadNoticias');
        await dispatch('eventos/loadAllEventos');
        await dispatch('eventos/loadEventosRecientes');
        await dispatch('programas/loadProgramas');
        await dispatch('paginas/inicio/loadPagina');
        await dispatch('paginas/nosotros/loadPaginas');
        await dispatch('paginas/nosotros/loadDirectorio');
        await dispatch('paginas/servicios/loadPaginas');
        await dispatch('paginas/contacto/loadPagina');
        await dispatch('paginas/emprendedores/loadEmprendedores');
        await dispatch('paginas/emprendedores/loadTestimonios');
        await dispatch('paginas/footer/loadPagina');
        await dispatch('session/loadUserStatus');
        await dispatch('ui/loadRegiones');
        await dispatch('ui/loadProvincias');
        await dispatch('ui/loadComunas');
    }
}