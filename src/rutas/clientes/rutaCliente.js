const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../../controladores/clientes/controladorCliente');
const ModeloCliente = require('../modelos/cliente');
const rutas = Router();
rutas.get('/', controladorCliente.inicio);
rutas.get('/listar', controladorCliente.listar);

rutas.post('/guardar',
    body("identidad").isLength({min: 3, max : 15}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El rtn del cliente ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 1, max : 20}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 1, max : 20}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundonombre: value
                }
            })
        }
    }),
    body("primerapellido").isLength({min: 1, max : 20}).withMessage('El primerapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primerapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 1, max : 20}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundoapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("email").isLength({min: 3, max : 50}).withMessage('El email debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    email: value
                }
            });
            if(buscarCliente){
                throw new Error('Este email del cliente ya existe');
            }
        }
    }),
    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    telefono: value
                }
            });
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La direccion no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    controladorCliente.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCliente) {
                throw new Error('El id del cliente no existe');
            }
        }
    }),
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad debe tener entre 3 a 15 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if(buscarCliente){
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if(buscarCliente){
                throw new Error('El nombre del cargo ya existe');
            }
        }
    }),
    body("primernombre").isLength({min: 1, max : 20}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El primernombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 1, max : 20}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    nombre: value
                }
            })
        }
    }),
    body("primerapellido").isLength({min: 1, max : 20}).withMessage('El primerapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 1, max : 20}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundoapellido no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("email").isLength({min: 3, max : 50}).withMessage('El email debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El email no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    email: value
                }
            });
            if(buscarCliente){
                throw new Error('El email del cliente ya existe');
            }
        }
    }),
    body("telefono").isLength({min: 3, max : 50}).withMessage('El telefono debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El telefono no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    telefono: value
                }
            });
            if(buscarCliente){
                throw new Error('El telefono del cliente ya existe');
            }
        }
    }),
    body("direccion").isLength({min: 3, max : 50}).withMessage('La direccion debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La direccion no permite valores nulos');
        }
        else{
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    direccion: value
                }
            });
        }
    }),
    controladorCliente.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCliente) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCliente.eliminar);
module.exports = rutas;