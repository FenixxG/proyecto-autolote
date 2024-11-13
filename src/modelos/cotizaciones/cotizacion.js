const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Cotizacion = db.define(
    "cotizacion",
    {
        tasaInteres: {
            type: sequelize.DECIMAL(5, 1), //Corregir el 0 a la derecha
            allowNull: false
        },
        plazo: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        montoTotal: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tablename: "cotizaciones"
    }
);

module.exports = Cotizacion;