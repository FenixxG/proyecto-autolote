const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorProveedor = require('../controladores/controladorProveedor');
const ModeloProveedor = require('../modelos/proveedor');
const rutas = Router();
rutas.get('/', controladorProveedor.inicio);
rutas.get('/listar', controladorProveedor.listar);

rutas.post('/guardar',
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('la direccion no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    body("email").isString({min: 4}).withMessage('El email tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
    }),

    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloProveedor.findOne({
                where: {
                    telefono: value
                }
            });
        }
    }),
    controladorProveedor.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarProveedor) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("nombre").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('la direccion no permite valores nulos');
        }
        else{
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    body("email").isString({min: 4}).withMessage('El email tiene que ser numerico').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
    }),
    body("telefono").isInt({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
    }),
    controladorProveedor.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarProveedor = await ModeloProveedor.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarProveedor) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorProveedor.eliminar);
module.exports = rutas;