const sequelize = require('sequelize');
const db = require('../../configuraciones/db');
const Usuario = require('../usuarios/usuario');

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
        },
        email: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un empleado con este email"
            },
            validate: {
                isEmail: true
            }
        }
    },
    {
        tablename: "empleados"
    }
);
// Relaciones
Usuario.hasMany(Empleado, { foreignKey: 'usuarioId' });
Empleado.belongsTo(Usuario, { foreignKey: 'usuarioId' });

module.exports = Empleado;