const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVenta = require('../../controladores/ventas/controladorVenta');
const ModeloVenta = require('../../modelos/ventas/venta');
const rutas = Router();
rutas.get('/', controladorVenta.inicio);

/**
 * @swagger
 * tags:
 *   name: Ventas
 *   description: Operaciones relacionadas con las ventas
 */

/**
 * @swagger
 * /ventas/listar:
 *   get:
 *     summary: Obtener lista de ventas
 *     tags: [Ventas]
 *     responses:
 *       200:
 *         description: Lista de ventas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la venta
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                     description: Precio de la venta
 *                   formaPago:
 *                     type: string
 *                     enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                     description: Forma de pago de la venta
 */
rutas.get('/listar', controladorVenta.listar);

/**
 * @swagger
 * /ventas/guardar:
 *   post:
 *     summary: Registrar una nueva venta
 *     tags: [Ventas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio de la venta
 *               formaPago:
 *                 type: string
 *                 enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                 description: Forma de pago de la venta
 *     responses:
 *       201:
 *         description: Venta creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("precio").isDecimal({min: 1}).withMessage('El precio debe tener minimo 1 caracter').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),
    body("formaPago").isString({min: 3, max : 50}).withMessage('La formaPago debe ser efectivo, tarjeta, transferencia o credito').custom(async value =>{
        if(!value){
            throw new Error('La formaPago no permite valores nulos');
        }
    }),
    controladorVenta.guardar);

/**
 * @swagger
 * /ventas/editar:
 *   put:
 *     summary: Editar una venta existente
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio de la venta
 *               formaPago:
 *                 type: string
 *                 enum: [Efectivo, Tarjeta, Transferencia, Credito]
 *                 description: Forma de pago de la venta
 *     responses:
 *       200:
 *         description: Venta actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Venta no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarVenta) {
                throw new Error('El id de la venta no existe');
            }
        }
    }),
    body("precio").isDecimal({min: 1}).withMessage('El precio debe tener minimo 1 caracter').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),
    body("formaPago").isString({min: 3, max : 50}).withMessage('La formaPago debe ser efectivo, tarjeta, transferencia o credito').custom(async value =>{
        if(!value){
            throw new Error('La formaPago no permite valores nulos');
        }
    }),
    controladorVenta.editar);

/**
 * @swagger
 * /ventas/eliminar:
 *   delete:
 *     summary: Eliminar una venta
 *     tags: [Ventas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la venta a eliminar
 *     responses:
 *       200:
 *         description: Venta eliminada con éxito
 *       404:
 *         description: Venta no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarVenta) {
                throw new Error('El id de la venta no existe');
            }
        }
    }),
    controladorVenta.eliminar);
module.exports = rutas;

rutas.get('/buscar',
    query("id").optional().isInt().withMessage("El id debe ser un entero"),
    query("precio").optional().isDecimal().withMessage("El precio debe ser un número decimal con hasta dos decimales"),
    query("formaPago").optional().isIn(['Efectivo', 'Tarjeta', 'Transferencia', 'Credito']).withMessage("La forma de pago debe ser uno de los siguientes: Efectivo, Tarjeta, Transferencia, Credito"),
    controladorVenta.busqueda
);
module.exports = rutas;
