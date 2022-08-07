'use strict'
const { t_RoleUsuario } = require('../../sqlserver');
const response = require('../../helpers/response');

let respuesta;
let role;
const roleCrud = {

    RoleGet: (req, res, next) => {
        const { roleID } = req.params
        getAllandById(roleID).then((role) => {
            response.success(req, res, role, 200)
        }).catch(next)
    },
    RolePostandPatch:(req, res,next)=>{
        const {roleID} = req.params;
        const roleData = req.body;
        RoleCreateAndUpdate(roleData,roleID).then((role)=>{
         response.success(req,res,role,200)
        }).catch(next)
    }
}

async function getAllandById(roleID) {
    try {
        if (roleID) {
            role = await t_RoleUsuario.findOne({ where: { roleID: roleID } })
        } else {
            role = await t_RoleUsuario.findAll()
        }

    } catch (error) {
        respuesta = 'Ubo un error'
    }

    respuesta = role;
    return respuesta
}

async function RoleCreateAndUpdate(roleData,roleID) {
 const roleBody = roleData;
    try {
        if (roleID && roleData) {
            role = await t_RoleUsuario.update(roleBody,{where:{roleID:roleID}})
        }else{
            role = await t_RoleUsuario.create(roleBody)
        }
        
    } catch (error) {
        respuesta = 'Ubo un error'
    }
    respuesta =  role;
    return respuesta;
    
}

module.exports = roleCrud