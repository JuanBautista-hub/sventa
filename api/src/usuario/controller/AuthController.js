'use strict'
const { Usuario, t_RoleUsuario } = require('../../sqlserver');
const response = require('../../helpers/response');
const bcrypt = require('bcryptjs');
const JWToken = require('jsonwebtoken');
const config = require('../../../config/configSecret')
const emailSend = require('../../helpers/nodemailer');
'use strict'
const { LoginUsuario } = require('../service/Auth');



const Login = async (req, res, next) => {
    const credential = req.body;
    try {
        let usuario = await LoginUsuario(credential);
        res.json(usuario)
    } catch (error) {
        next(error)
    }

}

/*
const ChangePassword = async (req, res, next) => {

    try {
        let respuesta = await changePassword(req)
        let resp;
        if (respuesta === true) {
            resp = res.redirect('../../public/verificar/verificado.html')

        }
        else if (respuesta === false) {
            resp = res.redirect('../../public/verificar/error.html')
        } else {
            resp = res.redirect('../../public/verificar/index.html')
        }
        return resp;
    } catch (error) {
        next(error)
    }
}*/
/*
let respuesta;
let user;

async function LoginUsuario(credential) {
    const { username, password } = credential

    try {
        user = await Usuario.findOne({ where: { username: username }, include: [{ model: t_RoleUsuario, required: true }] })
        console.log(user.contrasenia)
        if (checkPassword(password, user.contrasenia)) {
            //envio el token
            const token = JWToken.sign({ userId: user.usuarioID, email: user.correo, rol: user.t_RoleUsuario.rolNombre }, config.jwtSecret, { expiresIn: '5h' });
            const perfil = dataInyect(user)

            respuesta = { token, perfil }
        } else {
            respuesta = 'Usuario o contraseña incorecta'
        }
    } catch (error) {
        respuesta = 'Usuario o contraseña incorecta' + error
    }
    return respuesta
}

function checkPassword(password, password2) {
    return bcrypt.compareSync(password, password2)
}


function dataInyect(respuesta) {
    return new UsuarioModel(
        respuesta.usuarioID,
        respuesta.nombre,
        respuesta.correo,
        respuesta.usuario,
        respuesta.telefono,
        respuesta.avatar,
        respuesta.password,
        respuesta.t_RoleUsuario.rolNombre,
    )
}


async function changePassword(data) {
    let token = data.params.token
    let defaulPass = data.body.defaultPass
    let newPass = data.body.newPass
    let jwtPayload;
    let usuario;

    try {
        jwtPayload = JWToken.verify(token, config.jwtSecret);
        const { mail } = jwtPayload

        usuario = await Usuario.findOne({ where: { correo: mail } })

        //let mail = usuario.correo
        let confirDataUser = usuario

        if (mail === usuario.correo) {
            if (usuario.emailVerification === false) {
                const userRepo = new UsuarioModel()
                //userRepo.contrasenia = newPass;
                userRepo.emailVerification = true;
                //  userRepo.passworDefault = false;

                //var salt = bcrypt.genSaltSync(10);
                //userRepo.contrasenia = bcrypt.hashSync(userRepo.contrasenia, salt);

                usuario = await Usuario.update(userRepo, { where: { usuarioID: usuario.usuarioID } });

                if (usuario) {
                    respuesta = "Correo verificado satisfactoriamente"
                    dataSend(confirDataUser, respuesta)
                }
                //respuesta = true
            } else {
                respuesta = true
                console.log(respuesta)
            }


        } else {
            respuesta = false
        }

    } catch (error) {
        respuesta = false
    }
    return respuesta
}

async function dataSend(req, res, next) {
    emailSend(req, res, next).catch(console.error)
}*/
module.exports = { Login };