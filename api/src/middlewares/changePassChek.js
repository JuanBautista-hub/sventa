'use strict'
const { check } = require('express-validator');
const { validateUsuario } = require('../helpers/UsuarioValidate');

const validateChangePass = [
    check('defaultPass')
        .isLength({ min: 5 })
        .exists()
        .not()
        .isEmpty(),
        check('newPass')
        .isLength({ min: 5 })
        .exists()
        .not()
        .isEmpty(),
    (req, res, next) => {
        validateUsuario(req, res, next)
    }
]



module.exports = {  validateChangePass };