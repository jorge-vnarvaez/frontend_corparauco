export default {
    async loadPaginas({ commit }) {

        const qs = require('qs');

        const query = qs.stringify({
            populate: [
                'paginas',
                'paginas.header',
                'paginas.header.imagen',
                'paginas.body',
                'paginas.body.imagen',
                'paginas.secciones',
                'paginas.secciones.imagen',
                'paginas.galeria',
                'paginas.galeria.imagenes',
            ]
        });

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/nosotros?${query}`)

        commit('setPaginas', data.data);

    },
    async loadDirectorio({ commit }) {

        const qs = require('qs');

        const query = qs.stringify({
            populate: [
                'pagina',
                'pagina.header',
                'pagina.header.imagen',
                'pagina.body',
                'pagina.body.imagen',
                'miembros',
                'miembros.foto_perfil'
            ]
        });

        const { data } = await this.$axios.get(`${this.$config.apiUrl}/api/directorio?${query}`)

        commit('setDirectorio', data.data);

    }
}