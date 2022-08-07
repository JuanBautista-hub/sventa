const { req, res, next } = require('express');
const { Usuario, t_RoleUsuario } = require('../sqlserver');

const checkRole = (role) => {

    return async (req, res, next) => {
        //constante donde se incluira el jwt response para hacer la consulta del id del usuario falta
        /*   const { userId } = res.locals.jwtPayload
           let usuario;
   
           try {
               console.log(userId)
               let id = userId
               usuario = await Usuario.findOne({ where: { UsuarioID: id }, include: [{ model: t_RoleUsuario }] });
               const rol = usuario.t_RoleUsuario.rolNombre;
               if (role.includes(rol)) {
                   next();
               } else {
                   return res.json('¡¡upps not autorized, sorry!!!! ')
   
               }
           } catch (error) {
               return res.json('!I´m sorry, upps not autorized')
           }
   
   
       }*/

        //checar rol sin consulta 
        const { rol } = res.locals.jwtPayload
        if (role.includes(rol)) {
            next();
        } else {
            return res.json('¡¡upps not autorized, sorry!!!! ')

        }
    }

}
module.exports = checkRole 