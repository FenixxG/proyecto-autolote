const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCarro= require('../../controladores/carros/controladorCarro');
const ModeloCarros = require('../../modelos/carros/carro');
const rutas = Router();
rutas.get('/', controladorCarro.inicio);

/**
 * @swagger
 * tags:
 *   name: Carros
 *   description: Operaciones relacionadas con los carros
 */

/**
 * @swagger
 * /carros/listar:
 *   get:
 *     summary: Obtener lista de carros
 *     tags: [Carros]
 *     responses:
 *       200:
 *         description: Lista de carros obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del carro
 *                   marca:
 *                     type: string
 *                     description: Marca del carro
 *                   modelo:
 *                     type: string
 *                     description: Modelo del carro
 *                   anio:
 *                     type: integer
 *                     description: Año del carro
 *                   color:
 *                     type: string
 *                     description: Color del carro
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                     description: Precio del carro
 *                   estado:
 *                     type: string
 *                     enum: [Nuevo, Usado]
 *                     description: Estado del carro
 *                   disponible:
 *                     type: boolean
 *                     description: Disponibilidad del carro
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen del carro
 */
rutas.get('/listar', controladorCarro.listar);

/**
 * @swagger
 * /carros/guardar:
 *   post:
 *     summary: Registrar un nuevo carro
 *     tags: [Carros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *                 description: Marca del carro
 *               modelo:
 *                 type: string
 *                 description: Modelo del carro
 *               anio:
 *                 type: integer
 *                 description: Año del carro
 *               color:
 *                 type: string
 *                 description: Color del carro
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio del carro
 *               estado:
 *                 type: string
 *                 enum: [Nuevo, Usado]
 *                 description: Estado del carro
 *               disponible:
 *                 type: boolean
 *                 description: Disponibilidad del carro
 *     responses:
 *       201:
 *         description: Carro creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("marca").isLength({min: 3, max : 50}).withMessage('La marca debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La marca no permite valores nulos');
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El modelo no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
                where: {
                    modelo: value
                }
            });
            if(buscarCarro){
                throw new Error('El modelo del carro ya existe');
            }
        }
    }),
    body("anio").isInt({ min: 1886 }).withMessage('El año debe ser un número entero y no menor que 1886').custom(async value => {
        if (!value) {
            throw new Error('El año no permite valores nulos');
        }
    }),

    body("color").isLength({min: 3, max : 50}).withMessage('El color debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El color no permite valores nulos');
        }
    }),

    body("precio").isDecimal({ min: 1 }).withMessage('El precio debe ser un número decimal y no puede ser negativo').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),

    body("estado").isIn(['Nuevo', 'Usado']).withMessage('El estado debe ser "Nuevo" o "Usado"').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
    }),
    body("disponible").isBoolean().withMessage('El valor tiene que ser booleano').custom(async value =>{
        if(!value){
            throw new Error('No permite valores nulos');
        }
    }),
    controladorCarro.guardar);

/**
 * @swagger
 * /carros/editar:
 *   put:
 *     summary: Editar un carro existente
 *     tags: [Carros]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del carro a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *                 description: Marca del carro
 *               modelo:
 *                 type: string
 *                 description: Modelo del carro
 *               anio:
 *                 type: integer
 *                 description: Año del carro
 *               color:
 *                 type: string
 *                 description: Color del carro
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio del carro
 *               estado:
 *                 type: string
 *                 enum: [Nuevo, Usado]
 *                 description: Estado del carro
 *               disponible:
 *                 type: boolean
 *                 description: Disponibilidad del carro
 *     responses:
 *       200:
 *         description: Carro actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Carro no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCarro = await ModeloCarros.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCarro) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("marca").isLength({min: 3, max : 50}).withMessage('La marca debe tener entre 3 a 50 caracteres'),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres'),
    body("anio").isInt({ min: 1886 }).withMessage('El año debe ser un número entero y no menor que 1886').custom(async value => {
        if (!value) {
            throw new Error('El año no permite valores nulos');
        }
    }),

    body("color").isLength({min: 3, max : 50}).withMessage('El color debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El color no permite valores nulos');
        }
    }),

    body("precio").isDecimal({ min: 0 }).withMessage('El precio debe ser un número decimal y no puede ser negativo').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),

    body("estado").isIn(['Nuevo', 'Usado']).withMessage('El estado debe ser "Nuevo" o "Usado"').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
    }),
    body("disponible").isBoolean().withMessage('El valor tiene que ser booleano').custom(async value =>{
        if(!value){
            throw new Error('No permite valores nulos');
        }
    }),
    controladorCarro.editar);

/**
 * @swagger
 * /carros/eliminar:
 *   delete:
 *     summary: Eliminar un carro
 *     tags: [Carros]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del carro a eliminar
 *     responses:
 *       200:
 *         description: Carro eliminado con éxito
 *       404:
 *         description: Carro no encontrado
 */
 rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCarro = await ModeloCarros.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCarro) {
                throw new Error('El id del carro no existe');
            }
        }
    }),
    controladorCarro.eliminar);


    rutas.get('/buscar',
        query("id").optional().isInt().withMessage("El id debe ser un entero"),
        query("marca").optional().isString().withMessage("La marca debe ser un texto"),
        query("modelo").optional().isString().withMessage("El modelo debe ser un texto"),
        query("anio").optional().isInt().withMessage("El año debe ser un entero"),
        query("color").optional().isString().withMessage("El color debe ser un texto"),
        query("precio").optional().isFloat().withMessage("El precio debe ser un número"),
        query("estado").optional().isString().withMessage("El estado debe ser un texto"),
        query("disponible").optional().isInt({ min: 0, max: 1 }).withMessage("Disponible debe ser 0 o 1"),
        controladorCarro.busqueda
    );

module.exports = rutas;