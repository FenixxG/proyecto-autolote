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
        correo: {
            type: sequelize.STRING(100),
            allowNull: false,
            unique: {
                args: true,
                msg: "Ya existe un cliente con este email"
            },
            validate: {
                isEmail: true
            }
        },
        imagen: {
            type: sequelize.STRING(250),
            allowNull: true,
        },
        nombreCompleto: {
            type: sequelize.DataTypes.VIRTUAL,
            get() {
                return `${this.primernombre} ${this.segundonombre ? this.segundonombre : ''} ${this.primerapellido} ${this.segundoapellido ? this.segundoapellido : ''}`;
            },
            set(value) {
                throw new Error('No se puede cargar el nombre completo');
            }
        }
    },
    {
        tableName: "clientes"
    }
);

module.exports = Cliente;