const { validationResult} = require('express-validator');

const validateUsuario = (req, res, next)=>{
    try {
        validationResult(req).throw()
      return next()
    } catch (error) {
        res.status(403)
        res.send({errors :error.array()})
    }
}
module.exports = {validateUsuario}