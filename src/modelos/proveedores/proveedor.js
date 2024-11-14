const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Proveedor = db.define(
    "proveedor",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        direccion: {
            type: sequelize.STRING(100),
            allowNull: true
        },
        email: {
            type: sequelize.STRING(100),
            allowNull: true,
            unique: {
                args: true,
                msg: "Ya existe un proveedor con este email"
            }
        },
        telefono: {
            type: sequelize.STRING(50),
            allowNull: true,
            unique: {
                args: true,
                msg: "Ya existe un proveedor con este telefono"
            }
        },
    },
    {
        tablename: "proveedores"
    }
);

module.exports = Proveedor;