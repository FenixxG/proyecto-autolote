const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const Cliente = require('../../modelos/clientes/cliente');
const ClienteTelefono = require('../../modelos/clientes/clientetelefono');
const ClienteDireccion = require('../../modelos/clientes/clientedireccion');
const Usuario = require('../../modelos/usuarios/usuario');
const db = require('../../configuraciones/db');
const { enviar, errores} = require('../../configuraciones/ayuda');



// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: [
                {
                    model: ClienteTelefono,
                    atributes: ['telefono']
                },
                {
                    model: ClienteDireccion,
                    atributes: ['direccion']
                }
            ]
        });
        res.json(clientes);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const t = await db.transaction();

    try {
        const { nombre, correo, tipoUsuario, contrasena, telefonos, direcciones } = req.body;

        const hash = await argon2.hash(contrasena, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64MB
            timeCost: 4,
            parallelism: 2
        });

        // Crear el usuario del Cliente
        const usuario = await Usuario.create(
            { nombre, correo, tipoUsuario, contrasena: hash },
            { transaction: t }
        );

        // Crear el Cliente
        const cliente = await Cliente.create({ ...req.body, usuarioId: usuario.id }, { transaction: t });

        // Crear los telefonos asociados al Cliente
        if (telefonos && Array.isArray(telefonos)) {
            const telefonosData = telefonos.map((tel) => ({
                telefono: tel.telefono,
                clienteId: cliente.id,
            }));
            await ClienteTelefono.bulkCreate(telefonosData, { transaction: t });
        }

        // Crear las direcciones asociadas al Cliente
        if (direcciones && Array.isArray(direcciones)) {
            const direccionesData = direcciones.map((dir) => ({
                direccion: dir.direccion,
                clienteId: cliente.id,
            }));
            await ClienteDireccion.bulkCreate(direccionesData, { transaction: t });
        }
        await t.commit();
        res.status(201).json(cliente);
    } catch (error) {
        console.error(error);
        await t.rollback();
        res.status(500).json({ error: 'Error al crear el cliente' });
        console.log(error);
    }
};

// Actualizar un cliente
exports.updateCliente = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { id } = req.query;
        const { nombre, correo, rtn, telefonos, direcciones } = req.body;
        const t = await db.transaction();
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }

        await cliente.update({ ...req.body }, { transaction: t });

        // Crear los telefonos asociados
        if (telefonos && Array.isArray(telefonos)) {
            const telefonosData = telefonos.map((tel) => ({
                telefono: tel.telefono,
                clienteId: id
            }));
            await ClienteTelefono.destroy({ where: { clienteId: id } }, { transaction: t });
            await ClienteTelefono.bulkCreate(telefonosData, { transaction: t });
        }

        // Crear las direcciones asociadas
        if (direcciones && Array.isArray(direcciones)) {
            const direccionesData = direcciones.map((dir) => ({
                direccion: dir.direccion,
                clienteId: id
            }));
            await ClienteDireccion.destroy({ where: { clienteId: id } }, { transaction: t });
            await ClienteDireccion.bulkCreate(direccionesData, { transaction: t });
        }
        await t.commit();
        res.json({ message: 'Cliente actualizado correctamente' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente
exports.deleteCliente = async (req, res) => {
    const t = await db.transaction();
    try {
        const { id } = req.params;
        const cliente = await Cliente.findByPk(id);

        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        const usuarioId = cliente.usuarioId;

        await ClienteTelefono.destroy({ where: { clienteId: id }, transaction: t });
        await ClienteDireccion.destroy({ where: { clienteId: id }, transaction: t });
        await cliente.destroy({ transaction: t });
        await Usuario.destroy({ where: { id: usuarioId }, transaction: t });
        await t.commit();
        res.json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};

exports.busqueda = async (req, res) => {
    const { id, identidad, rtn, primernombre, segundonombre, primerapellido, segundoapellido, correo } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    };
    contenido.msj = errores(validationResult(req));

    if (contenido.msj.length > 0) {
        enviar(400, contenido, res);
    } else {
        try {
            // Construimos el filtro 'where' en base a los parámetros disponibles
            let where = {};
            if (id) where.id = id;
            if (identidad) where.identidad = identidad;
            if (rtn) where.rtn = rtn;
            if (primernombre) where.primernombre = primernombre;
            if (segundonombre) where.segundonombre = segundonombre;
            if (primerapellido) where.primerapellido = primerapellido;
            if (segundoapellido) where.segundoapellido = segundoapellido;
            if (correo) where.correo = correo;

            const resultados = await Cliente.findAll({ where });

            if (resultados.length > 0) {
                contenido.tipo = 1;
                contenido.datos = resultados;
                contenido.msj = "Búsqueda de clientes realizada con éxito";
            } else {
                contenido.tipo = 0;
                contenido.msj = "No se encontraron resultados para la búsqueda de clientes";
            }

            enviar(200, contenido, res);
        } catch (error) {
            console.error(error);
            contenido.tipo = 0;
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
    }
};

