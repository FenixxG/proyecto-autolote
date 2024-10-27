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
 *               imagen:
 *                 type: string
 *                 description: URL de la imagen de la motocicleta
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
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El modelo no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    modelo: value
                }
            });
            if(buscarMoto){
                throw new Error('El modelo de la motocicleta ya existe');
            }
        }
    }),
    body("anio").isInt({min: 4}).withMessage('El anio tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El año no permite valores nulos');
        }
    }),

    body("color").isLength({min: 3, max : 50}).withMessage('El color debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El color no permite valores nulos');
        }
    }),

    body("precio").isInt({min: 1, max : 3000000}).withMessage('El precio debe tener entre 1 a 3000000').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),

    body("estado").isLength({min: 3, max : 50}).withMessage('El estado debe ser Nuevo o Usado').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    estado: value
                }
            });
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
 *               imagen:
 *                 type: string
 *                 description: URL de la imagen de la motocicleta
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
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El modelo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El modelo no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    modelo: value
                }
            });
        }
    }),
    body("anio").isInt({min: 4}).withMessage('El año tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El año no permite valores nulos');
        }
    }),
    body("color").isLength({min: 3, max : 50}).withMessage('El color debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El color no permite valores nulos');
        }
    }),
    body("precio").isInt({min: 1, max : 3000000}).withMessage('El precio debe tener entre 1 a 3000000').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),
    body("estado").isLength({min: 3, max : 50}).withMessage('El estado debe ser Nuevo o Usado').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    estado: value
                }
            });
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