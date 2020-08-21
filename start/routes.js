'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')


Route.group(() => {
  // api: usuario
  Route.post('usuario/login', 'UserController.login');
  Route.post('usuario/register', 'UserController.store');
  Route.get('usuario/data', 'UserController.index').middleware(['auth']);
  Route.patch('usuario', 'UserController.update').middleware(['auth']);
  Route.delete('usuario', 'UserController.destroy').middleware(['auth']);
  Route.post('usuario/logout', 'UserController.logout').middleware(['auth']);
  // TODO: realizar apis Pedidos
  Route.get('showpedidos', 'PedidoController.index').middleware(['auth']);
  Route.get('showallpedidos', 'PedidoController.getped').middleware(['auth']);
  Route.post('pedidos', 'PedidoController.create');
  Route.delete('pedidos/:id', 'PedidoController.destroy');
  Route.patch('pedidos', 'PedidoController.update');
  // TODO: realizar apis Ordenes
  Route.get('pedidos/:id/ordenes', 'OrdenController.index').middleware(['auth']);
  Route.post('pedidos/:id/ordenes', 'OrdenController.create').middleware(['auth']);
  Route.post('ordenes', 'OrdenController.create');
  Route.delete('ordenes/:id', 'OrdenController.destroy').middleware(['auth']);
  Route.patch('ordenes/:id', 'OrdenController.update').middleware(['auth']);
  // TODO: realizar apis Articulos
  Route.get('articulos', 'ArticuloController.index');
  Route.get('showarticulos', 'ArticuloController.showarticles');
  Route.post('showarticulo', 'ArticuloController.showarticle');
  Route.get('bestarticulos', 'ArticuloController.best');
  Route.post('articulos', 'ArticuloController.create');
  Route.patch('articulos', 'ArticuloController.update');
  Route.delete('delarticulos/:id', 'ArticuloController.destroy');
  // TODO: realizar apis Categorias
  Route.get('categorias', 'ArticuloController.getcat');


  // RUTA DEL ROL
  Route.get('/roles', 'RoleController.index').middleware(['auth']);
  //Admin
  Route.get('usuario/getUsers', 'UserController.getUsers');
  Route.get('usuario/Userfind', 'UserController.Userfind');
  Route.post('usuario/UpdateUser', 'UserController.UpdateUser');


}).prefix('api/');
