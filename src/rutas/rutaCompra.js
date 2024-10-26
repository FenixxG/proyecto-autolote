const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCompras = require('../controladores/controladorCompra');
const ModeloCompras = require('../modelos/compra');
const rutas = Router();
rutas.get('/', controladorCompras.inicio);
rutas.get('/listar', controladorCompras.listar);

rutas.post('/guardar',
    body("precio").isDecimal({min: 1}).withMessage('El precio debe tener almenos un valor').custom(async value =>{
        if(!value){
            throw new Error('El precio no permite valores nulos');
        }
        else{
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    precio: value
                }
            });
        }
    }),
    controladorCompras.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El nombre no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCompras) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    body("precio").isDecimal({ min: 1 }).withMessage('El precio debe tener un valor')
    .custom(async value => {
        if (!value) {
            throw new Error('El precio no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    nombre: value
                }
            });
        }
    }),
    controladorCompras.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value => {
        if (!value) {
            throw new Error('El id no permite valores nulos');
        } else {
            const buscarCompras = await ModeloCompras.findOne({
                where: {
                    id: value
                }
            });
            if (!buscarCompras) {
                throw new Error('El id del cargo no existe');
            }
        }
    }),
    controladorCompras.eliminar);
module.exports = rutas;