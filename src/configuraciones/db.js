const sequelize = require
('sequelize');
const {
    NOMBRE_DB,
    USUARIO_DB,
    CONTRASENA_DB,
    URL_DB,
    PORT_DB,
    DIALECT_DB
} = process.env;

const db = new sequelize(
    NOMBRE_DB, //nombre de la base de datos
    USUARIO_DB, //nombre de usuario
    CONTRASENA_DB, //contraseña
    {
        host: URL_DB,
        dialect: DIALECT_DB,
        port: PORT_DB,
    }
);

module.exports = db;