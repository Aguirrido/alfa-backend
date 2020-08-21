'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Pedido extends Model {
    static get updatedAtColumn() {
        return false;
    }
    static get createdAtColumn() {
        return false;
    }
    user() {
        return this.belongsTo('App/Models/User')
    }
    ordenes() {
        return this.hasMany('App/models/Ordene')
    }
}

module.exports = Pedido
