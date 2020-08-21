'use strict'
const User = use('App/Models/User');
class UserController {
  async login({ request, auth, response }) {
    const { email, password } = request.all();
    const user = await User.findBy('email', email);
    if (user) {
      const token = await auth.withRefreshToken().attempt(email, password);
      const username = user.username;

      return response.status(200).send({ message: 'OK', data: { token, username, email } });
    }
    else {
      return response.status(404).send({ status: 'notFound', message: 'Usuario no Encontrado' });
    }
  }
  async store({ request, response }) {
    // try {
    const { email, username, password, tipo_usr } = request.all();
    // hace la busqueda en el modelo si existe el usurio y esta a la espera del servidor

    const Vuser = await User.findBy('username', username);
    if (!Vuser) {

      const Vemail = await User.findBy('email', email);
      if (!Vemail) {
        // hace la creacion despues de la espera de la respuesta del servidor
        const user = await User.create({
          username,
          email,
          password,
        });
        const usr = await User.findBy('email', email);
        const rol = await usr.tipo().attach();
        // Manda los argumentos del usuario registrado directamente al login
        return this.login(...arguments);
      }
      else {
        return response.status(406).send({ status: 'notAcceptable', message: 'Email Existente' });
      }
    }
    else {
      return response.status(406).send({ status: 'notAcceptable', message: 'Nombre de usuario existente' });
    }

    // }
    // catch (err) {
    // return response.status(500).send({ status: 'internalServerError', message: 'Conexion Perdida' });
    // }
  }
  async index({ auth }) {
    return await auth.getUser();
  }
  async logout({ auth }) {
    return await auth.logout();
  }


  //admin//
  async getUsers({request,response} ){
    try{
     const users = await User.all();
     response.status(200).send({status:"Ok", data:users});
    }
    catch (error){
     response.status(500).send({status:"Error", message:"Error con los usuarios", error:error});
    }
};
  async Userfind({request,response} ){
    const {username} = request.all();
    const user = await User.findBy('username', username);
      if(user){
     return    response.status(200).send({status:"Ok", data:user});
      }
      else {
      return   response.status(500).send({status:"Error", message:"usuario no encontrado"});
      }

  }
    async UpdateUser({request,response} ){
    const {username, usernamenew, emailnew} = request.all();
    const user = await User.findBy('username', username);
  if (user) {
    if (usernamenew !== null) {

      const userneww = await User.findBy('username', usernamenew);
      if (userneww == null) {
        user.username = usernamenew;
        await user.save()

      } else {
        return response.status(500).send({status: "Error", message: "Ya existe, elija otro", username});
      }
    }

    if (emailnew !== null) {
      const email = await User.findBy('email', emailnew);
      if (email == null) {
        user.email = emailnew;
        await user.save()

      } else {
        return response.status(500).send({status: "Error", message: "Ya existe, elija otro", username});
      }
    }
    return response.status(200).send({status: "Ok", data: user});
  }
        else {
          return response.status(404).send({status: "Error", message: "Ya", username});
        }


    }

}

module.exports = UserController
