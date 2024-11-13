const { Router } = require('express');
const { body, query } = require('express-validator');
const controladorCliente = require('../../controladores/clientes/controladorCliente');
const ModeloCliente = require('../../modelos/clientes/cliente');
const rutas = Router();
//rutas.get('/', controladorCliente.inicio);

/**
 * @swagger
 * tags:
 *   name: Clientes
 *   description: Operaciones relacionadas con los clientes
 */

/**
 * @swagger
 * /clientes/listar:
 *   get:
 *     summary: Obtener lista de clientes
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: Lista de clientes obtenida con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: ID del cliente
 *                   identidad:
 *                     type: string
 *                     description: Identidad del cliente
 *                   rtn:
 *                     type: string
 *                     description: RTN del cliente
 *                   primernombre:
 *                     type: string
 *                     description: Primer nombre del cliente
 *                   segundonombre:
 *                     type: string
 *                     description: Segundo nombre del cliente
 *                   primerapellido:
 *                     type: string
 *                     description: Primer apellido del cliente
 *                   segundoapellido:
 *                     type: string
 *                     description: Segundo apellido del cliente
 *                   email:
 *                     type: string
 *                     description: Correo electrónico del cliente
 */
rutas.get('/listar', controladorCliente.getClientes);

/**
 * @swagger
 * /clientes/guardar:
 *   post:
 *     summary: Registrar un nuevo cliente
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               correo:
 *                 type: string
 *                 format: email
 *                 description: Correo electrónico del cliente
 *               nombre:
 *                 type: string
 *                 description: Nombre completo para el usuario
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               tipoUsuario:
 *                 type: string
 *                 enum: [cliente, empleado]
 *                 description: Tipo de usuario
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       description: Número de teléfono del cliente
 *               direcciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     direccion:
 *                       type: string
 *                       description: Dirección del cliente
 *     responses:
 *       201:
 *         description: Cliente creado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 */
rutas.post('/guardar',
    body("identidad").isLength({ min: 3, max: 15 }).withMessage('La identidad debe tener entre 3 a 15 caracteres').custom(async value => {
        if (!value) {
            throw new Error('La identidad no permite valores nulos');
        }
        else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    identidad: value
                }
            });
            if (buscarCliente) {
                throw new Error('La identidad del cliente ya existe');
            }
        }
    }),
    body("rtn").isLength({ min: 3, max: 15 }).withMessage('El rtn debe tener entre 3 a 15 caracteres').custom(async value => {
        if (!value) {
            throw new Error('El rtn no permite valores nulos');
        }
        else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    rtn: value
                }
            });
            if (buscarCliente) {
                throw new Error('El rtn del cliente ya existe');
            }
        }
    }),
    body("primernombre").isLength({ min: 3, max: 20 }).withMessage('El primernombre debe tener entre 3 a 20 caracteres').custom(async value => {
        if (!value) {
            throw new Error('El primernombre no permite valores nulos');
        }
    }),
    body("primerapellido").isLength({ min: 3, max: 20 }).withMessage('El primerapellido debe tener entre 3 a 20 caracteres').custom(async value => {
        if (!value) {
            throw new Error('El primerapellido no permite valores nulos');
        }
    }),
    body("correo").isEmail().withMessage('El correo debe tener un formato válido').custom(async value => {
        if (!value) {
            throw new Error('El correo no permite valores nulos');
        }
        else {
            const buscarCliente = await ModeloCliente.findOne({
                where: {
                    correo: value
                }
            });
            if (buscarCliente) {
                throw new Error('Este correo del cliente ya existe');
            }
        }
    }),
    body("tipoUsuario").notEmpty().withMessage('El tipo de usuario es requerido').isIn(['cliente', 'empleado']).withMessage('Tipo de usuario no válido'),
    body("contrasena").isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().withMessage('La contraseña es requerida'),
    body("nombre").optional().isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body("telefonos").isArray().withMessage('Los teléfonos deben ser un array'),
    body("direcciones").isArray().withMessage('Las direcciones deben ser un array'),
    controladorCliente.createCliente);

/**
 * @swagger
 * /clientes/editar:
 *   put:
 *     summary: Editar un cliente existente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               identidad:
 *                 type: string
 *                 description: Identidad del cliente
 *               rtn:
 *                 type: string
 *                 description: RTN del cliente
 *               primernombre:
 *                 type: string
 *                 description: Primer nombre del cliente
 *               segundonombre:
 *                 type: string
 *                 description: Segundo nombre del cliente
 *               primerapellido:
 *                 type: string
 *                 description: Primer apellido del cliente
 *               segundoapellido:
 *                 type: string
 *                 description: Segundo apellido del cliente
 *               correo:
 *                 type: string
 *                 description: Correo electrónico del cliente
 *               nombre:
 *                 type: string
 *                 description: Nombre completo para el usuario
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 description: Contraseña del usuario
 *               tipoUsuario:
 *                 type: string
 *                 enum: [cliente, empleado]
 *                 description: Tipo de usuario
 *               telefonos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     telefono:
 *                       type: string
 *                       description: Número de teléfono del cliente
 *               direcciones:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     direccion:
 *                       type: string
 *                       description: Dirección del cliente
 *     responses:
 *       200:
 *         description: Cliente actualizado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       404:
 *         description: Cliente no encontrado
 */
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
        body("identidad").isLength({ min: 3, max: 15 }).withMessage('La identidad debe tener entre 3 a 15 caracteres').custom(async value => {
            if (!value) {
                throw new Error('La identidad no permite valores nulos');
            }
            else {
                const buscarCliente = await ModeloCliente.findOne({
                    where: {
                        identidad: value
                    }
                });
                if (!buscarCliente) {
                    throw new Error('La identidad del cliente ya existe');
                }
            }
        }),
        body("rtn").isLength({ min: 3, max: 15 }).withMessage('El rtn debe tener entre 3 a 15 caracteres').custom(async value => {
            if (!value) {
                throw new Error('El rtn no permite valores nulos');
            }
            else {
                const buscarCliente = await ModeloCliente.findOne({
                    where: {
                        rtn: value
                    }
                });
                if (!buscarCliente) {
                    throw new Error('El rtn del cliente ya existe');
                }
            }
        }),
        body("primernombre").isLength({ min: 3, max: 20 }).withMessage('El primernombre debe tener entre 3 a 20 caracteres').custom(async value => {
            if (!value) {
                throw new Error('El primernombre no permite valores nulos');
            }
        }),
        body("primerapellido").isLength({ min: 3, max: 20 }).withMessage('El primerapellido debe tener entre 3 a 20 caracteres').custom(async value => {
            if (!value) {
                throw new Error('El primerapellido no permite valores nulos');
            }
        }),
        body("correo").isEmail().withMessage('El correo debe tener un formato válido').custom(async value => {
            if (!value) {
                throw new Error('El correo no permite valores nulos');
            }
            else {
                const buscarCliente = await ModeloCliente.findOne({
                    where: {
                        correo: value
                    }
                });
                if (!buscarCliente) {
                    throw new Error('Este correo del cliente ya existe');
                }
            }
        }),
    body("tipoUsuario").notEmpty().withMessage('El tipo de usuario es requerido').isIn(['cliente', 'admin', 'empleado']).withMessage('Tipo de usuario no válido'),
    body("contrasena").isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres').notEmpty().withMessage('La contraseña es requerida'),
    body("nombre").optional().isLength({ min: 3, max: 100 }).withMessage('El nombre debe tener entre 3 y 100 caracteres'),
    body("telefonos").isArray().withMessage('Los teléfonos deben ser un array'),
    body("direcciones").isArray().withMessage('Las direcciones deben ser un array'),
    controladorCliente.updateCliente);

/**
 * @swagger
 * /clientes/eliminar:
 *   delete:
 *     summary: Eliminar un cliente
 *     tags: [Clientes]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del cliente a eliminar
 *     responses:
 *       200:
 *         description: Cliente eliminado con éxito
 *       404:
 *         description: Cliente no encontrado
 */
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
    controladorCliente.deleteCliente);

    rutas.get('/buscar',
        query("id").optional().isInt().withMessage("El id debe ser un entero"),
        query("nombre").optional().isString().withMessage("El nombre debe ser un texto"),
        query("correo").optional().isEmail().withMessage("El correo debe ser un correo electrónico válido"),
        query("telefono").optional().isString().withMessage("El teléfono debe ser un texto"),
        query("direccion").optional().isString().withMessage("La dirección debe ser un texto"),
        controladorCliente.busqueda
    );


module.exports = rutas;