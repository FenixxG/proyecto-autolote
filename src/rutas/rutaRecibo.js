const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorRecibo = require('../controladores/controladorRecibo');
const ModeloRecibo = require('../modelos/recibo');
const rutas = Router();
rutas.get('/', controladorRecibo.inicio);
rutas.get('/listar', controladorRecibo.listar);
rutas.post('/guardar',
    body("monto").isDecimal({min: 1}).withMessage('El monto debe tener minimo un caracter').custom(async value =>{
        if(!value){
            throw new Error('El monto no permite valores nulos');
        }
        else{
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    monto: value
                }
            });
        }
    }),
    body("formaPago").isString({min: 3, max :10}).withMessage('La formaPago debe ser efectivo, tarjeta, transferencia o credito').custom(async value =>{
        if(!value){
            throw new Error('La formaPago no permite valores nulos');
        }
        else{
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    formaPago: value
                }
            });
        }
    }),
    controladorRecibo.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarRecibos) {
                throw new Error('El id del recibo no existe');
            }
        }
    }),
    body("monto").isDecimal({min: 1}).withMessage('El monto debe tener minimo un caracter').custom(async value =>{
        if(!value){
            throw new Error('El monto no permite valores nulos');
        }
        else{
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    monto: value
                }
            });
        }
    }),
    body("formaPago").isString({min: 3, max :10}).withMessage('La formaPago debe ser efectivo, tarjeta, transferencia o credito').custom(async value =>{
        if(!value){
            throw new Error('La formaPago no permite valores nulos');
        }
        else{
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    formaPago: value
                }
            });
        }
    }),
    controladorRecibo.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarRecibos = await ModeloRecibo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarRecibos) {
                throw new Error('El id del recibo no existe');
            }
        }
    }),
    controladorRecibo.eliminar);
module.exports = rutas;