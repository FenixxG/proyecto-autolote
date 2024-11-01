const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const Cliente = require('../../modelos/clientes/cliente');
const ClienteTelefono = require('../../modelos/clientes/clientetelefono');
const ClienteDireccion = require('../../modelos/clientes/clientedireccion');
const Usuario = require('../../modelos/usuarios/usuario');
const db = require('../../configuraciones/db');

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.findAll({
            include: [
                {
                    model: ClienteTelefono,
                    attributes: ['telefono']
                },
                {
                    model: ClienteDireccion,
                    attributes: ['direccion']
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
        const { id } = req.params;
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