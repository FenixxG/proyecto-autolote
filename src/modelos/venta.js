const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Venta = db.define(
    "venta",
    {
        precio: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        formaPago: {
            type: sequelize.ENUM('Efectivo', 'Tarjeta', 'Transferencia', 'Credito'),
            allowNull: true
        }
    },
    {
        tablename: "ventas"
    }
);

module.exports = Venta;