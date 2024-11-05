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


/**
 * @swagger
 * /usuarios/listar:
 *   get:
 *     summary: Obtiene la lista de usuarios clientes
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios clientes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nombre:
 *                     type: string
 *                   correo:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                   updatedAt:
 *                     type: string
 *       500:
 *         description: Error al obtener los usuarios
 */
rutas.get('/listar', controladorUsuario.getUsuariosClientes);

/**
 * @swagger
 * /usuarios/recuperar:
 *   post:
 *     summary: Envía un PIN de recuperación de contraseña
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Correo enviado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al enviar el correo
 */
rutas.post('/recuperar', controladorUsuario.recuperarContrasena);

/**
 * @swagger
 * /usuarios/actualizar:
 *   post:
 *     summary: Actualiza la contraseña del usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               contrasena:
 *                 type: string
 *               pin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       404:
 *         description: Usuario no encontrado o PIN incorrecto
 *       500:
 *         description: Error al actualizar la contraseña
 */
rutas.post('/actualizar',controladorUsuario.updateContrasena);

/**
 * @swagger
 * /usuarios/iniciarsesion:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: Nombre de usuario o correo
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Token:
 *                   type: string
 *                 Usuario:
 *                   type: object
 *                   properties:
 *                     login:
 *                       type: string
 *                     tipo:
 *                       type: string
 *                     correo:
 *                       type: string
 *                     datosPersonales:
 *                       type: object
 *       404:
 *         description: Usuario o contraseña incorrectos
 *       500:
 *         description: Error al iniciar sesión
 */
rutas.post('/iniciarsesion',controladorUsuario.InicioSesion);

module.exports = rutas;
