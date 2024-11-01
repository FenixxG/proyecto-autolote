const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../../controladores/clientes/controladorCliente');
const ModeloCliente = require('../../modelos/clientes/cliente');
const rutas = Router();
//rutas.get('/', controladorCliente.inicio);

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * /clientes/listar:
 *   get:
 *     summary: Obtener lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   identidad:
 *                     type: string
 *                     description: Identidad del cliente
 *                   rtn:
 *                     type: string
 *                     description: RTN del cliente
 *                   primernombre:
 *                     type: string
 *                     description: Primer nombre del cliente
 *                   segundonombre:
 *                     type: string
 *                     description: Segundo nombre del cliente
 *                   primerapellido:
 *                     type: string
 *                     description: Primer apellido del cliente
 *                   segundoapellido:
 *                     type: string
 *                     description: Segundo apellido del cliente
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del cliente
 *                   telefono:
 *                     type: string
 *                     description: Número de teléfono del cliente
 *                   direccion:
 *                     type: string
 *                     description: Dirección del cliente
 */
rutas.get('/listar', controladorCliente.getClientes);

/**
 * @swagger
 * /clientes/guardar:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               email:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               direccion:
 *                 type: string
 *                 description: Dirección del cliente
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("identidad").isLength({min: 3, max : 15}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El rtn del cliente ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 1, max : 20}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 1, max : 20}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundonombre: value
                }
            })
        }
    }),
    body("primerapellido").isLength({min: 1, max : 20}).withMessage('El primerapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primerapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 1, max : 20}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundoapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("email").isLength({min: 3, max : 50}).withMessage('El email debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    email: value
                }
            });
            if(buscarCliente){
                throw new Error('Este email del cliente ya existe');
            }
        }
    }),
    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    telefono: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La direccion no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    controladorCliente.createCliente);

/**
 * @swagger
 * /clientes/editar:
 *   put:
 *     summary: Editar un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               email:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               telefono:
 *                 type: string
 *                 description: Número de teléfono del cliente
 *               direccion:
 *                 type: string
 *                 description: Dirección del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Cliente no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCliente) {
                throw new Error('El id del cliente no existe');
            }
        }
    }),
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad debe tener entre 3 a 15 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 1, max : 20}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 1, max : 20}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    nombre: value
                }
            })
        }
    }),
    body("primerapellido").isLength({min: 1, max : 20}).withMessage('El primerapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 1, max : 20}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundoapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("email").isLength({min: 3, max : 50}).withMessage('El email debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    email: value
                }
            });
            if(buscarCliente){
                throw new Error('El email del cliente ya existe');
            }
        }
    }),
    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    telefono: value
                }
            });
            if(buscarCliente){
                throw new Error('El telefono del cliente ya existe');
            }
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La direccion no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    controladorCliente.updateCliente);

/**
 * @swagger
 * /clientes/eliminar:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCliente) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCliente.deleteCliente);
module.exports = rutas;