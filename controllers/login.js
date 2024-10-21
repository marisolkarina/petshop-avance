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
};

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

// Controlador para manejar el registro de nuevos usuarios
exports.postRegistrarse = (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    const confirmarPassword = req.body.confirmPassword; // Asumiendo que tienes un campo para confirmar la contraseña

    // Verificar que las contraseñas coinciden
    if (password !== confirmarPassword) {
        return res.render('login-registro', {
            titulo: 'Registro',
            path: '/registro',
            errorMensaje: 'Las contraseñas no coinciden.'
        });
    }

    // Verificar si el usuario ya existe
    Usuario.findUsuario(email, password, (usuarioExistente) => {
        if (usuarioExistente) {
            return res.render('login-registro', {
                titulo: 'Registro',
                path: '/registro',
                errorMensaje: 'El usuario ya existe.'
            });
        } else {
            // Crear un nuevo usuario y guardarlo
            const nuevoUsuario = new Usuario(null, nombre, email, password, 'user');
            nuevoUsuario.save(); // Guardar el nuevo usuario en el archivo usuarios.json

            res.redirect('/login'); // Redirigir al inicio de sesión después de registrarse
        }
    });
};