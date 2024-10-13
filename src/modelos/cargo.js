const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Cargo = db.define(
    "cargo",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un cargo con este nombre"
            }
        },
        descripcion: {
            type: sequelize.TEXT,
            allowNull: true
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tablename: "cargos"
    }
);

module.exports = Cargo;