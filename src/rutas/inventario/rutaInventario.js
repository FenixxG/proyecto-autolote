const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInventario = require('../../controladores/inventario/controladorInventario');
const ModeloInventario = require('../../modelos/inventario/inventario');
const rutas = Router();
rutas.get('/', controladorInventario.inicio);

/**
 * @swagger
 * tags:
 *   name: Inventario
 *   description: Operaciones relacionadas con el inventario
 */

/**
 * @swagger
 * /inventario/listar:
 *   get:
 *     summary: Obtener lista de artículos en inventario
 *     tags: [Inventario]
 *     responses:
 *       200:
 *         description: Lista de artículos en inventario obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del artículo en inventario
 *                   cantidad:
 *                     type: integer
 *                     description: Cantidad disponible del artículo
 */
rutas.get('/listar', controladorInventario.listar);

/**
 * @swagger
 * /inventario/guardar:
 *   post:
 *     summary: Registrar un nuevo artículo en inventario
 *     tags: [Inventario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del artículo
 *     responses:
 *       201:
 *         description: Artículo creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("nombreArticulo").isLength({min: 3, max : 50}).withMessage('El Nombre del Articulo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El Nombre del Articulo no permite valores nulos');
        }
    }),
    body("cantidad").isInt(),
    controladorInventario.guardar);

/**
 * @swagger
 * /inventario/editar:
 *   put:
 *     summary: Editar un artículo existente en inventario
 *     tags: [Inventario]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cantidad:
 *                 type: integer
 *                 description: Cantidad del artículo
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Artículo no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarInventario) {
                throw new Error('El id del inventario no existe');
            }
        }
    }),
    body("cantidad").isInt(),
    controladorInventario.editar);

/**
 * @swagger
 * /inventario/eliminar:
 *   delete:
 *     summary: Eliminar un artículo del inventario
 *     tags: [Inventario]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo a eliminar
 *     responses:
 *       200:
 *         description: Artículo eliminado con éxito
 *       404:
 *         description: Artículo no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarInventario) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorInventario.eliminar);
module.exports = rutas;

rutas.get('/buscar',
    query("cantidad").optional().isInt({ min: 0 }).withMessage("La cantidad debe ser un número entero no negativo"),
    controladorInventario.busqueda
);

