export const getMenuStatus = (state) => {
  return state.menu;
}

export const getPaises = (state) => {
  return state.paises;
};

export const getRegiones = (state) => {
  return state.regiones;
};

export const getRegion = (state) => (codigo_region) => {
  return state.regiones.find((region) => region.codigo == codigo_region).nombre;
};

export const getProvincia = (state) => (codigo_provincia) => {
  return state.provincias.find((provincia) => provincia.codigo == codigo_provincia).nombre;
};

export const getComuna = (state) => (codigo_comuna) => {
  return state.comunas.find((comuna) => comuna.codigo == codigo_comuna).nombre;
};

export const getProvincias = (state) => (codigo_region) => {
  return state.provincias.filter((provincia) => provincia.codigo_padre == codigo_region);
};

export const getComunas = (state) => (codigo_provincia) => {
  return state.comunas.filter((comuna) => comuna.codigo_padre == codigo_provincia);
};
