const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const EmpleadoTelefono = db.define(
    "empleadotelefono",
    {
        numero:{
            type: sequelize.STRING(15),
            allowNull: false,
        },
    },
    {
        tablename: "empleadotelefonos"
    }
);

module.exports = EmpleadoTelefono;