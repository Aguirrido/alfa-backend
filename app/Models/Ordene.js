'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Ordene extends Model {
    static get updatedAtColumn() {
        return false;
    }
    static get createdAtColumn() {
        return false;
    }
    pedidos() {
        return this.belongsTo('App/Models/Pedido')
    }
}

module.exports = Ordene
