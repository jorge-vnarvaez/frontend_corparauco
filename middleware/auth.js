export default function (context) {

    const jwt = context.$cookies.get('jwt');

    if(!jwt) {
        context.redirect(`iniciar_sesion?redirect=${context.route.path}`);
    }

}
