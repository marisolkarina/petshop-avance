const Producto = require('../models/producto');
const Usuario = require('../models/usuario')

exports.getProductos = (req, res) => {
    let productos = [];
    Producto.fetchAll(productosObtenidos => {
        productos = productosObtenidos;

        res.render('admin/productos', {
            prods: productos,
            titulo: "Administracion de Productos", 
            path: "/admin/productos"
        });
    })


};

exports.getCrearProducto = (req, res) => {
    res.render('admin/crear-editar-producto', { 
        titulo: 'Crear Producto', 
        path: '/admin/crear-producto',
        modoEdicion: false
    })
};

//postCrearProducto falta

// getEditarProducto

exports.getEditarProducto = (req, res) => {

    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, producto => {
        console.log(producto);
        if (!producto) {
            return res.redirect('/admin/productos');
        }
        res.render('admin/crear-editar-producto', { 
            titulo: 'Editar Producto', 
            path: '/admin/editar-producto',
            producto: producto,
            modoEdicion: true,
        })
    })
}


//postEditarProducto

// Administracion de usuarios 
exports.getUsuarios = (req, res) => {
    let usuarios = [];
    Usuario.fetchAll(usuariosObtenidos => {
        usuarios = usuariosObtenidos;

        res.render('admin/usuarios', {
            users: usuarios,
            titulo: "Administracion de Usuarios", 
            path: "/admin/usuarios"
        });
    })


};

exports.getCrearUsuario = (req, res) => {
    res.render('admin/crear-editar-usuario', { 
        titulo: 'Crear usuario', 
        path: '/crear-usuario',
        modoEdicion: false
    })
};

exports.getEditarUsuario = (req, res) => {

    const idUsuario = req.params.idUsuario;
    Usuario.findById(idUsuario, usuario => {
        console.log(usuario);
        if (!usuario) {
            return res.redirect('/admin/usuarios');
        }
        res.render('admin/crear-editar-usuario', { 
            titulo: 'Editar Usuario', 
            path: '/admin/editar-usuario',
            usuario: usuario,
            modoEdicion: true,
        })
    })
}