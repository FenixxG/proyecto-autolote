const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleado = require('../controladores/controladorEmpleado');
const ModeloEmpleado = require('../modelos/empleado');
const rutas = Router();
rutas.get('/', controladorEmpleado.inicio);
rutas.get('/listar', controladorEmpleado.listar);
rutas.post('/guardar',
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
        }
    }),
    body("primernombre").isLength({min: 3, max : 50}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El noprimernombrembre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundonombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 3, max : 50}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("sueldo").isDecimal({min: 1}).withMessage('El sueldo minimo un valor').custom(async value =>{
        if(!value){
            throw new Error('El sueldo debe tener minimo un valor');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    sueldo: value
                }
            });
        }
    }),
    body("estado").isString({min: 3, max : 50}).withMessage('El estado debe ser AC, IN o BL').custom(async value =>{
        if(!value){
            throw new Error('El estado debe ser AC, IN o BL');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    estado: value
                }
            });
        }
    }),
    body("imagen").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    imagen: value
                }
            });
        }
    }),
    controladorEmpleado.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCliente) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("identidad").isLength({min: 3, max : 15}).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('La identidad no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
        }
    }),
    body("rtn").isLength({min: 3, max : 15}).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El rtn no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
        }
    }),
    body("primernombre").isLength({min: 3, max : 50}).withMessage('El primernombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El noprimernombrembre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primernombre: value
                }
            });
            }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundonombre: value
                }
            });
        }
    }),
    body("segundonombre").isLength({min: 3, max : 50}).withMessage('El segundonombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El segundonombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    primerapellido: value
                }
            });
        }
    }),
    body("segundoapellido").isLength({min: 3, max : 50}).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    segundoapellido: value
                }
            });
        }
    }),
    body("sueldo").isDecimal({min: 1}).withMessage('El sueldo minimo un valor').custom(async value =>{
        if(!value){
            throw new Error('El sueldo debe tener minimo un valor');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    sueldo: value
                }
            });
        }
    }),
    body("estado").isLength({min: 3, max : 50}).withMessage('El estado debe ser AC, IN o BL').custom(async value =>{
        if(!value){
            throw new Error('El estado debe ser AC, IN o BL');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    estado: value
                }
            });
        }
    }),
    body("imagen").isLength({min: 3, max : 50}).withMessage('El nombre debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    imagen: value
                }
            });
        }
    }),
    controladorEmpleado.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarEmpleado) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorEmpleado.eliminar);
module.exports = rutas;