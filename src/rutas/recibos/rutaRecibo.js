const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRecibo = require('../../controladores/recibos/controladorRecibo');
const ModeloRecibo = require('../../modelos/recibos/recibo');
const rutas = Router();
rutas.get('/', controladorRecibo.inicio);

/**
 * @swagger
 * tags:
 *   name: Recibos
 *   description: Operaciones relacionadas con los recibos
 */

/**
 * @swagger
 * /recibos/listar:
 *   get:
 *     summary: Obtener lista de recibos
 *     tags: [Recibos]
 *     responses:
 *       200:
 *         description: Lista de recibos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del recibo
 *                   monto:
 *                     type: number
 *                     format: decimal
 *                     description: Monto del recibo
 *                   formaPago:
 *                     type: string
 *                     enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                     description: Forma de pago del recibo
 */
rutas.get('/listar', controladorRecibo.listar);

/**
 * @swagger
 * /recibos/guardar:
 *   post:
 *     summary: Registrar un nuevo recibo
 *     tags: [Recibos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *                 format: decimal
 *                 description: Monto del recibo
 *               formaPago:
 *                 type: string
 *                 enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                 description: Forma de pago del recibo
 *     responses:
 *       201:
 *         description: Recibo creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("monto").isDecimal({min: 1}).withMessage('El monto debe tener minimo un caracter').custom(async value =>{
        if(!value){
            throw new Error('El monto no permite valores nulos');
        }
    }),
    body("formaPago").isIn(['Efectivo', 'Tarjeta', 'Transferencia', 'Credito']).withMessage('Las formas de pago disponibles son: Efectivo, Tarjeta, Transferencia y Credito').custom(async value =>{
        if(!value){
            throw new Error('La forma de pago no permite valores nulos');
        }
    }),
    controladorRecibo.guardar);

/**
 * @swagger
 * /recibos/editar:
 *   put:
 *     summary: Editar un recibo existente
 *     tags: [Recibos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recibo a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto:
 *                 type: number
 *                 format: decimal
 *                 description: Monto del recibo
 *               formaPago:
 *                 type: string
 *                 enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                 description: Forma de pago del recibo
 *     responses:
 *       200:
 *         description: Recibo actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Recibo no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarRecibos) {
                throw new Error('El id del recibo no existe');
            }
        }
    }),
    body("monto").isDecimal({min: 1}).withMessage('El monto debe tener minimo un caracter').custom(async value =>{
        if(!value){
            throw new Error('El monto no permite valores nulos');
        }
    }),
    body("formaPago").isIn(['Efectivo', 'Tarjeta', 'Transferencia', 'Credito']).withMessage('Las formas de pago disponibles son: Efectivo, Tarjeta, Transferencia y Credito').custom(async value =>{
        if(!value){
            throw new Error('La forma de pago no permite valores nulos');
        }
    }),
    controladorRecibo.editar);

/**
 * @swagger
 * /recibos/eliminar:
 *   delete:
 *     summary: Eliminar un recibo
 *     tags: [Recibos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del recibo a eliminar
 *     responses:
 *       200:
 *         description: Recibo eliminado con éxito
 *       404:
 *         description: Recibo no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarRecibos) {
                throw new Error('El id del recibo no existe');
            }
        }
    }),
    controladorRecibo.eliminar);
module.exports = rutas;

rutas.get('/buscar',
    query("id").optional().isInt().withMessage("El id debe ser un entero"),
    query("monto").optional().isFloat().withMessage("El monto debe ser un número"),
    query("formaPago").optional().isString().withMessage("La forma de pago debe ser un texto"),
    controladorRecibo.busqueda
);
