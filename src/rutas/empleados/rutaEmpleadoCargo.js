const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleadoCargo = require('../../controladores/empleados/controladorEmpleadoCargo');
const ModeloEmpleadoCargo = require('../../modelos/empleados/empleadocargo');
const rutas = Router();
rutas.get('/', controladorEmpleadoCargo.inicio);

/**
 * @swagger
 * tags:
 *   name: Cargos
 *   description: Operaciones relacionadas con los cargos
 */

/**
 * @swagger
 * /cargos/listar:
 *   get:
 *     summary: Obtener lista de cargos
 *     tags: [Cargos]
 *     responses:
 *       200:
 *         description: Lista de cargos obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cargo
 *                   nombre:
 *                     type: string
 *                     description: Nombre del cargo
 *                   descripcion:
 *                     type: string
 *                     description: Descripción del cargo
 *                   activo:
 *                     type: boolean
 *                     description: Estado del cargo (activo/inactivo)
 */
rutas.get('/listar', controladorEmpleadoCargo.listar);

/**
 * @swagger
 * /cargos/guardar:
 *   post:
 *     summary: Registrar un nuevo cargo
 *     tags: [Cargos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cargo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del cargo
 *               activo:
 *                 type: boolean
 *                 description: Estado del cargo (activo/inactivo)
 *     responses:
 *       201:
 *         description: Cargo creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("nombre").isLength({min: 3, max : 20}).withMessage('El cargo debe tener entre 3 a 20 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("descripcion").isLength({min: 1, max : 50}).withMessage('La descripcion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La descripcion no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    descripcion: value
                }
            });
        }
    }),
    body("activo").isBoolean({min: 4}).withMessage('El activo tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El activo no permite valores nulos');
        }
    }),
    controladorEmpleadoCargo.guardar);

/**
 * @swagger
 * /cargos/editar:
 *   put:
 *     summary: Editar un cargo existente
 *     tags: [Cargos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cargo a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del cargo
 *               descripcion:
 *                 type: string
 *                 description: Descripción del cargo
 *               activo:
 *                 type: boolean
 *                 description: Estado del cargo (activo/inactivo)
 *     responses:
 *       200:
 *         description: Cargo actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Cargo no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("descripcion").isLength({min: 1, max : 50}).withMessage('La descripcion debe tener entre 1 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La descripcion no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    descripcion: value
                }
            });
        }
    }),
    body("activo").isBoolean({min: 1}).withMessage('El anio tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),
    controladorEmpleadoCargo.editar);

/**
 * @swagger
 * /cargos/eliminar:
 *   delete:
 *     summary: Eliminar un cargo
 *     tags: [Cargos]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cargo a eliminar
 *     responses:
 *       200:
 *         description: Cargo eliminado con éxito
 *       404:
 *         description: Cargo no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCargo = await ModeloEmpleadoCargo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorEmpleadoCargo.eliminar);
module.exports = rutas;