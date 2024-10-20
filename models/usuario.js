const fs = require('fs');
const path = require('path');

const raizDir = require('../utils/path');

const u = path.join(raizDir, 'data', 'usuarios.json');

const getUsuariosFromFile = (cb) => {
    fs.readFile(u, (err, fileContent) => {
        if(err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    })
}

module.exports = class Usuario {
    constructor(id, nombre, email, password, role) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.role = role;
    }



    static fetchAll(cb) {
        return getUsuariosFromFile(cb);
    }

    // verificar que el usuario exista
    static findUsuario(email, password, cb) {
        getUsuariosFromFile(usuarios => {
            const usuario = usuarios.find(user => user.email === email && user.password === password);
            cb(usuario);
        })
    }
}