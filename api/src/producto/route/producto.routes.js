const { Router } = require('express');
const ProductoController = require('../controller/ProductoController.js');

const router = Router();
router.post('/', ProductoController.ProductoNuevo);
router.patch('/:id', ProductoController.ProductUpdate);
router.get('/listaproducto', ProductoController.getProducto);
router.get('/:id', ProductoController.getProductoByID);
module.exports = router;