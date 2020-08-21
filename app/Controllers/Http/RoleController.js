'use strict'
const Tipo = use('App/Models/Tipo');
const User = use('App/Models/User');

class RoleController {
    async index({ auth }) {
        const user = await auth.getUser();
        const rol = await User.find(user.id);
        return await rol.tipo().fetch();
    }
}

module.exports = RoleController
