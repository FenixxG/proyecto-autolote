const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const EmpleadoTelefono = db.define(
    "empleadotelefono",
    {
        telefono:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
    },
    {
        tableName: "empleadotelefonos"
    }
);

module.exports = EmpleadoTelefono;