export default {
  async login({ commit }, options) {
    try {
      const { data }  = await this.$axios.post(
        `${this.$config.apiUrl}/api/auth/local`,
        {
          identifier: options.credenciales.email,
          password: options.credenciales.password,
        }
      );

      commit('setSession', { session: data, params: options.params });
    } catch (e) {
      commit('hasLoginError');
    }
  },
  loadUserStatus(context) {
      const jwt = this.$cookies.get('jwt')

      context.commit('setUserStatus', jwt);
  },
  desconectar({ commit }) {
    commit('removeSession');
  }
};
