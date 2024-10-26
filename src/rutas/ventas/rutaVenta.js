const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorVenta = require('../../controladores/ventas/controladorVenta');
const ModeloVenta = require('../modelos/venta');
const rutas = Router();
rutas.get('/', controladorVenta.inicio);
rutas.get('/listar', controladorVenta.listar);
rutas.post('/guardar',
    body("precio").isDecimal({min: 1}).withMessage('El precio debe tener minimo 1 caracter').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
        else{
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    precio: value
                }
            });
        }
    }),
    body("formaPago").isString({min: 3, max : 50}).withMessage('La formaPago debe ser efectivo, tarjeta, transferencia o credito').custom(async value =>{
        if(!value){
            throw new Error('La formaPago no permite valores nulos');
        }
        else{
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    formaPago: value
                }
            });
        }
    }),
    controladorVenta.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarVenta) {
                throw new Error('El id de la venta no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener 3-50 caracteres')
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    nombre: value
                }
            });
            if (buscarVenta) {
                throw new Error('El nombre de la venta ya existe');
            }
        }
    }),
    body("activo").optional().isBoolean().withMessage("Solo se permiten valores booleanos"),
    controladorVenta.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarVenta = await ModeloVenta.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarVenta) {
                throw new Error('El id de la venta no existe');
            }
        }
    }),
    controladorVenta.eliminar);
module.exports = rutas;