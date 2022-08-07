const { Router } = require('express');

const usuario = require('../usuario/route/usuario.route');
const role = require('../usuario/route/role.route');
const auth = require('../usuario/route/auth');
const perfil = require('../perfil/route/perfil.route');

const producto = require('../producto/route/producto.routes');
const router = Router();

router.use('/usuario',usuario);
router.use('/role', role);
router.use('/auth', auth);
router.use('/perfil',perfil)
router.use('/producto',producto)


module.exports = router;