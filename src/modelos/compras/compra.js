const sequelize = require('sequelize');
const db = require('../../configuraciones/db');

const Compra = db.define(
    "compra",
    {
        precio: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        }
    },
    {
        tablename: "compras"
    }
);

module.exports = Compra;