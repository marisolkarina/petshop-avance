const Usuario = require('../models/usuario');
const Pedido = require("../models/pedido");

exports.getLogin = (req, res) => {

    res.render('login', {
        titulo: 'Login',
        path: '/login'
    })
}
//intenta iniciar sesion, envia email y password
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
            return res.redirect('/admin/productos')
        } else {
            res.render('user/index', {
                titulo: 'Mi cuenta',
                path: '/mi-cuenta',
                usuario: user
            })
        }
    })
}


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
        })
    })
}

