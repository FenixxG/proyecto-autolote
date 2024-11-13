const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Recibo = db.define(
    "recibo",
    {
        monto: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        formaPago: {
            type: sequelize.ENUM('Efectivo', 'Tarjeta', 'Transferencia', 'Credito'),
            allowNull: true
        }
    },
    {
        tablename: "recibos"
    }
);
module.exports = Recibo;