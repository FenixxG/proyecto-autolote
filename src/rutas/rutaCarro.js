const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCarro= require('../controladores/controladorCarro');
const ModeloCarros = require('../modelos/carro');
const rutas = Router();
rutas.get('/', controladorCarro.inicio);
rutas.get('/listar', controladorCarro.listar);

rutas.post('/guardar',
    body("marca").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La marca no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El modelo no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
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
            throw new Error('El color no permite valores nulos');
        }
    }),

    body("precio").isInt({min: 1, max : 3000000}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),

    body("estado").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
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
    controladorCarro.guardar);

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
    body("marca").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La marca no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
                where: {
                    marca: value
                }
            });
        }
    }),
    body("modelo").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El modelo no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
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
    body("precio").isInt({min: 1, max : 3000000}).withMessage('El precio debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
    }),
    body("estado").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El estado no permite valores nulos');
        }
        else{
            const buscarCarro = await ModeloCarros.findOne({
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
    controladorCarro.editar);

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
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCarro.eliminar);
module.exports = rutas;