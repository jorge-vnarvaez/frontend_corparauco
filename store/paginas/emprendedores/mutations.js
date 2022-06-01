export default {
    setPaginaEmprendedores(state, data) {

        const pagina = data.attributes;

        state.paginaEmprendedores = pagina;

    },
    setPaginaTestimonios(state, data) {

        const pagina = data.attributes;

        state.paginaTestimonios = pagina;

    }
}