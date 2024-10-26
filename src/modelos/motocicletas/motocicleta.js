const sequelize = require('sequelize');
const db = require('../../configuracion/db');

const Motocicleta = db.define(
    "motocicleta",
    {
        marca: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        modelo: {
            type: sequelize.STRING(50),
            allowNull: false
        },
        anio: {
            type: sequelize.INTEGER,
            allowNull: false
        },
        color: {
            type: sequelize.STRING(30),
            allowNull: false
        },
        precio: {
            type: sequelize.DECIMAL(10, 2),
            allowNull: false
        },
        estado: {
            type: sequelize.ENUM('Nuevo', 'Usado'),
            allowNull: true,
            defaultValue: 'Nuevo'
        },
        disponible: {
            type: sequelize.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        imagen: {
            type: sequelize.STRING(250),
            allowNull: true,
        }
    },
    {
        tablename: "motocicletas"
    }
);

module.exports = Motocicleta;