export const getPaginas = (state) => {
    return state.paginas;
}

export const getPagina = (state) => (path) => {
    return state.paginas.find(paginas => paginas.path == path);
}