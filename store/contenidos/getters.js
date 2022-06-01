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
    (contenido) => contenido.attributes.formato.data.attributes.name == "Videos"
  );
};

export const getInfografias = (state) => (contenidos) => {
  return contenidos.filter(
    (contenido) =>
      contenido.attributes.formato.data.attributes.name == "Infografías"
  );
};

export const getClases = (state) => (contenidos) => {
  return contenidos.filter(
    (contenido) =>
      contenido.attributes.formato.data.attributes.name == "Guías y clases"
  );
};

export const getNContenidos = (state) => (title) => {
  return state.contenidos.map(function (contenido) {
    return contenido.attributes.organizadores.data.filter((organizador) => organizador.attributes.title == title).length;
  }).reduce((total, n) => total + n);
};

