const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/productos
router.get('/productos', adminController.getProductos);

// /admin/crear-producto
router.get('/crear-producto', adminController.getCrearProducto);

// /admin/usuarios
router.get('/usuarios', adminController.getUsuarios);

// /admin/productos
// router.post('/crear-producto', adminController.postCrearProducto);


module.exports = router;
