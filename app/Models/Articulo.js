'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Articulo extends Model {
    static get updatedAtColumn() {
        return false;
    }
    static get createdAtColumn() {
        return false;
    }
    categorias() {
        return this.hasMany('App/Models/Categoria')
    }
}

module.exports = Articulo
