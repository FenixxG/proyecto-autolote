const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCargo= require('../controladores/controladorCargo');
const ModeloCargo = require('../modelos/cargo');
const rutas = Router();
rutas.get('/', controladorCargo.inicio);
rutas.get('/listar', controladorCargo.listar);

rutas.post('/guardar',
    body("nombre").isLength({min: 3, max : 20}).withMessage('El cargo debe tener entre 3 a 20 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    nombre: value
                }
            });
            if(buscarCargo){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("descripcion").isLength({min: 1, max : 50}).withMessage('La descripcion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La descripcion no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    descripcion: value
                }
            });
        }
    }),
    body("activo").isBoolean({min: 4}).withMessage('El activo tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El activo no permite valores nulos');
        }
    }),
    controladorCargo.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("descripcion").isLength({min: 1, max : 50}).withMessage('La descripcion debe tener entre 1 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La descripcion no permite valores nulos');
        }
        else{
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    descripcion: value
                }
            });
        }
    }),
    body("activo").isBoolean({min: 1}).withMessage('El anio tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El anio no permite valores nulos');
        }
    }),
    controladorCargo.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCargo = await ModeloCargo.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCargo) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCargo.eliminar);
module.exports = rutas;