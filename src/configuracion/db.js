const sequelize = require
('sequelize');
const db = new sequelize(
    "autolote", //nombre de la base de datos
    "seminario", //nombre de usuario
    "Unicah123", //contraseña
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306,
    }
);

module.exports = db;