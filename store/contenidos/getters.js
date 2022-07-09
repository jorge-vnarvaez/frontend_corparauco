export const getContenidos = (state) => {
  return state.contenidos;
};

export const getContenido = (state) => (id) => {
  return state.contenidos.find((contenido) => contenido.id == id);
};

export const getLastContenido = (state) => {
  return state.contenidos[0];
};

export const getVideos = (state) => (contenidos) => {
  return contenidos.filter(
    (contenido) => contenido.attributes.formato.data.attributes.nombre == "Videos"
  );
};

export const getInfografias = (state) => (contenidos) => {
  return contenidos.filter(
    (contenido) =>
      contenido.attributes.formato.data.attributes.nombre == "Infografías"
  );
};

export const getClases = (state) => (contenidos) => {
  return contenidos.filter(
    (contenido) =>
      contenido.attributes.formato.data.attributes.nombre == "Guías y clases"
  );
};

export const getNContenidos = (state) => (title) => {
  return state.contenidos.length > 0 ? state.contenidos.map(function (contenido) {
    return contenido.attributes.organizadores.data.filter((organizador) => organizador.attributes.titulo == title).length;
  }).reduce((total, n) => total + n) : 0;
};

