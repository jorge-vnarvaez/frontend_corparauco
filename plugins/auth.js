export default ({ app }, inject) => {    
    inject('auth', (to, id) => app.redirect({ name: to, params: { id: id }}));
}