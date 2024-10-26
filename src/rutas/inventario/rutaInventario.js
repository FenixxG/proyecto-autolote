const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorInventario = require('../../controladores/inventario/controladorInventario');
const ModeloInventario = require('../modelos/inventario');
const rutas = Router();
rutas.get('/', controladorInventario.inicio);
rutas.get('/listar', controladorInventario.listar);
rutas.post('/guardar',
    body("nombreArticulo").isLength({min: 3, max : 50}).withMessage('El Nombre del Articulo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El Nombre del Articulo no permite valores nulos');
        }
        else{
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    nombreArticulo: value
                }
            });
        }
    }),
    body("cantidad").isInt(),
    controladorInventario.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarInventario) {
                throw new Error('El id del inventario no existe');
            }
        }
    }),
    body("nombreArticulo").isLength({min: 3, max : 50}).withMessage('El Articulo debe tener entre 3 a 50 caracteres').custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    nombreArticulo: value
                }
            });
        }
    }),
    body("cantidad").isInt(),
    controladorInventario.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarInventario = await ModeloInventario.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarInventario) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorInventario.eliminar);
module.exports = rutas;