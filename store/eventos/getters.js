export const getEventos = (state) => {
  return state.eventos;
}

export const getEventosRecientes = (state) => {
  return state.eventosRecientes;
}

export const getEvento = (state) => (id) => {
  return state.eventos.find((evento) => evento.id == id);
}

export const getUltimoEvento = (state) => {
  return state.eventos[0]
}

export const getEventoPrivacy = (state) => (id) => {
  return state.eventos.find((evento) => evento.id == id).attributes.is_public;
};
