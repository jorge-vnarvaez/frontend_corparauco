export const getNoticias = (state) => {
    return state.noticias;
}

export const getUltimaNoticia = (state) => {
    return state.noticias[0];
}

export const getNoticia = (state) => (id) => {
    return state.noticias.find(noticia => noticia.id == id);
}