'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Categoria extends Model {
    static get updatedAtColumn() {
        return false;
    }
    static get createdAtColumn() {
        return false;
    }
    articulos() {
        return this.hasMany('App/Models/Articulo');
    }
}

module.exports = Categoria
