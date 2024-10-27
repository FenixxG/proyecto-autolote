const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCompras = require('../../controladores/compras/controladorCompra');
const ModeloCompras = require('../../modelos/compras/compra');
const rutas = Router();
rutas.get('/', controladorCompras.inicio);

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Operaciones relacionadas con las compras
 */

/**
 * @swagger
 * /compras/listar:
 *   get:
 *     summary: Obtener lista de compras
 *     tags: [Compras]
 *     responses:
 *       200:
 *         description: Lista de compras obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la compra
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                     description: Precio de la compra
 */
rutas.get('/listar', controladorCompras.listar);

/**
 * @swagger
 * /compras/guardar:
 *   post:
 *     summary: Registrar una nueva compra
 *     tags: [Compras]
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
 *                 description: Precio de la compra
 *     responses:
 *       201:
 *         description: Compra creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("precio").isDecimal({min: 1}).withMessage('El precio debe tener almenos un valor').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
        else{
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    precio: value
                }
            });
        }
    }),
    controladorCompras.guardar);

/**
 * @swagger
 * /compras/editar:
 *   put:
 *     summary: Editar una compra existente
 *     tags: [Compras]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la compra a editar
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
 *                 description: Precio de la compra
 *     responses:
 *       200:
 *         description: Compra actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Compra no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCompras) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("precio").isDecimal({ min: 1 }).withMessage('El precio debe tener un valor')
    .custom(async value => {
        if (!value) {
            throw new Error('El precio no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    controladorCompras.editar);

/**
 * @swagger
 * /compras/eliminar:
 *   delete:
 *     summary: Eliminar una compra
 *     tags: [Compras]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la compra a eliminar
 *     responses:
 *       200:
 *         description: Compra eliminada con éxito
 *       404:
 *         description: Compra no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCompras) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCompras.eliminar);
module.exports = rutas;