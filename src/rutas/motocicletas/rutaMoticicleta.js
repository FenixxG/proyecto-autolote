const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorMotocicleta = require('../../controladores/motocicletas/controladorMotocicleta');
const ModeloMotocicleta = require('../modelos/motocicleta');
const rutas = Router();
rutas.get('/', controladorMotocicleta.inicio);
rutas.get('/listar', controladorMotocicleta.listar);

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