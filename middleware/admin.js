export default async function (context) {

    const userId = context.$cookies.get('user');

    const { data } = await context.$axios.get(`${context.$config.apiUrl}/api/users/${userId}`);

    if (!data.is_admin) {
        context.redirect('acceso_denegado');
    } 
}