'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Tipo extends Model {
    static get updatedAtColumn() {
        return false;
    }
    static get createdAtColumn() {
        return false;
    }
    user() {
        return this.belongsToMany('App/Models/User').pivotTable('users_tipo');
    }
}

module.exports = Tipo
