const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Cliente = db.define(
    "cliente",
    {
        identidad: {
            type: sequelize.STRING(15),
            allowNull: true
        },
        rtn: {
            type: sequelize.STRING(16),
            allowNull: true
        },
        primernombre: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundonombre: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        primerapellido: {
            type: sequelize.STRING(50),
            allowNull: false,
        },
        segundoapellido: {
            type: sequelize.STRING(50),
            allowNull: true,
        },
        email: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un cliente con este email"
            },
            validate: {
                isEmail: true
            }
        }
    },
    {
        tableName: "clientes"
    }
);

module.exports = Cliente;