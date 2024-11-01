const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorUsuario = require('../../controladores/usuarios/controladorUsuario');
const Cliente = require('../../modelos/clientes/cliente');
const Usuario = require('../../modelos/usuarios/usuario');
const rutas = Router();

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con los usuarios
 */


rutas.get('/listar', controladorUsuario.getUsuariosClientes);






module.exports = rutas;
