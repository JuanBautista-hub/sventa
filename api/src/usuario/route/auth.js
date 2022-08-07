const express = require("express");
const AuthController = require('../../usuario/controller/AuthController');
const {checkRole} = require('../../middlewares/role')
const checkJWT = require('../../middlewares/jwt');
const {validateChangePass} = require('../../middlewares/changePassChek');

const {Router} = express

const route = Router();
  route.post('/login', AuthController.Login);
 // route.get('/verification/:token' ,AuthController.ChangePassword);

module.exports = route;