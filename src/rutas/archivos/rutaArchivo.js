const express = require('express');
const { body, query } = require('express-validator');
const rutas = express.Router();
const archivosController = require('../../controladores/archivos/controladorArchivo');
const Carro = require('../../modelos/carros/carro');
const Cliente = require('../../modelos/clientes/cliente');
const Empleado = require('../../modelos/empleados/empleado');
const Motocicleta = require('../../modelos/motocicletas/motocicleta');

// VALIDACIONES
const imagenValidationRules = [
    body("img").isEmpty().withMessage("La imagen es requerida")
];

const carroIdValidation = [
    query('id').isInt().withMessage('El ID debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const buscarCarro = await Carro.findByPk(value);
                if (!buscarCarro) {
                    throw new Error('El carro no existe');
                }
            }
        }),
];

const clienteIdValidation = [
    query('id').isInt().withMessage('El ID debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const buscarCliente = await Cliente.findByPk(value);
                if (!buscarCliente) {
                    throw new Error('El cliente no existe');
                }
            }
        }),
];

const empleadoIdValidation = [
    query('id').isInt().withMessage('El ID debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const buscarEmpleado = await Empleado.findByPk(value);
                if (!buscarEmpleado) {
                    throw new Error('El empleado no existe');
                }
            }
        }),
];

const motocicletaIdValidation = [
    query('id').isInt().withMessage('El ID debe ser un número entero')
        .custom(async (value) => {
            if (value) {
                const buscarMotocicleta = await Motocicleta.findByPk(value);
                if (!buscarMotocicleta) {
                    throw new Error('La motocicleta no existe');
                }
            }
        }),
];

/**
 * @swagger
 * tags:
 *   name: Archivos
 *   description: Operaciones relacionadas con los archivos
 */

/**
 * @swagger
 * /archivos/imagen/carro:
 *   put:
 *     summary: Actualiza la imagen del Carro
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: La nueva imagen del carro
 *               note:
 *                 type: string
 *                 description: Nota adicional sobre la imagen
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del carro a actualizar
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: Error al actualizar la imagen
 */
rutas.put('/imagen/carro', imagenValidationRules, carroIdValidation, archivosController.validarImagenCarro, archivosController.actualizarImagenCarro);

/**
 * @swagger
 * /archivos/imagen/cliente:
 *   put:
 *     summary: Actualiza la imagen del Cliente
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: La nueva imagen del cliente
 *               note:
 *                 type: string
 *                 description: Nota adicional sobre la imagen
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del cliente a actualizar
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: Error al actualizar la imagen
 */
rutas.put('/imagen/cliente', imagenValidationRules, clienteIdValidation, archivosController.validarImagenCliente, archivosController.actualizarImagenCliente);

/**
 * @swagger
 * /archivos/imagen/empleado:
 *   put:
 *     summary: Actualiza la imagen del Empleado
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: La nueva imagen del empleado
 *               note:
 *                 type: string
 *                 description: Nota adicional sobre la imagen
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID del empleado a actualizar
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: Error al actualizar la imagen
 */
rutas.put('/imagen/empleado', imagenValidationRules, empleadoIdValidation, archivosController.validarImagenEmpleado, archivosController.actualizarImagenEmpleado);

/**
 * @swagger
 * /archivos/imagen/motocicleta:
 *   put:
 *     summary: Actualiza la imagen de la Motocicleta
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               imagen:
 *                 type: string
 *                 format: binary
 *                 description: La nueva imagen de la motocicleta
 *               note:
 *                 type: string
 *                 description: Nota adicional sobre la imagen
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: El ID de la motocicleta a actualizar
 *     responses:
 *       200:
 *         description: Imagen actualizada correctamente
 *       400:
 *         description: Error al actualizar la imagen
 */
rutas.put('/imagen/motocicleta', imagenValidationRules, motocicletaIdValidation, archivosController.validarImagenMotocicleta, archivosController.actualizarImagenMotocicleta);

module.exports = rutas;
