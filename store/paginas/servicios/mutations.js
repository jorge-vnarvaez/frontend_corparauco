export default {
    setPaginas(state, data) {

        const { paginas } = data.attributes;

        state.paginas = paginas;

    }
}