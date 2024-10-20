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
    res.render('admin/crear-producto', { 
        titulo: 'Crear Producto', 
        path: '/admin/crear-producto',
        modoEdicion: false
    })
};

//postCrearProducto falta

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
