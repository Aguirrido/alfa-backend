'use strict'
const Articulo = use('App/Models/Articulo');
const Categoria = use('App/Models/Categoria');
const Database = use('Database');
const User = use('App/Models/User');
class ArticuloController {
    async index() {
        return await Articulo.all();
    }
    async showarticles() {
        return await Database
            .select('articulos.id', 'articulos.nombre as nombre', 'categorias.nombre as categoria', 'articulos.precio', 'articulos.descripcion')
            .from('articulos')
            .innerJoin('categorias', 'categorias.id', 'articulos.categoria');

    }
    async showarticle({ request }) {
        const { id } = request.all();
        return await Database
            .select('articulos.id', 'articulos.nombre as nombre', 'categorias.nombre as categoria', 'articulos.precio', 'articulos.descripcion', 'categorias.id as cat_id')
            .from('articulos')
            .innerJoin('categorias', 'categorias.id', 'articulos.categoria')
            .where('articulos.id', id);
    }

    async create({ request }) {
        const { nombre, categoria, precio, descripcion, img_src } = request.all();

        const articulo = await Articulo.create({
            nombre,
            categoria,
            precio,
            descripcion,
            img_src
        });

        return articulo;
    }
    async destroy({ params }) {
        const { id } = params;
        const article = await Articulo.find(id);
        await article.delete();
        return article;
    }
    async update({ request }) {
        const { id, nombre, precio, categoria, descripcion } = request.all();
        const article = await Articulo.find(id);
        article.merge({ nombre: nombre, precio: precio, categoria: categoria, descripcion: descripcion });
        return await article.save();

    }
    async getcat() {
        return await Categoria.all();
    }
}



module.exports = ArticuloController
