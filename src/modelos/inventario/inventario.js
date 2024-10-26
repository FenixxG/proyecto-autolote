const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Inventario = db.define(
    "inventario",
    {
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false
        }
    },
    {
        tablename: "inventario"
    }
);

module.exports = Inventario;