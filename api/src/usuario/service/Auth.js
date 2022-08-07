const usuarioRepository = require('../repository/usuariorepository')
const {desencriptar} = require('../../helpers/bcryp')
async function LoginUsuario(credencial) {
try {
    let login

    login = await usuarioRepository.login(credencial.username)
    if (desencriptar(credencial.password, login.contrasenia)) {
        //envio el token
        return login
    }

    return false
} catch (error) {
    return error
}
}

module.exports = { LoginUsuario }