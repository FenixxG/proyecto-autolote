const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleadoTelefono = require('../../controladores/empleados/controladorEmpleadoTelefono');
const ModeloEmpleadoTelefono = require('../../modelos/empleados/empleadotelefono');
const rutas = Router();

rutas.get('/', controladorEmpleadoTelefono.inicio);
rutas.get('/listar', controladorEmpleadoTelefono.listar);


rutas.post('/guardar',
    body("numero").isLength({ min: 3, max: 15 }).withMessage('El numero debe tener entre 3 y 15 caracteres'),
    controladorEmpleadoTelefono.guardar);

rutas.put('/editar',
    query("id").isInt().withMessage("El ID debe ser un número entero")
    .custom(async value => {
        if(!value){
            throw new Error('El id no permite valores nulos');
        }
        else{
            const buscarEmpleadoTelefono = await ModeloEmpleadoTelefono.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleadoTelefono){
                throw new Error('El ID del empleado telefono no existe');
            }
        }
    }),
    body("numero").isLength({ min: 3, max: 15 }).withMessage('El numero debe tener entre 3 y 15 caracteres'),
    controladorEmpleadoTelefono.editar);

rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
    .custom(async value =>{
        if(!value){
            throw new Error('El nombre no permite valores nulos');
        }
        else{
            const buscarEmpleadoTelefono = await ModeloEmpleadoTelefono.findOne({
                where: {
                    id: value
                }
            });
            if(!buscarEmpleadoTelefono){
                throw new Error('El id del empleado telefono no existe');
            }
        }
    }),
    controladorEmpleadoTelefono.eliminar);
module.exports = rutas;