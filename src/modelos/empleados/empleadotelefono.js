const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const ClienteTelefono = db.define(
    "clientetelefono",
    {
        numero:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
    },
    {
        tablename: "clientetelefonos"
    }
);

module.exports = ClienteTelefono;