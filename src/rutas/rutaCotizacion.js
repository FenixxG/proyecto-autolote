const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCotizaciones = require('../controladores/controladorCotizacion');
const ModeloCotizaciones = require('../modelos/cotizacion');
const rutas = Router();
rutas.get('/', controladorCotizaciones.inicio);
rutas.get('/listar', controladorCotizaciones.listar);

rutas.post('/guardar',
    body("tasaInteres" ).isDecimal({min:1}).withMessage('Debe tener una tasa de interes').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    tasaInteres: value
                }
            });
        }
    }),
    body("plazo" ).isInt({min: 1}).withMessage('Debe haber un plazo de tiempo').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    plazo: value
                }
            });
        }
    }),
    body("montoTotal" ).isDecimal({min: 1}).withMessage('El monto minimo es 1').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    montoTotal: value
                }
            });
        }
    }),
    controladorCotizaciones.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCotizaciones) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("tasaInteres" ).isDecimal({min:1}).withMessage('Debe tener una tasa de interes').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    tasaInteres: value
                }
            });
        }
    }),
    body("plazo" ).isInt({min: 1}).withMessage('Debe haber un plazo de tiempo').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    plazo: value
                }
            });
        }
    }),
    body("montoTotal" ).isDecimal({min: 1}).withMessage('El monto minimo es 1').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    montoTotal: value
                }
            });
        }
    }),
    controladorCotizaciones.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCotizaciones = await ModeloCotizaciones.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCotizaciones) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCotizaciones.eliminar);
module.exports = rutas;