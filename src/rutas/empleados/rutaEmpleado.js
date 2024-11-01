const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleado = require('../../controladores/empleados/controladorEmpleado');
const ModeloEmpleado = require('../../modelos/empleados/empleado');
const rutas = Router();
//rutas.get('/', controladorEmpleado.inicio);

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Operaciones relacionadas con los empleados
 */

/**
 * @swagger
 * /empleados/listar:
 *   get:
 *     summary: Obtener lista de empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del empleado
 *                   identidad:
 *                     type: string
 *                     description: Identidad del empleado
 *                   rtn:
 *                     type: string
 *                     description: RTN del empleado
 *                   primernombre:
 *                     type: string
 *                     description: Primer nombre del empleado
 *                   segundonombre:
 *                     type: string
 *                     description: Segundo nombre del empleado
 *                   primerapellido:
 *                     type: string
 *                     description: Primer apellido del empleado
 *                   segundoapellido:
 *                     type: string
 *                     description: Segundo apellido del empleado
 *                   sueldo:
 *                     type: number
 *                     format: double
 *                     description: Sueldo del empleado
 *                   estado:
 *                     type: string
 *                     enum: [AC, IN, BL]
 *                     description: Estado del empleado
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen del empleado
 */
rutas.get('/listar', controladorEmpleado.getEmpleados);

/**
 * @swagger
 * /empleados/guardar:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del empleado
 *               rtn:
 *                 type: string
 *                 description: RTN del empleado
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del empleado
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del empleado
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del empleado
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del empleado
 *               sueldo:
 *                 type: number
 *                 format: double
 *                 description: Sueldo del empleado
 *               estado:
 *                 type: string
 *                 enum: [AC, IN, BL]
 *                 description: Estado del empleado
 *               imagen:
 *                 type: string
 *                 description: URL de la imagen del empleado
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarEmpleado){
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 3, max : 50}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombrembre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundonombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 3, max : 50}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("sueldo").isDecimal({min: 1}).withMessage('El sueldo minimo un valor').custom(async value =>{
        if(!value){
            throw new Error('El sueldo debe tener minimo un valor');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    sueldo: value
                }
            });
        }
    }),
    body("estado").isString({min: 3, max : 50}).withMessage('El estado debe ser AC, IN o BL').custom(async value =>{
        if(!value){
            throw new Error('El estado debe ser AC, IN o BL');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    estado: value
                }
            });
        }
    }),
    body("imagen").isLength({min: 3, max : 50}).withMessage('La imagen debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La imagen no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    imagen: value
                }
            });
        }
    }),
    controladorEmpleado.createEmpleado);

/**
 * @swagger
 * /empleados/editar:
 *   put:
 *     summary: Editar un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del empleado
 *               rtn:
 *                 type: string
 *                 description: RTN del empleado
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del empleado
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del empleado
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del empleado
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del empleado
 *               sueldo:
 *                 type: number
 *                 format: double
 *                 description: Sueldo del empleado
 *               estado:
 *                 type: string
 *                 enum: [AC, IN, BL]
 *                 description: Estado del empleado
 *               imagen:
 *                 type: string
 *                 description: URL de la imagen del empleado
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Empleado no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarEmpleado) {
                throw new Error('El id del empleado no existe');
            }
        }
    }),
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarEmpleado){
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarEmpleado){
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 3, max : 50}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
            }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundonombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 3, max : 50}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("sueldo").isDecimal({min: 1}).withMessage('El sueldo minimo un valor').custom(async value =>{
        if(!value){
            throw new Error('El sueldo debe tener minimo un valor');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    sueldo: value
                }
            });
        }
    }),
    body("estado").isLength({min: 3, max : 50}).withMessage('El estado debe ser AC, IN o BL').custom(async value =>{
        if(!value){
            throw new Error('El estado debe ser AC, IN o BL');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    estado: value
                }
            });
        }
    }),
    body("imagen").isLength({min: 3, max : 50}).withMessage('La imagen debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La imagen no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    imagen: value
                }
            });
        }
    }),
    controladorEmpleado.updateEmpleado);

/**
 * @swagger
 * /empleados/eliminar:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
 *       404:
 *         description: Empleado no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarEmpleado) {
                throw new Error('El id del empleado no existe');
            }
        }
    }),
    controladorEmpleado.deleteEmpleado);
module.exports = rutas;