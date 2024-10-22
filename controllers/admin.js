const Pedido = require('../models/pedido');
const Producto = require('../models/producto');
const Usuario = require('../models/usuario')

//Administracion de Productos

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

exports.postCrearProducto = (req, res) => {

    const nombre = req.body.nombre;
    const urlImagen = req.body.urlImagen;
    const precio = req.body.precio;
    const descripcion = req.body.descripcion;
    const categoria = req.body.categoria;
    const color = req.body.color;

    const producto = new Producto(null, nombre, urlImagen, descripcion, precio, categoria, color);

    producto.save();

    res.redirect('/admin/productos')
};

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

exports.postEditarProducto = (req, res, next) => {
    const idProducto = req.body.idProducto;
    const nombre = req.body.nombre;
    const precio = req.body.precio;
    const urlImagen = req.body.urlImagen;
    const descripcion = req.body.descripcion;
    const categoria = req.body.categoria;
    const color = req.body.color;
    const productoActualizado = new Producto(
      idProducto,
      nombre,
      urlImagen,
      descripcion,
      precio,
      categoria,
      color
    );
    productoActualizado.save();
    res.redirect('/admin/productos');
};

exports.postEliminarProducto = (req, res, next) => {
    const idProducto = req.body.idProducto;
    Producto.deleteById(idProducto);
    res.redirect('/admin/productos');
  };


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

    res.redirect('/admin/usuarios')
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


exports.getPedidos = (req, res) => {
    let pedidos = [];
    Pedido.fetchAll(pedidosObtenidos => {
        pedidos = pedidosObtenidos;

        res.render('admin/pedidos', {
            pedidos: pedidos,
            titulo: "Administracion de Pedidos", 
            path: "/admin/pedidos"
        });
    })


};