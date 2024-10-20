const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/productos
router.get('/productos', adminController.getProductos);

// /admin/crear-producto
router.get('/crear-producto', adminController.getCrearProducto);

// /admin/editar-producto
router.get('/editar-producto/:idProducto', adminController.getEditarProducto);

// /admin/usuarios
router.get('/usuarios', adminController.getUsuarios);

// /admin/usuarios
router.get('/crear-usuario', adminController.getCrearUsuario);

// /admin/editar-usuario
router.get('/editar-usuario/:idUsuario', adminController.getEditarUsuario);


module.exports = router;
