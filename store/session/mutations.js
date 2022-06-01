export default {
  setSession(state, data) {
    this.$cookies.set("jwt", data.session.jwt);

    const user = data.session.user;

    this.$cookies.set("user", user.id);

    state.error = false;

    state.is_logged = true;

    this.$router.push(data.params);
  },
  removeSession(state) {
    this.$cookies.remove("user");
    this.$cookies.remove("jwt");

    state.is_logged = false;

    this.$router.push("/");
  },
  setUserStatus(state, data) {
    if (data) {
      state.is_logged = true;
    } else {
      state.is_logged = false;
    }
  },
  hasLoginError(state) {
    state.error = true;
  },
};
