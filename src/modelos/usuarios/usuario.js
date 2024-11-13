const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Usuario = db.define(
    "usuario",
    {
        nombre: {
            type: sequelize.STRING(50),
            allowNull: false,
            unique: {
                args: true,
                msg: "El nombre de usuario ya existe"
            }
        },
        tipoUsuario: {
            type: sequelize.ENUM('Cliente', 'Empleado'),
            allowNull: false
        },
        correo: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un usuario con este correo"
            },
            validate: {
                isEmail: true
            }
        },
        contrasena: {
            type: sequelize.STRING(100),
            allowNull: false
        },
        estado: {
            type: sequelize.ENUM('Activo', 'Bloqueado', 'Inactivo', 'Logeado'),
            defaultValue: 'Activo'
        },
        pin: {
            type: sequelize.STRING(6),
            allowNull: true,
            defaultValue: '000000'
        },
        intentos: {
            type: sequelize.INTEGER,
            defaultValue: 0
        }
    },
    {
        tableName: "usuarios"
    }
);

module.exports = Usuario;