'use strict'
const Buzon = use('App/Models/Buzon');

class BuzonController {
    async sendmessage({ request }) {
        const { sesion, destinatario, destino, mensaje, fecha_envio } = request.all();
        const createmessage = await Buzon.create({
            sesion,
            destinatario,
            destino,
            mensaje,
            fecha_envio,
        });
        return createmessage;
    }
    async getmessages({ request }) {
        const { sesion } = request.all();
        const mensajes = await Buzon.query().where('sesion', sesion).fetch();
        return mensajes;
    }
}

module.exports = BuzonController
