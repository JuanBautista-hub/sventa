'use strict'
const { Usuario, t_RoleUsuario,Perfil ,Suscripcion,Club} = require('../../sqlserver');
const response = require('../../helpers/response');
const emailSend = require('../../helpers/nodemailer');

const bcrypt = require('bcryptjs');
const path = require('path');
const fs = require('fs-extra');

let respuesta;
let user;

/* =======Promesa para enviar y recibir datos en el async await =========*/

const usuarioCrud = {
    UsuarioGet: (req, res, next) => {
        const { userID } = req.params;
        UsuarioGetByIdAndALl(userID).then((user) => { response.success(req, res, user, 200) }).catch(next)
    },
    UsuarioPostAndPacth: (req, res, next) => {
        const { userID } = req.params
        const userData = req.body

        const avatarRuta = req.file

        UsuarioCreate(userData, userID, avatarRuta).then((user) => {

            response.success(req, res, user, 200)
        }).catch(next)
    },
    UsuarioDelete: (req, res, next) => {
        const { userID } = req.params
        UsuarioDestroy(userID).then((resp) => { response.success(req, res, resp, 200) }).catch(next)
    },


}


/* =======Funcion asincrona (async / await) para 2 consultas usuarios all and one =========*/

async function UsuarioGetByIdAndALl(id) {

    try {
        if (id) {
            user = await Usuario.findOne({ where: { usuarioID: id }, include: [
                { model: t_RoleUsuario, required: true },
                { model: Perfil, required: true },
                { model: Suscripcion,include:[{model:Club}] }] })
            respuesta = user
            return dataInyect(respuesta);
        } else {
            user = await Usuario.findAll({ include: [
                { model: t_RoleUsuario, required: true },
                { model: Perfil, required: true },
                { model: Suscripcion, required: true,include:[{model:Club,require:true}] }],
                 where: { eliminado: false } });
            respuesta = user

            return user
        }

    } catch (error) {
        respuesta = '!!Uppss Ubo un error ';
    }
    // return respuesta
}

/* =======Funcion asincrona (async / await) crear y actualizar usuarop post patch =========*/

async function UsuarioCreate(userBody, userID, avatarRuta) {
    const userBodyD = userBody;
    let ruta;
    let ext;

    if (avatarRuta) {
        ext = path.extname(avatarRuta.originalname).toLowerCase();
        const directionImage = avatarRuta.path
        const targetPath = path.resolve(`public/avatar/${userBodyD.username}${ext}`)
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
            ruta = await fs.rename(directionImage, targetPath)

        }
    }

    const { name, email, username, tel, photoprofile, password, rol, deleteUser, activo,fechaNacimiento ,apellido1,apellido2,sexo} = userBody

    const userRepo = new UsuarioModel()
    
       try {

        if(rol){userRepo.roleID = rol;}
        if(ext!=undefined){ userRepo.avatar = `${userBodyD.username}${ext}`;}
        if(name){ userRepo.nombre = name;}
        if(email){userRepo.correo = email.toLowerCase();}
        if(username){ userRepo.username = username;}
        if(tel){ userRepo.telefono = tel;}
        if (activo) { userRepo.activo = activo; }
        
        if (userID && userBodyD) {
            if (deleteUser) {userRepo.eliminado = true; respuesta = 'Usuario eliminado'} 
            else { userRepo.eliminado = false; respuesta = 'Usuario Actualizado' }

            user = await Usuario.update(userRepo, { where: { UsuarioID: userID } })
            //respuesta = 'Usuario Actualizado'
        } else if (userBodyD) {

              
            //  userRepo.contrasenia = password;
            if (!password) {
                //password temporal
                userRepo.contrasenia = username
               
            } else {
                userRepo.contrasenia = password
                console.log(username)
            }
            var salt = bcrypt.genSaltSync(10);
            userRepo.contrasenia = bcrypt.hashSync(userRepo.contrasenia, salt);
            
            const perfilRepo ={
            nombre : userRepo.nombre,
                correo  : userRepo.correo.toLowerCase(),
                fechaNacimiento  :fechaNacimiento,
                activo  :true,
                telefono  : tel,
                eliminado  : false,
                apellido1  : apellido1,
                apellido2  : apellido2,
                sexo  : sexo,
            }
           
           
          
         const perfilCreate =   await Perfil.create(perfilRepo)
            userRepo.perfilID = perfilCreate.perfilID
            user = await Usuario.create(userRepo)
           
            if (user) {
                dataSend(user)
            }
            respuesta = 'El usuario se creo correctamente. Verificar en la bandeja del correo electronico para el cambio de su contraseña'
        }
    } catch (error) {
        respuesta = '!!Uppss Ubo un error ' +error;

    }
    return respuesta

}

/* =======Funcion asincrona (async / await) eliminar  1 usuario =========*/

async function UsuarioDestroy(userID) {
    try {
        user = await Usuario.destroy({ where: { UsuarioID: userID } })
    } catch (error) {
        respuesta = 'Ubo un error'
    }
    respuesta = 'Usuario eliminado correctamente'
    return respuesta
}


async function dataSend(req, res, next) {
    emailSend(req, res, next).catch(console.error)
}


module.exports = usuarioCrud;