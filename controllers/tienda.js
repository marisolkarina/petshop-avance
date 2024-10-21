const productos = [];
const Producto = require('../models/producto');
const Carrito = require('../models/carrito');

exports.getProductos = (req, res) => {
    let productos = [];
    Producto.fetchAll(productosObtenidos => {
        console.log(productosObtenidos);
        productos = productosObtenidos;

        res.render('tienda/lista-productos', {
            prods: productos,
            titulo: "Productos de la tienda", 
            path: "/productos"
        });
    })

};

exports.getIndex = (req, res) => {
    Producto.fetchAll(productos => {

        res.render('tienda/index', {
            prods: productos,
            titulo: "Pagina principal de la Tienda", 
            path: "/"
        });
    })
}

exports.getProductosPorCategoria = (categoria) => {
    return (req, res) => {
        Producto.fetchAll(productosObtenidos => {

            const productosFiltrados = productosObtenidos.filter(producto => 
                producto.categoria.toLowerCase() === categoria.toLowerCase() 
            );

            res.render('tienda/lista-productos', {
                prods: productosFiltrados,
                titulo: `${categoria}`,
                path: `/productos/${categoria}`
            })
            
        })
    }
}

//ordenar productos de menor a mayor precio
exports.getProductosMenorMayor = (req, res) => {
    Producto.fetchAll(productosObtenidos => {
        const productosOrdenados = productosObtenidos.sort((prod1, prod2) => prod1.precio - prod2.precio);        
        res.render('tienda/lista-productos', {
            prods: productosOrdenados,
            titulo: "Productos ordenados", 
            path: "/productos/ordenar/menor-a-mayor"
            
        });
    })
}
//ordenar productos de mayor a menor precio
exports.getProductosMayorMenor = (req, res) => {
    Producto.fetchAll(productosObtenidos => {
        const productosOrdenados = productosObtenidos.sort((prod1, prod2) => prod2.precio - prod1.precio);        
        res.render('tienda/lista-productos', {
            prods: productosOrdenados,
            titulo: "Productos ordenados", 
            path: "/productos/ordenar/mayor-a-menor"
        });
    })
}
//ordenar productos alfabeticamente
exports.getProductosAlfabeticamente = (req, res) => {
    Producto.fetchAll(productosObtenidos => {
        const productosOrdenados = productosObtenidos.sort((prod1, prod2) => prod1.nombre.localeCompare(prod2.nombre)); 

        res.render('tienda/lista-productos', {
            prods: productosOrdenados,
            titulo: "Productos ordenados", 
            path: "/productos/ordenar/alfabeticamente"
        });
    })
}

// filtrar productos por color
exports.getProductosPorColor = (color) => {
    return (req, res) => {
        Producto.fetchAll(productosObtenidos => {

            const productosFiltrados = productosObtenidos.filter(producto => 
                producto.color.toLowerCase() === color.toLowerCase() 
            );

            res.render('tienda/lista-productos', {
                prods: productosFiltrados,
                titulo: `${color}`,
                path: `/productos/${color}`
            })
            
        })
    }
}

//ver detalle de un producto
exports.getProducto = (req, res) => {
    const idProducto = req.params.idProducto;
    Producto.findById(idProducto, (producto) => {
        res.render('tienda/producto-detalle', {
            producto: producto,
            titulo: producto.nombre, 
            path: `/productos/:${idProducto}`
        });

    });
}

//mostrar productos buscados por palabra
exports.postProductoPalabra = (req, res) => {
    const busqueda = req.body.textoIngresado;
    console.log(busqueda)
    Producto.filterByString(busqueda, (producto) => {
        
        res.render('tienda/lista-productos', {
            prods: producto,
            titulo: 'Productos buscados', 
            path: '/productos'
        });
    });
    
}


exports.getCarrito = (req, res, next) => {

    Carrito.getCarritoFromFile(carrito => {
        Producto.fetchAll(productos => {
            const productosEnCarrito = [];
            for (let prod of carrito.productos) {
                const productoEncontrado = productos.find(p => p.id === prod.id);
                if (productoEncontrado) {
                    productosEnCarrito.push({
                        ...productoEncontrado,
                        cantidad: prod.cantidad
                    });
                }
            }
                res.render('tienda/carrito', {
                path: '/carrito',
                titulo: 'Mi Carrito',
                carrito: {
                    productos: productosEnCarrito,
                    total: carrito.precioTotal
                }
            });
        });
    });
};

exports.postCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    const cantidad = parseInt(req.body.cantidad, 10);
    const nombreProducto = req.body.nombreProducto;

    Producto.findById(idProducto, producto => {
        Carrito.agregarProducto(idProducto, producto.precio, cantidad, nombreProducto);
        res.redirect('/carrito');
    })
}

exports.postEliminarProductoCarrito = (req, res) => {
    const idProducto = req.body.idProducto;

    Producto.findById(idProducto, producto => {

        Carrito.eliminarProducto(idProducto, producto.precio);
        res.redirect('/carrito');
    })
    
}

exports.postActualizarCantidadCarrito = (req, res) => {
    const idProducto = req.body.idProducto;
    const nuevaCantidad = parseInt(req.body.cantidad, 10);

    Producto.findById(idProducto, producto => {
        Carrito.actualizarCantidadProducto(idProducto, nuevaCantidad, producto.precio);
        res.redirect('/carrito');
    });
};

