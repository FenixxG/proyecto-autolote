const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorClienteDireccion = require('../../controladores/clientes/controladorClienteDireccion');
const ModeloClienteDireccion = require('../../modelos/clientes/clientedireccion');
const rutas = Router();
rutas.get('/', controladorClienteDireccion.inicio);
rutas.get('/listar', controladorClienteDireccion.listar);

rutas.post('/guardar',
    body("direccion").isLength({ min: 3, max: 50 }).withMessage('La direccion debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorClienteDireccion.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteDireccion = await ModeloClienteDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteDireccion){
                throw new Error('El ID del cliente direccion no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorClienteDireccion.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarClienteDireccion = await ModeloClienteDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarClienteDireccion){
                throw new Error('El id del cliente direccion no existe');
            }
        }
    }),
    controladorClienteDireccion.eliminar);
module.exports = rutas;