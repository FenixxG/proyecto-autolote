const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCotizaciones = require('../../controladores/cotizaciones/controladorCotizacion');
const ModeloCotizaciones = require('../../modelos/cotizaciones/cotizacion');
const rutas = Router();
rutas.get('/', controladorCotizaciones.inicio);

/**
 * @swagger
 * tags:
 *   name: Cotizaciones
 *   description: Operaciones relacionadas con las cotizaciones
 */

/**
 * @swagger
 * /cotizaciones/listar:
 *   get:
 *     summary: Obtener lista de cotizaciones
 *     tags: [Cotizaciones]
 *     responses:
 *       200:
 *         description: Lista de cotizaciones obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la cotización
 *                   tasaInteres:
 *                     type: number
 *                     format: decimal
 *                     description: Tasa de interés de la cotización
 *                   plazo:
 *                     type: integer
 *                     description: Plazo de la cotización
 *                   montoTotal:
 *                     type: number
 *                     format: decimal
 *                     description: Monto total de la cotización
 */
rutas.get('/listar', controladorCotizaciones.listar);

/**
 * @swagger
 * /cotizaciones/guardar:
 *   post:
 *     summary: Registrar una nueva cotización
 *     tags: [Cotizaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tasaInteres:
 *                 type: number
 *                 format: decimal
 *                 description: Tasa de interés de la cotización
 *               plazo:
 *                 type: integer
 *                 description: Plazo de la cotización
 *               montoTotal:
 *                 type: number
 *                 format: decimal
 *                 description: Monto total de la cotización
 *     responses:
 *       201:
 *         description: Cotización creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("tasaInteres" ).isDecimal({min:1, max: 100}).withMessage('Debe tener una tasa de interes maxima de 100').custom(async value =>{
        if(!value){
            throw new Error('La tasa de interes no permite valores nulos');
        }
    }),
    body("plazo" ).isInt({min: 1}).withMessage('Debe haber un plazo de tiempo').custom(async value =>{
        if(!value){
            throw new Error('El plazo no permite valores nulos');
        }
    }),
    body("montoTotal" ).isDecimal({min: 1}).withMessage('El monto minimo es 1').custom(async value =>{
        if(!value){
            throw new Error('El monto total no permite valores nulos');
        }
    }),
    controladorCotizaciones.guardar);

/**
 * @swagger
 * /cotizaciones/editar:
 *   put:
 *     summary: Editar una cotización existente
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cotización a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tasaInteres:
 *                 type: number
 *                 format: decimal
 *                 description: Tasa de interés de la cotización
 *               plazo:
 *                 type: integer
 *                 description: Plazo de la cotización
 *               montoTotal:
 *                 type: number
 *                 format: decimal
 *                 description: Monto total de la cotización
 *     responses:
 *       200:
 *         description: Cotización actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Cotización no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCotizaciones) {
                throw new Error('El id de la cotizacion no existe');
            }
        }
    }),
    body("tasaInteres" ).isDecimal({min:1}).withMessage('Debe tener una tasa de interes').custom(async value =>{
        if(!value){
            throw new Error('La tasa de interes no permite valores nulos');
        }
    }),
    body("plazo" ).isInt({min: 1}).withMessage('Debe haber un plazo de tiempo').custom(async value =>{
        if(!value){
            throw new Error('El plazo no permite valores nulos');
        }
    }),
    body("montoTotal" ).isDecimal({min: 1}).withMessage('El monto minimo es 1').custom(async value =>{
        if(!value){
            throw new Error('El monto total no permite valores nulos');
        }
    }),
    controladorCotizaciones.editar);

/**
 * @swagger
 * /cotizaciones/eliminar:
 *   delete:
 *     summary: Eliminar una cotización
 *     tags: [Cotizaciones]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la cotización a eliminar
 *     responses:
 *       200:
 *         description: Cotización eliminada con éxito
 *       404:
 *         description: Cotización no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCotizaciones) {
                throw new Error('El id de la cotizacion no existe');
            }
        }
    }),
    controladorCotizaciones.eliminar);

    rutas.get('/buscar',
        query("tasaInteres").optional().isFloat().withMessage("La tasa de interés debe ser un número"),
        query("plazo").optional().isInt().withMessage("El plazo debe ser un entero"),
        query("montoTotal").optional().isFloat().withMessage("El monto total debe ser un número"),
        controladorCotizaciones.busqueda
    );
module.exports = rutas;