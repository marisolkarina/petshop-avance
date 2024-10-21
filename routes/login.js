const express = require('express');

const loginController = require('../controllers/login');

const router = express.Router();

router.get('/login', loginController.getLogin);
router.post('/login', loginController.postLogin);

router.post('/pedidos', loginController.postMisPedidos);

module.exports = router;