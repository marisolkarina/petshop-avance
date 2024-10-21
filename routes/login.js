const express = require('express');
const loginController = require('../controllers/login');
const router = express.Router();

// Ruta para la vista de "Olvidaste tu contraseña"
router.get('/login-contrasena', loginController.getRecuperarContraseña);

// Ruta para manejar el POST del formulario de recuperación de contraseña
router.post('/recuperar-contrasena', loginController.postRecuperarContraseña);

// Ruta para manejar el registro de un nuevo usuario
router.post('/registro', loginController.postRegistrarse);

// Otras rutas existentes
router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);
router.get('/login-registro', loginController.getRegistrarse);
router.post('/pedidos', loginController.postMisPedidos);

module.exports = router;
