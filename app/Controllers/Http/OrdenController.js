'use strict'
const Database = use('Database');
const Ordene = use('App/Models/Ordene');

class OrdenController {

	async create({ request }) {
        const { pedido_id, fecha_enterado, fecha_entrega, lugar_entrega, map_src  } = request.all();

        const orden = await Ordene.create({
            pedido_id,
            fecha_enterado,
            fecha_entrega,
            lugar_entrega,
            map_src
        });

        return orden;
    }
}

module.exports = OrdenController
