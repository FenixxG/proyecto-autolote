const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Empleado = db.define(
    "empleado",
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
        sueldo: {
            type: sequelize.DOUBLE,
            allowNull: true,
            defaultValue: 0
        },
        estado: {
            type: sequelize.ENUM('AC', 'IN', 'BL'),
            allowNull: true,
            defaultValue: 'AC'
        },
        imagen: {
            type: sequelize.STRING(250),
            allowNull: true,
        }
    },
    {
        tablename: "empleados"
    }
);

module.exports = Empleado;