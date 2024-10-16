const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorMotocicleta = require('../controladores/controladorMotocicleta');
const ModeloMotocicleta = require('../modelos/motocicleta');
const rutas = Router();
rutas.get('/', controladorMotocicleta.inicio);
rutas.get('/listar', controladorMotocicleta.listar);

rutas.post('/guardar',
    body("marca").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    modelo: value
                }
            });
        }
    }),
    body("anio").isInt({min: 4}).withMessage('El anio tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),

    body("color").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),

    body("precio").isInt({min: 1, max : 3000000}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),

    body("estado").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
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
            throw new Error('El anio no permite valores nulos');
        }
    }),
    controladorMotocicleta.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarMoto) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("marca").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    modelo: value
                }
            });
        }
    }),
    body("anio").isInt({min: 4}).withMessage('El anio tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),
    body("color").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),
    body("precio").isInt({min: 1, max : 3000000}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),
    body("estado").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
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
            throw new Error('El anio no permite valores nulos');
        }
    }),
    controladorMotocicleta.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarMoto = await ModeloMotocicleta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarMoto) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorMotocicleta.eliminar);
module.exports = rutas;