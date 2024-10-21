const Usuario = require('../models/usuario');
const Pedido = require("../models/pedido");

// Controlador para mostrar la página de login
exports.getLogin = (req, res) => {
    res.render('login', {
        titulo: 'Login',
        path: '/login'
    });
};

// Controlador para procesar el inicio de sesión
exports.postLogin = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Usuario.findUsuario(email, password, user => {
        if (!user) {
            return res.render('login', {
                titulo: 'Login',
                path: '/login'
            });
        }
        if (user.role === 'admin') {
            return res.redirect('/admin/productos');
        } else {
            res.render('user/index', {
                titulo: 'Mi cuenta',
                path: '/mi-cuenta',
                usuario: user
            });
        }
    });
};

// Controlador para obtener los pedidos del usuario
exports.postMisPedidos = (req, res) => {
    const idUsuario = req.body.idUsuario;
    console.log(idUsuario);

    Pedido.filterByIdUsuario(idUsuario, pedidos => {
        if (pedidos.length === 0) {
            return console.log('no tiene pedidos');
        }
        res.render('user/pedidos', {
            titulo: 'Mis pedidos',
            path: '/pedidos',
            pedidos: pedidos
        });
    });
};

// Controlador para renderizar la página de registro
exports.getRegistrarse = (req, res) => {
    res.render('login-registro', {
        titulo: 'Registro',
        path: '/registro'
    });
};  // <-- Este punto y coma cierra correctamente la función

// Controlador para renderizar la página de recuperación de contraseña
exports.getRecuperarContraseña = (req, res) => {
    res.render('login-contrasena', {
        titulo: 'Recuperar Contraseña',
        path: '/login-contrasena'
    });
};

// Controlador para manejar el envío del formulario de recuperación de contraseña
exports.postRecuperarContraseña = (req, res) => {
    const email = req.body.email;
    // Aquí puedes agregar la lógica para enviar el correo de recuperación
    console.log(`Se enviará un correo a: ${email}`);

    // Redirigir a una página de confirmación o volver a la página principal
    res.redirect('/login');
};
