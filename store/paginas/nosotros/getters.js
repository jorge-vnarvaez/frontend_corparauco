export const getPaginas = (state) => {
  return state.paginas;
};

export const getPagina = (state) => (path) => {
  return state.paginas.find(pagina => pagina.path == path);
}

export const getQuienesSomos = (state) => {
  return state.paginas.find(pagina => pagina.path == 'quienes-somos');
}