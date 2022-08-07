const express = require("express");
const UsuarioController = require('../controller/UsuarioController');
const {validateUser,checkExistEmail} = require ('../../middlewares/UserDataCheck');
const checkRole = require('../../middlewares/role')
const checkJWT = require('../../middlewares/jwt');
const upload = require ('../../middlewares/ImgUpload');

const {Router} = express
//[checkJWT,checkRole(['ADMINISTRADOR'])]
const route = Router();
  route.get('/:userID?', UsuarioController.UsuarioGet)
  route.post('/',upload.single('photoprofile'), UsuarioController.UsuarioPostAndPacth);
  route.patch('/:userID',upload.single('photoprofile'), UsuarioController.UsuarioPostAndPacth);
  //route.delete('/:userID', UsuarioController.UsuarioDelete);
  
 
module.exports = route;