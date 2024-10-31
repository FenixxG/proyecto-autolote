const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleadoDireccion = require('../../controladores/empleados/controladorEmpleadoDireccion');
const ModeloEmpleadoDireccion = require('../../modelos/empleados/empleadodireccion');
const rutas = Router();
rutas.get('/', controladorEmpleadoDireccion.inicio);
rutas.get('/listar', controladorEmpleadoDireccion.listar);

rutas.post('/guardar',
    body("direccion").isLength({ min: 3, max: 50 }).withMessage('La direccion debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"), // AL USAR .OPTIONAL SI SE ENVIA UN VALOR QUE HAGA LA VALIDACION, SI NO SE ENVIA, NO SE VALIDA
    controladorEmpleadoDireccion.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleadoDireccion = await ModeloEmpleadoDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleadoDireccion){
                throw new Error('El ID del empleado direccion no existe');
            }
        }
    }),
    body("nombre").isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body("activo").optional().isBoolean().withMessage("SOLO SE PERMITEN VALORES BOOLEANOS"),
    controladorEmpleadoDireccion.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleadoDireccion = await ModeloEmpleadoDireccion.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleadoDireccion){
                throw new Error('El id del empleado direccion no existe');
            }
        }
    }),
    controladorEmpleadoDireccion.eliminar);
module.exports = rutas;