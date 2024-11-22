const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const ClienteDireccion = db.define(
    "clientedireccion",
    {
        direccion: {
            type: sequelize.TEXT,
            allowNull: true
        },
        longitud: {
            type: sequelize.DOUBLE,
            allowNull: true
        },
        latitud: {
            type: sequelize.DOUBLE,
            allowNull: true
        },
        activo: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        }
    },
    {
        tableName: "clientedirecciones"
    }
);

module.exports = ClienteDireccion;