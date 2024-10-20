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

    save() {

        getUsuariosFromFile(usuarios => {
            if (this.id) {
                const indiceUsuarioExistente = usuarios.findIndex(
                    user => user.id === this.id
                );
                const usuarioActualizado = [...usuarios];
                usuarioActualizado[indiceUsuarioExistente] = this;
                fs.writeFile(u, JSON.stringify(usuarioActualizado), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                usuarios.push(this);
                fs.writeFile(u, JSON.stringify(usuarios), err => {
                    console.log(err);
                });
            }
        });

    }

    static fetchAll(cb) {
        return getUsuariosFromFile(cb);
    }

    static findById(id, cb) {
        getUsuariosFromFile(usuarios => {
            const usuario = usuarios.find(user => user.id === id);
            cb(usuario);
        });
    }

    // verificar que el usuario exista al hacer login
    static findUsuario(email, password, cb) {
        getUsuariosFromFile(usuarios => {
            const usuario = usuarios.find(user => user.email === email && user.password === password);
            cb(usuario);
        })
    }

    static deleteById(id) {
        getUsuariosFromFile(usuarios => {
            const usuariosActualizados = usuarios.filter(user => user.id !== id);
            fs.writeFile(u, JSON.stringify(usuariosActualizados), err => {
                console.log(err);
            });
        });
    }
}