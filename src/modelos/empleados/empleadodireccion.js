const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const EmpleadoDireccion = db.define(
    "empleadodireccion",
    {
        direccion: {
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
        tablename: "empleadodirecciones"
    }
);

module.exports = EmpleadoDireccion;