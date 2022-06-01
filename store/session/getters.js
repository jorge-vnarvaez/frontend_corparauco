export default {
    getError(state) {
        return {
            value: state.error,
            errorMsg: state.errorMsg,
        }
    },
    getUserStatus(state) {
        return state.is_logged;
    },
    getUser(state) {
        return state.user;
    }
}