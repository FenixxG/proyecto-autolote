const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorGarantia = require('../../controladores/garantias/controladorGarantia');
const ModeloGarantia = require('../../modelos/garantias/garantia');
const rutas = Router();
rutas.get('/', controladorGarantia.inicio);

/**
 * @swagger
 * tags:
 *   name: Garantías
 *   description: Operaciones relacionadas con las garantías
 */

/**
 * @swagger
 * /garantias/listar:
 *   get:
 *     summary: Obtener lista de garantías
 *     tags: [Garantías]
 *     responses:
 *       200:
 *         description: Lista de garantías obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la garantía
 *                   tipo:
 *                     type: string
 *                     enum: [Completa, Limitada]
 *                     description: Tipo de garantía
 *                   duracionMeses:
 *                     type: integer
 *                     description: Duración de la garantía en meses
 *                   descripcion:
 *                     type: string
 *                     description: Descripción de la garantía
 */
rutas.get('/listar', controladorGarantia.listar);

/**
 * @swagger
 * /garantias/guardar:
 *   post:
 *     summary: Registrar una nueva garantía
 *     tags: [Garantías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [Completa, Limitada]
 *                 description: Tipo de garantía
 *               duracionMeses:
 *                 type: integer
 *                 description: Duración de la garantía en meses
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la garantía
 *     responses:
 *       201:
 *         description: Garantía creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("tipo").isString({min: 3, max : 15}).withMessage('El tipo debe ser  completa o limitada').custom(async value =>{
        if(!value){
            throw new Error('El tipo no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    tipo: value
                }
            });
        }
    }),
    body("duracionMeses").isLength({min: 1, max : 50}).withMessage('El mes debe ser entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La duracion no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    duracionMeses: value
                }
            });

        }
    }),
    body("descripcion").isLength({min: 3, max : 50}).withMessage('La descripcion debe tener entre 3 a 50 caracteres'),
    controladorGarantia.guardar);

/**
 * @swagger
 * /garantias/editar:
 *   put:
 *     summary: Editar una garantía existente
 *     tags: [Garantías]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la garantía a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *                 enum: [Completa, Limitada]
 *                 description: Tipo de garantía
 *               duracionMeses:
 *                 type: integer
 *                 description: Duración de la garantía en meses
 *               descripcion:
 *                 type: string
 *                 description: Descripción de la garantía
 *     responses:
 *       200:
 *         description: Garantía actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Garantía no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarGarantia) {
                throw new Error('El id de la garantia no existe');
            }
        }
    }),
    body("tipo").isString({min: 3, max : 15}).withMessage('El tipo debe ser  completa o limitada').custom(async value =>{
        if(!value){
            throw new Error('El tipo no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    tipo: value
                }
            });
        }
    }),
    body("duracionMeses").isLength({min: 1, max : 50}).withMessage('El mes debe ser entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La duracion del mes no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    duracionMeses: value
                }
            });
        }
    }),
    body("descripcion").isLength(),
    controladorGarantia.editar);

/**
 * @swagger
 * /garantias/eliminar:
 *   delete:
 *     summary: Eliminar una garantía
 *     tags: [Garantías]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la garantía a eliminar
 *     responses:
 *       200:
 *         description: Garantía eliminada con éxito
 *       404:
 *         description: Garantía no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarGarantia) {
                throw new Error('El id de la garantia no existe');
            }
        }
    }),
    controladorGarantia.eliminar);
module.exports = rutas;