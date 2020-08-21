'use strict'
const Database = use('Database');
const Pedido = use('App/Models/Pedido');
class PedidoController {
    async index({ auth }) {
        const user = await auth.getUser();
        return await Database
            .select('descripcion', 'fecha_entrega', 'lugar_entrega', 'fecha_enterado', 'estatus')
            .from('users')
            .innerJoin('pedidos', 'users.id', 'pedidos.user_id')
            .innerJoin('ordenes', 'pedidos.id', 'ordenes.pedido_id')
            .where('users.id', user.id);
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
        console.log(`estatus`, estatus);
        console.log(`id`, id.id);
        const pedido = await Pedido.find(id.id);
        pedido.merge({ estatus: estatus });
        return await pedido.save();
    }
}
module.exports = PedidoController
