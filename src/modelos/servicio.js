const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Servicio = db.define(
    "servicio",
    {
        descripcion: {
            type: sequelize.TEXT,
            allowNull: false
        },
        costo: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tablename: "servicios"
    }
);

module.exports = Servicio;