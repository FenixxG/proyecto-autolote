const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorServicio = require('../controladores/controladorServicio');
const ModeloServicio = require('../modelos/servicio');
const rutas = Router();
rutas.get('/', controladorServicio.inicio);
rutas.get('/listar', controladorServicio.listar);

rutas.post('/guardar',
   body("descripcion").isString({ max : 80}).withMessage('El maximo es de 80 caracteres').custom(async value =>{
    }),
    body("costo").isDecimal({min: 1, }).withMessage('El costo debe tener minimo 1 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El costo no permite valores nulos');
        }
        else{
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    costo: value
                }
            });
        }
    }),
    controladorServicio.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarServicio) {
                throw new Error('El id del servicio no existe');
            }
        }
    }),
    body("descripcion").isString({ max : 80}).withMessage('El maximo es de 80 caracteres').custom(async value =>{}),
    body("costo").isDecimal({min: 1, }).withMessage('El costo debe tener minimo 1 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El costo no permite valores nulos');
        }
        else{
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    costo: value
                }
            });
        }
    }),
    controladorServicio.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarServicio = await ModeloServicio.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarServicio) {
                throw new Error('El id del servicio no existe');
            }
        }
    }),
    controladorServicio.eliminar);
module.exports = rutas;