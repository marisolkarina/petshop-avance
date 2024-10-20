const Usuario = require('../models/usuario');

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
            res.render('tienda/index', {
                titulo: 'Pagina de inicio',
                path: '/'
            })
        }
    })
}
