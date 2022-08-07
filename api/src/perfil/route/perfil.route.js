const express = require("express");
const PerfilController = require('../controller/PerfilController');
const {validateUser,checkExistEmail} = require ('../../middlewares/UserDataCheck');
const checkRole = require('../../middlewares/role')
const checkJWT = require('../../middlewares/jwt');
const upload = require ('../../middlewares/ImgUpload');

const {Router} = express
//[checkJWT,checkRole(['ADMINISTRADOR'])]
const route = Router();
  route.get('/:id?', PerfilController.PerfilGet)
  route.post('/', PerfilController.PerfilPostAndPacth);
  route.patch('/:id', PerfilController.PerfilPostAndPacth);
  //route.delete('/:userID', UsuarioController.UsuarioDelete);
  
 
module.exports = route;