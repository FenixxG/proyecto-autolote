const sequelize = require('sequelize');
const db = require('../configuracion/db');

const Garantia = db.define(
    "garantia",
    {
        tipo: {
            type: sequelize.ENUM('Completa', 'Limitada'),
            allowNull: true
        },
        duracionMeses: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        descripcion: {
            type: sequelize.TEXT,
            allowNull: false
        }
    },
    {
        tablename: "garantias"
    }
);

module.exports = Garantia;