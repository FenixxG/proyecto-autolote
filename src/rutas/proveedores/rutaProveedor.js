const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProveedor = require('../../controladores/proveedores/controladorProveedor');
const ModeloProveedor = require('../../modelos/proveedores/proveedor');
const rutas = Router();
rutas.get('/', controladorProveedor.inicio);

/**
 * @swagger
 * tags:
 *   name: Proveedores
 *   description: Operaciones relacionadas con los proveedores
 */

/**
 * @swagger
 * /proveedores/listar:
 *   get:
 *     summary: Obtener lista de proveedores
 *     tags: [Proveedores]
 *     responses:
 *       200:
 *         description: Lista de proveedores obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del proveedor
 *                   nombre:
 *                     type: string
 *                     description: Nombre del proveedor
 *                   direccion:
 *                     type: string
 *                     description: Dirección del proveedor
 *                   email:
 *                     type: string
 *                     description: Email del proveedor
 *                   telefono:
 *                     type: string
 *                     description: Teléfono del proveedor
 */
rutas.get('/listar', controladorProveedor.listar);

/**
 * @swagger
 * /proveedores/guardar:
 *   post:
 *     summary: Registrar un nuevo proveedor
 *     tags: [Proveedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del proveedor
 *               direccion:
 *                 type: string
 *                 description: Dirección del proveedor
 *               email:
 *                 type: string
 *                 description: Email del proveedor
 *               telefono:
 *                 type: string
 *                 description: Teléfono del proveedor
 *     responses:
 *       201:
 *         description: Proveedor creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('la direccion no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    body("email").isString({min: 4}).withMessage('El email tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
    }),

    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    telefono: value
                }
            });
        }
    }),
    controladorProveedor.guardar);

/**
 * @swagger
 * /proveedores/editar:
 *   put:
 *     summary: Editar un proveedor existente
 *     tags: [Proveedores]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del proveedor
 *               direccion:
 *                 type: string
 *                 description: Dirección del proveedor
 *               email:
 *                 type: string
 *                 description: Email del proveedor
 *               telefono:
 *                 type: string
 *                 description: Teléfono del proveedor
 *     responses:
 *       200:
 *         description: Proveedor actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Proveedor no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarProveedor) {
                throw new Error('El id del proveedor no existe');
            }
        }
    }),
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('la direccion no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    body("email").isString({min: 4}).withMessage('El email tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
    }),
    body("telefono").isInt({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
    }),
    controladorProveedor.editar);

/**
 * @swagger
 * /proveedores/eliminar:
 *   delete:
 *     summary: Eliminar un proveedor
 *     tags: [Proveedores]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del proveedor a eliminar
 *     responses:
 *       200:
 *         description: Proveedor eliminado con éxito
 *       404:
 *         description: Proveedor no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarProveedor) {
                throw new Error('El id del proveedor no existe');
            }
        }
    }),
    controladorProveedor.eliminar);
module.exports = rutas;