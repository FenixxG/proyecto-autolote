const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorServicio = require('../../controladores/servicios/controladorServicio');
const ModeloServicio = require('../../modelos/servicios/servicio');
const rutas = Router();
rutas.get('/', controladorServicio.inicio);

/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Operaciones relacionadas con los servicios
 */

/**
 * @swagger
 * /servicios/listar:
 *   get:
 *     summary: Obtener lista de servicios
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del servicio
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del servicio
 *                   costo:
 *                     type: number
 *                     format: decimal
 *                     description: Costo del servicio
 */
rutas.get('/listar', controladorServicio.listar);

/**
 * @swagger
 * /servicios/guardar:
 *   post:
 *     summary: Registrar un nuevo servicio
 *     tags: [Servicios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Descripción del servicio
 *               costo:
 *                 type: number
 *                 format: decimal
 *                 description: Costo del servicio
 *     responses:
 *       201:
 *         description: Servicio creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
   body("descripcion").isString({ max : 80}).withMessage('El maximo es de 80 caracteres').custom(async value =>{
    }),
    body("costo").isDecimal({min: 1, }).withMessage('El costo debe tener minimo 1 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El costo no permite valores nulos');
        }
    }),
    controladorServicio.guardar);

/**
 * @swagger
 * /servicios/editar:
 *   put:
 *     summary: Editar un servicio existente
 *     tags: [Servicios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descripcion:
 *                 type: string
 *                 description: Descripción del servicio
 *               costo:
 *                 type: number
 *                 format: decimal
 *                 description: Costo del servicio
 *     responses:
 *       200:
 *         description: Servicio actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Servicio no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarServicio) {
                throw new Error('El id del servicio no existe');
            }
        }
    }),
    body("descripcion").isString({ max : 80}).withMessage('El maximo es de 80 caracteres').custom(async value =>{}),
    body("costo").isDecimal({min: 1, }).withMessage('El costo debe tener minimo 1 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El costo no permite valores nulos');
        }
    }),
    controladorServicio.editar);

/**
 * @swagger
 * /servicios/eliminar:
 *   delete:
 *     summary: Eliminar un servicio
 *     tags: [Servicios]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del servicio a eliminar
 *     responses:
 *       200:
 *         description: Servicio eliminado con éxito
 *       404:
 *         description: Servicio no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarServicio) {
                throw new Error('El id del servicio no existe');
            }
        }
    }),
    controladorServicio.eliminar);
module.exports = rutas;

rutas.get('/buscar',
    query("id").optional().isInt().withMessage("El id debe ser un entero"),
    query("descripcion").optional().isString().withMessage("La descripción debe ser un texto"),
    query("costo").optional().isFloat().withMessage("El costo debe ser un número"),
    controladorServicio.busqueda
);