const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorMotocicleta = require('../../controladores/motocicletas/controladorMotocicleta');
const ModeloMotocicleta = require('../../modelos/motocicletas/motocicleta');
const rutas = Router();
rutas.get('/', controladorMotocicleta.inicio);

/**
 * @swagger
 * tags:
 *   name: Motocicletas
 *   description: Operaciones relacionadas con las motocicletas
 */

/**
 * @swagger
 * /motocicletas/listar:
 *   get:
 *     summary: Obtener lista de motocicletas
 *     tags: [Motocicletas]
 *     responses:
 *       200:
 *         description: Lista de motocicletas obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID de la motocicleta
 *                   marca:
 *                     type: string
 *                     description: Marca de la motocicleta
 *                   modelo:
 *                     type: string
 *                     description: Modelo de la motocicleta
 *                   anio:
 *                     type: integer
 *                     description: Año de la motocicleta
 *                   color:
 *                     type: string
 *                     description: Color de la motocicleta
 *                   precio:
 *                     type: number
 *                     format: decimal
 *                     description: Precio de la motocicleta
 *                   estado:
 *                     type: string
 *                     enum: [Nuevo, Usado]
 *                     description: Estado de la motocicleta
 *                   disponible:
 *                     type: boolean
 *                     description: Disponibilidad de la motocicleta
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen de la motocicleta
 */
rutas.get('/listar', controladorMotocicleta.listar);

/**
 * @swagger
 * /motocicletas/guardar:
 *   post:
 *     summary: Registrar una nueva motocicleta
 *     tags: [Motocicletas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *                 description: Marca de la motocicleta
 *               modelo:
 *                 type: string
 *                 description: Modelo de la motocicleta
 *               anio:
 *                 type: integer
 *                 description: Año de la motocicleta
 *               color:
 *                 type: string
 *                 description: Color de la motocicleta
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio de la motocicleta
 *               estado:
 *                 type: string
 *                 enum: [Nuevo, Usado]
 *                 description: Estado de la motocicleta
 *               disponible:
 *                 type: boolean
 *                 description: Disponibilidad de la motocicleta
 *     responses:
 *       201:
 *         description: Motocicleta creada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("marca").isLength({min: 3, max : 50}).withMessage('La marca debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La marca no permite valores nulos');
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres'),
    body("anio").isInt({ min: 1950 }).withMessage('El año debe ser un número entero y no menor que 1950').custom(async value => {
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
    controladorMotocicleta.guardar);

/**
 * @swagger
 * /motocicletas/editar:
 *   put:
 *     summary: Editar una motocicleta existente
 *     tags: [Motocicletas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la motocicleta a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *                 description: Marca de la motocicleta
 *               modelo:
 *                 type: string
 *                 description: Modelo de la motocicleta
 *               anio:
 *                 type: integer
 *                 description: Año de la motocicleta
 *               color:
 *                 type: string
 *                 description: Color de la motocicleta
 *               precio:
 *                 type: number
 *                 format: decimal
 *                 description: Precio de la motocicleta
 *               estado:
 *                 type: string
 *                 enum: [Nuevo, Usado]
 *                 description: Estado de la motocicleta
 *               disponible:
 *                 type: boolean
 *                 description: Disponibilidad de la motocicleta
 *     responses:
 *       200:
 *         description: Motocicleta actualizada exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Motocicleta no encontrada
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarMoto) {
                throw new Error('El id de la motocicleta no existe');
            }
        }
    }),
    body("marca").isLength({min: 3, max : 50}).withMessage('La marca debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La marca no permite valores nulos');
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres'),
    body("anio").isInt({ min: 1950 }).withMessage('El año debe ser un número entero y no menor que 1950').custom(async value => {
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
    controladorMotocicleta.editar);

/**
 * @swagger
 * /motocicletas/eliminar:
 *   delete:
 *     summary: Eliminar una motocicleta
 *     tags: [Motocicletas]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la motocicleta a eliminar
 *     responses:
 *       200:
 *         description: Motocicleta eliminada con éxito
 *       404:
 *         description: Motocicleta no encontrada
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarMoto) {
                throw new Error('El id de la motocicleta no existe');
            }
        }
    }),
    controladorMotocicleta.eliminar);
module.exports = rutas;

rutas.get('/buscar',
    query("marca").optional().isString().withMessage("La marca debe ser un texto"),
    query("modelo").optional().isString().withMessage("El modelo debe ser un texto"),
    query("anio").optional().isInt().withMessage("El año debe ser un entero"),
    query("color").optional().isString().withMessage("El color debe ser un texto"),
    query("precio").optional().isFloat().withMessage("El precio debe ser un número"),
    query("estado").optional().isString().withMessage("El estado debe ser un texto"),
    query("disponible").optional().isBoolean().withMessage("Disponible debe ser un valor booleano"),
    controladorMotocicleta.busqueda
);
