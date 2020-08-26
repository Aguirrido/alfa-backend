'use strict'
const Database = use('Database');
const Pedido = use('App/Models/Pedido');
const User = use('App/Models/User');
class PedidoController {
    async index({ auth }) {
        const user = await auth.getUser();
        return await Database
            .select('descripcion', 'estatus')
            .from('users')
            .innerJoin('pedidos', 'users.id', 'pedidos.user_id')
            .where('users.id', user.id);
    }
  async pruebapedidos({response, request}) {
    const { id } = request.all();
    console.log(id);
    const user = await User.findBy('id', id);
    return await Database
      .select('descripcion', 'estatus')
      .from('users')
      .innerJoin('pedidos', 'users.id', 'pedidos.user_id')
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
        const pedido = await Pedido.find(id.id);
        pedido.merge({ estatus: estatus });
        return await pedido.save();
    }
}
module.exports = PedidoController
