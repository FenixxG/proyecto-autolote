const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Cotizacion = db.define(
    "cotizacion",
    {
        tasaInteres: {
            type: sequelize.DECIMAL(5, 2),
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