const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();


// /admin/productos
router.get('/productos', adminController.getProductos);

// /admin/crear-producto
router.get('/crear-producto', adminController.getCrearProducto);

router.post('/crear-producto', adminController.postCrearProducto);

// /admin/editar-producto
router.get('/editar-producto/:idProducto', adminController.getEditarProducto);

router.post('/editar-producto', adminController.postEditarProducto);

// /admin/eliminar-producto
router.post('/eliminar-producto', adminController.postEliminarProducto);

// /admin/usuarios
router.get('/usuarios', adminController.getUsuarios);

// /admin/usuarios
router.get('/crear-usuario', adminController.getCrearUsuario);

router.post('/crear-usuario', adminController.postCrearUsuario);

// /admin/editar-usuario
router.get('/editar-usuario/:idUsuario', adminController.getEditarUsuario);

router.post('/editar-usuario', adminController.postEditarUsuario);

// /admin/eliminar-usuario
router.post('/eliminar-usuario', adminController.postEliminarUsuario);

// /admin/pedidos
router.get('/pedidos', adminController.getPedidos);

module.exports = router;
