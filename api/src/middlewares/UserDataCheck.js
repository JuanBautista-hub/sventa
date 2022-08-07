'use strict'
const { check } = require('express-validator');
const { validateUsuario } = require('../helpers/UsuarioValidate');
const { Usuario } = require('../sqlserver');

const validateUser = [
    check('name')
        .isLength({ min: 3 })
        .exists()
        .not()
        .isEmpty(),
    check('email')
        .isLength({ min: 4 })
        .isEmail()
        .exists()
        .not()
        .isEmpty(),
    check('username')
        .isLength({ min: 4 })
        .exists()
        .not()
        .isEmpty(),
    check('tel')
        .isLength({ max: 10 })
        .isNumeric()
        .exists()
        .not()
        .isEmpty(),
  /*  check('photoprofile')
        .isLength({ min: 0 })
        .exists()
        .not()
        .isEmpty(),*/
    check('password')
        .isLength({ max: 15 })
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateUsuario(req, res, next)
    }
]

const checkExistEmail = async (Request, response, NextFunction) => {
    //constante donde se incluira el jwt response para hacer la consulta del id del usuario falta
    let usuario;
    let correoE = Request.body.email
    let correo;
    try {

        usuario = await Usuario.findOne({ where: { correo: correoE } });
        correo = usuario.correo;

        if (correo === Request.body.email) {
            return response.json('¡¡upps al parecer este usuario ya existe!!!! ')
        }
    } catch (error) {
        //return response.json('Ubo un error' + correoE)
        NextFunction();
    }




}

module.exports = { checkExistEmail, validateUser };