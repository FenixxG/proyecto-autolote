const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorEmpleado = require('../../controladores/empleados/controladorEmpleado');
const ModeloEmpleado = require('../../modelos/empleados/empleado');
const ModeloEmpleadoCargo = require('../../modelos/empleados/empleadocargo');
const rutas = Router();
//rutas.get('/', controladorEmpleado.inicio);

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Operaciones relacionadas con los empleados
 */

/**
 * @swagger
 * /empleados/listar:
 *   get:
 *     summary: Obtener lista de empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista de empleados obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del empleado
 *                   identidad:
 *                     type: string
 *                     description: Identidad del empleado
 *                   rtn:
 *                     type: string
 *                     description: RTN del empleado
 *                   primernombre:
 *                     type: string
 *                     description: Primer nombre del empleado
 *                   segundonombre:
 *                     type: string
 *                     description: Segundo nombre del empleado
 *                   primerapellido:
 *                     type: string
 *                     description: Primer apellido del empleado
 *                   segundoapellido:
 *                     type: string
 *                     description: Segundo apellido del empleado
 *                   sueldo:
 *                     type: number
 *                     format: double
 *                     description: Sueldo del empleado
 *                   estado:
 *                     type: string
 *                     enum: [AC, IN, BL]
 *                     description: Estado del empleado
 *                   imagen:
 *                     type: string
 *                     description: URL de la imagen del empleado
 */
rutas.get('/listar', controladorEmpleado.getEmpleados);

/**
 * @swagger
 * /empleados/guardar:
 *   post:
 *     summary: Registrar un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del empleado
 *               rtn:
 *                 type: string
 *                 description: RTN del empleado
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del empleado
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del empleado
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del empleado
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del empleado
 *               sueldo:
 *                 type: number
 *                 format: double
 *                 description: Sueldo del empleado
 *               estado:
 *                 type: string
 *                 enum: [AC, IN, BL]
 *                 description: Estado del empleado
 *               nombre:
 *                 type: string
 *                 description: Nombre de usuario
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 description: Contraseña
 *               tipoUsuario:
 *                 type: string
 *                 enum: [empleado]
 *                 description: Tipo de usuario
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       description: Número de teléfono
 *               direcciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     direccion:
 *                       type: string
 *                       description: Dirección del empleado
 *               cargoId:
 *                 type: integer
 *                 description: ID del cargo del empleado
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("identidad").isLength({ min: 3, max: 15 }).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({ min: 3, max: 15 }).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value => {
        if (!value) {
            throw new Error('El rtn no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El primernombre debe tener entre 3 a 50 caracteres'),
    body("segundonombre").isLength({ min: 3, max: 50 }).withMessage('El segundonombre debe tener entre 3 a 50 caracteres'),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El primerapellido debe tener entre 3 a 50 caracteres'),
    body("segundoapellido").isLength({ min: 3, max: 50 }).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres'),
    body("correo").isEmail().withMessage('El correo debe tener un formato válido').custom(async value => {
        if (!value) {
            throw new Error('El correo no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    correo: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('Este correo del empleado ya existe');
            }
        }
    }),
    body("sueldo").isDecimal({ min: 1 }).withMessage('El sueldo minimo un valor'),
    body("estado").isIn(['AC', 'IN', 'BL']).withMessage('El estado debe ser AC, IN o BL'),
    body("tipoUsuario").notEmpty().withMessage('El tipo de usuario es requerido').isIn(['cliente', 'empleado']).withMessage('Tipo de usuario no válido'),
    body("contrasena").isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().withMessage('La contraseña es requerida'),
    body("nombre").optional().isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body("telefonos").optional().isArray().withMessage('Los teléfonos deben ser un array'),
    body("direcciones").optional().isArray().withMessage('Las direcciones deben ser un array'),
    body("cargoId").optional().isInt().withMessage('El ID del cargo debe ser un número entero').custom(async value => {
        if (value) {
            const cargo = await ModeloEmpleadoCargo.findByPk(value);
            if (!cargo) {
                throw new Error('El cargo especificado no existe');
            }
        }
        return true;
    }),
    controladorEmpleado.createEmpleado);

/**
 * @swagger
 * /empleados/editar:
 *   put:
 *     summary: Editar un empleado existente
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del empleado
 *               rtn:
 *                 type: string
 *                 description: RTN del empleado
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del empleado
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del empleado
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del empleado
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del empleado
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico
 *               sueldo:
 *                 type: number
 *                 format: double
 *                 description: Sueldo del empleado
 *               estado:
 *                 type: string
 *                 enum: [AC, IN, BL]
 *                 description: Estado del empleado
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       description: Número de teléfono
 *               direcciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     direccion:
 *                       type: string
 *                       description: Dirección del empleado
 *     responses:
 *       200:
 *         description: Empleado actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Empleado no encontrado
 */
rutas.put('/editar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite valores nulos');
            } else {
                const buscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        id: value
                    }
                });
                if (!buscarEmpleado) {
                    throw new Error('El id del empleado no existe');
                }
            }
        }),
    body("identidad").isLength({ min: 3, max: 15 }).withMessage('La identidad  debe tener entre 3 a 50 caracteres').custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    identidad: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('La identidad del empleado ya existe');
            }
        }
    }),
    body("rtn").isLength({ min: 3, max: 15 }).withMessage('El rtn debe tener entre 3 a 50 caracteres').custom(async value => {
        if (!value) {
            throw new Error('El rtn no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    rtn: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('El rtn del empleado ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 50 }).withMessage('El primernombre debe tener entre 3 a 50 caracteres'),
    body("segundonombre").isLength({ min: 3, max: 50 }).withMessage('El segundonombre debe tener entre 3 a 50 caracteres'),
    body("primerapellido").isLength({ min: 3, max: 50 }).withMessage('El primerapellido debe tener entre 3 a 50 caracteres'),
    body("segundoapellido").isLength({ min: 3, max: 50 }).withMessage('El segundoapellido debe tener entre 3 a 50 caracteres'),
    body("sueldo").isDecimal({ min: 1 }).withMessage('El sueldo minimo un valor'),
    body("estado").isIn(['AC', 'IN', 'BL']).withMessage('El estado debe ser AC, IN o BL'),
    // body("tipoUsuario").notEmpty().withMessage('El tipo de usuario es requerido').isIn(['cliente', 'admin', 'empleado']).withMessage('Tipo de usuario no válido'),
    // body("contrasena").isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().withMessage('La contraseña es requerida'),
    // body("nombre").optional().isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body("correo").isEmail().withMessage('El correo debe tener un formato válido').custom(async value => {
        if (!value) {
            throw new Error('El correo no permite valores nulos');
        }
        else {
            const buscarEmpleado = await ModeloEmpleado.findOne({
                where: {
                    correo: value
                }
            });
            if (buscarEmpleado) {
                throw new Error('Este correo del empleado ya existe');
            }
        }
    }),
    body("telefonos").isArray().withMessage('Los teléfonos deben ser un array'),
    body("direcciones").isArray().withMessage('Las direcciones deben ser un array'),
    controladorEmpleado.updateEmpleado);

/**
 * @swagger
 * /empleados/eliminar:
 *   delete:
 *     summary: Eliminar un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del empleado a eliminar
 *     responses:
 *       200:
 *         description: Empleado eliminado con éxito
 *       404:
 *         description: Empleado no encontrado
 */
rutas.delete('/eliminar',
    query("id").isInt().withMessage("El id debe ser un entero")
        .custom(async value => {
            if (!value) {
                throw new Error('El id no permite valores nulos');
            } else {
                const buscarEmpleado = await ModeloEmpleado.findOne({
                    where: {
                        id: value
                    }
                });
                if (!buscarEmpleado) {
                    throw new Error('El id del empleado no existe');
                }
            }
        }),
    controladorEmpleado.deleteEmpleado);
module.exports = rutas;


rutas.get('/buscar',
    query("id").optional().isInt().withMessage("El id debe ser un entero"),
    query("identidad").optional().isString().withMessage("La identidad debe ser un texto"),
    query("primernombre").optional().isString().withMessage("El primer nombre debe ser un texto"),
    query("segundonombre").optional().isString().withMessage("El segundo nombre debe ser un texto"),
    query("primerapellido").optional().isString().withMessage("El primer apellido debe ser un texto"),
    query("segundoapellido").optional().isString().withMessage("El segundo apellido debe ser un texto"),
    query("sueldo").optional().isFloat().withMessage("El sueldo debe ser un número"),
    query("estado").optional().isString().withMessage("El estado debe ser un texto"),
    query("telefono").optional().isString().withMessage("El teléfono debe ser un texto"),
    query("direccion").optional().isString().withMessage("La dirección debe ser un texto"),
    controladorEmpleado.busqueda
);

module.exports = rutas;