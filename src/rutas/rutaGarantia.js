const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorGarantia = require('../controladores/controladorGarantia');
const ModeloGarantia = require('../modelos/garantia');
const rutas = Router();
rutas.get('/', controladorGarantia.inicio);
rutas.get('/listar', controladorGarantia.listar);

rutas.post('/guardar',
    body("tipo").isString({min: 3, max : 15}).withMessage('El tipo debe ser  completa o limitada').custom(async value =>{
        if(!value){
            throw new Error('El tipo no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    tipo: value
                }
            });
        }
    }),
    body("duracionMeses").isLength({min: 1, max : 50}).withMessage('El mes debe ser entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La duracion no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    duracionMeses: value
                }
            });

        }
    }),
    body("descripcion").isLength({min: 3, max : 50}).withMessage('La descripcion debe tener entre 3 a 50 caracteres'),
    controladorGarantia.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarGarantia) {
                throw new Error('El id de la garantia no existe');
            }
        }
    }),
    body("tipo").isString({min: 3, max : 15}).withMessage('El tipo debe ser  completa o limitada').custom(async value =>{
        if(!value){
            throw new Error('El tipo no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    tipo: value
                }
            });
        }
    }),
    body("duracionMeses").isLength({min: 1, max : 50}).withMessage('El mes debe ser entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La duracion del mes no permite valores nulos');
        }
        else{
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    duracionMeses: value
                }
            });
        }
    }),
    body("descripcion").isLength(),
    controladorGarantia.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarGarantia = await ModeloGarantia.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarGarantia) {
                throw new Error('El id de la garantia no existe');
            }
        }
    }),
    controladorGarantia.eliminar);
module.exports = rutas;