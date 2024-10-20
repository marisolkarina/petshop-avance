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

exports.postCrearUsuario = (req, res) => {
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    const usuario = new Usuario(null, nombre, email, password, role);

    usuario.save();

    res.redirect('/')
}

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

exports.postEditarUsuario = (req, res, next) => {
    const idUsuario = req.body.idUsuario;
    const nombre = req.body.nombre;
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const usuarioActualizado = new Usuario(
      idUsuario,
      nombre,
      email,
      password,
      role
    );
    usuarioActualizado.save();
    res.redirect('/admin/usuarios');
};

exports.postEliminarUsuario = (req, res, next) => {
    const idUsuario = req.body.idUsuario;
    Usuario.deleteById(idUsuario);
    res.redirect('/admin/usuarios');
}