'use strict'
const Database = use('Database');
const Pedido = use('App/Models/Pedido');
class PedidoController {
    async index({ auth }) {
        const user = await auth.getUser();
        // posible solucion
        const pedido = await Pedido.query().where('user_id', user.id).fetch();
        return pedido;
        // query anterior
        // return await Database
        //     .select('descripcion', 'estatus')
        //     .from('users')
        //     .innerJoin('pedidos', 'users.id', 'pedidos.user_id')
        //     .where('users.id', user.id);
    }

    async getped({ auth }) {
        return await Database
            .select('pedidos.id', 'username', 'descripcion', 'estatus')
            .from('users')
            .innerJoin('pedidos', 'users.id', 'pedidos.user_id')
    }

    async create({ request }) {
        const { user_id, descripcion, estatus } = request.all();

        const pedido = await Pedido.create({
            user_id,
            descripcion,
            estatus
        });

        return pedido;
    }
    async update({ request }) {
        const { id, estatus } = request.all();
        const pedido = await Pedido.find(id.id);
        pedido.merge({ estatus: estatus });
        return await pedido.save();
    }
}
module.exports = PedidoController
