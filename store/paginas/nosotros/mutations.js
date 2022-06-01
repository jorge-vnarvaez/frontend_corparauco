export default {
    setPaginas(state, data) {

        const { paginas } = data.attributes;

        state.paginas = paginas;

    },
    setDirectorio(state, data) {

        const { pagina } = data.attributes;
        const { miembros } = data.attributes;

        pagina.miembros = miembros;

        state.paginas.push(pagina);

    }
}