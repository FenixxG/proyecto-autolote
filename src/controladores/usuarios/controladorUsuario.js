const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const ModeloCliente = require('../../modelos/clientes/cliente');
const ModeloClienteTelefono = require('../../modelos/clientes/clientetelefono');
const ModeloClienteDireccion = require('../../modelos/clientes/clientedireccion');
const ModeloEmpleado = require('../../modelos/empleados/empleado');
const ModeloEmpleadoCargo = require('../../modelos/empleados/empleadocargo');
const ModeloEmpleadoTelefono = require('../../modelos/empleados/empleadotelefono');
const ModeloEmpleadoDireccion = require('../../modelos/empleados/empleadodireccion');
const ModeloUsuario = require('../../modelos/usuarios/usuario');
const db = require('../../configuraciones/db');
const { Op } = require('sequelize');
const { enviarCorreo } = require('../../configuraciones/correo');
const crypto = require('crypto');
const { getToken } = require('../../configuraciones/passport');

const generarPin = () => {
    return crypto.randomBytes(3).toString('hex').slice(0, 6);
}

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await ModeloUsuario.findAll({
            include: [
                {
                    model: ModeloCliente,
                    include: [
                        {
                            model: ModeloClienteTelefono,
                            attributes: ['telefono']
                        },
                        {
                            model: ModeloClienteDireccion,
                            attributes: ['direccion']
                        }
                    ]
                },
                {
                    model: ModeloEmpleado,
                    include: [
                        {
                            model: ModeloEmpleadoTelefono,
                            attributes: ['telefono']
                        },
                        {
                            model: ModeloEmpleadoDireccion,
                            attributes: ['direccion']
                        }
                    ]
                }
            ],
            attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt']
        });
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

// Obtener todos los usuarios de los clientes
exports.getUsuariosClientes = async (req, res) => {
    try {
        const usuario = await ModeloUsuario.findAll({
            include: {
                model: ModeloCliente,
                include: [
                    {
                        model: ModeloClienteTelefono,
                        attributes: ['telefono']
                    },
                    {
                        model: ModeloClienteDireccion,
                        attributes: ['direccion']
                    }
                ]
            },
            attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt'],
            where: {
                tipoUsuario: 'Cliente'
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios de los clientes' });
    }
};

// Obtener todos los usuarios de los empleados
exports.getUsuariosEmpleados = async (req, res) => {
    try {
        const usuario = await ModeloUsuario.findAll({
            include: {
                model: ModeloEmpleado,
                include: [
                    {
                        model: ModeloEmpleadoTelefono,
                        attributes: ['telefono']
                    },
                    {
                        model: ModeloEmpleadoDireccion,
                        attributes: ['direccion']
                    }
                ]
            },
            attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt'],
            where: {
                tipoUsuario: 'Empleado'
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios de los empleados' });
    }
};

// Obtener todos los usuarios de los clientes por estado
exports.getUsuariosClientesEstado = async (req, res) => {
    try {
        const { estado } = req.query;
        const usuario = await ModeloUsuario.findAll({
            include: {
                model: ModeloCliente,
                include: [
                    {
                        model: ModeloClienteTelefono,
                        attributes: ['telefono']
                    },
                    {
                        model: ModeloClienteDireccion,
                        attributes: ['direccion']
                    }
                ]
            },
            attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt'],
            where: {
                tipoUsuario: 'Cliente',
                estado
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios de los clientes por estado' });
    }
};

// Obtener todos los usuarios de los empleados por estado
exports.getUsuariosEmpleadosEstado = async (req, res) => {
    try {
        const { estado } = req.query;
        const usuario = await ModeloUsuario.findAll({
            include: {
                model: ModeloEmpleado,
                include: [
                    {
                        model: ModeloEmpleadoTelefono,
                        attributes: ['telefono']
                    },
                    {
                        model: ModeloEmpleadoDireccion,
                        attributes: ['direccion']
                    }
                ]
            },
            attributes: ['id', 'nombre', 'correo', 'estado', 'createdAt', 'updatedAt'],
            where: {
                tipoUsuario: 'Empleado',
                estado
            }
        });
        res.json(usuario);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los usuarios de los empleados por estado' });
    }
};

// Actualizar la contraseña
exports.updateContrasena = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { correo, contrasena, pin } = req.body;

        const usuario = await ModeloUsuario.findOne({
            where: {
                correo: correo
            }
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        else if (usuario.pin != pin) {
            return res.status(404).json({ error: 'El PIN no corresponde ' });
        }
        const hash = await argon2.hash(contrasena, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64MB
            timeCost: 4,
            parallelism: 2
        });
        await usuario.update({ contrasena: hash });
        res.json({ message: 'Contraseña actualizada correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la contraseña' });
    }
};

// Generar PIN de recuperacion de contraseña
exports.recuperarContrasena = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { correo } = req.body;

        const usuario = await ModeloUsuario.findOne({
            where: {
                correo
            }
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }
        const nuevoPin = generarPin();
        await usuario.update({ pin: nuevoPin });
        enviarCorreo({
            para: correo,
            asunto: 'Recuperacion de contraseña',
            descripcion: 'Correo enviado para la recuperacion de la contraseña',
            //html: '<h1>PIN: ' + nuevoPin + '</h1><p>Este es el PIN generado automaticamente</p>',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; padding: 20px; background-color: #f9f9f9;">
                    <h2 style="text-align: center; color: #4CAF50;">Recuperación de Contraseña</h2>
                    <p style="font-size: 16px; color: #333;">Hola,</p>
                    <p style="font-size: 16px; color: #333;">Recibimos una solicitud para restablecer tu contraseña. Utiliza el siguiente PIN para completar el proceso:</p>
                    <div style="text-align: center; margin: 20px 0;">
                        <span style="display: inline-block; font-size: 24px; color: #ffffff; background-color: #4CAF50; padding: 10px 20px; border-radius: 5px;">${nuevoPin}</span>
                    </div>
                <p style="font-size: 14px; color: #777;">Este PIN es válido solo por un tiempo limitado. Si no solicitaste este cambio, por favor ignora este correo.</p>
                <p style="text-align: center; color: #999; font-size: 12px; margin-top: 20px;">&copy; 2024 Tu Autolote. Todos los derechos reservados.</p>
                </div>
            `
        })
        res.json({ message: 'Correo enviado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al enviar el correo' });
        console.log(error);
    }
};

// Inicio de sesion
exports.InicioSesion = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { login, contrasena } = req.body;

        const usuario = await ModeloUsuario.findOne({
            atributes: ['nombre', 'tipoUsuario', 'correo', 'contrasena'],
            include: [
                {
                    model: ModeloCliente,
                    atributes: ['nombreCompleto','primernombre', 'segundonombre', 'primerapellido', 'segundoapellido', 'imagen'],
                    include: [
                        {
                            model: ModeloClienteTelefono,
                            atributes: ['telefono']
                        },
                        {
                            model: ModeloClienteDireccion,
                            atributes: ['direccion', 'longitud', 'latitud']
                        }
                    ]
                },
                {
                    model: ModeloEmpleado,
                    atributes: ['primernombre', 'segundonombre', 'primerapellido', 'segundoapellido', 'imagen'],
                    include: [
                        {
                            model: ModeloEmpleadoCargo,
                            atributes: ['nombre']
                        },
                        {
                            model: ModeloEmpleadoTelefono,
                            atributes: ['telefono']
                        },
                        {
                            model: ModeloEmpleadoDireccion,
                            atributes: ['direccion', 'longitud', 'latitud']
                        }
                    ]
                }
            ],
            where: {
                [Op.or]: [
                    { correo: { [Op.like]: login } },
                    { nombre: { [Op.like]: login } }
                ],
                estado: 'Activo'
            }
        });
        if (!usuario) {
            return res.status(404).json({ error: 'Usuario o contraseña incorrecto' });
        }
        else {
            if (await argon2.verify(usuario.contrasena, contrasena)) {
                const Usuario = {
                    login: usuario.nombre,
                    tipo: usuario.tipoUsuario,
                    correo: usuario.correo,
                    datoPersonales: usuario.tipoUsuario == 'Cliente' ? usuario.clientes[0] : usuario.empleados[0]
                };
                const Token = getToken({ id: usuario.id });
                return res.json({ Token, Usuario });
            } else {
                console.log(error);
                return res.status(404).json({ error: 'Usuario o contraseña es incorrecto' });
            }
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al momento de iniciar sesion' });
        console.log(error);
    }
}
