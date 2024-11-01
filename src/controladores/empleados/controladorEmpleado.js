const { validationResult } = require('express-validator');
const argon2 = require('argon2');
const Empleado = require('../../modelos/empleados/empleado');
const EmpleadoCargo = require('../../modelos/empleados/empleadocargo');
const EmpleadoTelefono = require('../../modelos/empleados/empleadotelefono');
const EmpleadoDireccion = require('../../modelos/empleados/empleadodireccion');
const Usuario = require('../../modelos/usuarios/usuario');
const db = require('../../configuraciones/db');

// Obtener todos los empleados
exports.getEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.findAll({
            include: [
                {
                    model: EmpleadoTelefono,
                    attributes: ['telefono']
                },
                {
                    model: EmpleadoDireccion,
                    attributes: ['direccion']
                },
                {
                    model: EmpleadoCargo,
                    attributes: ['cargoId']
                }
            ]
        });
        res.json(empleados);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los empleados' });
    }
};

// Crear un nuevo empleado
exports.createEmpleado = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const t = await db.transaction();

    try {
        const { nombre, correo, tipoUsuario, contrasena, telefonos, direcciones, cargoId } = req.body;

        const hash = await argon2.hash(contrasena, {
            type: argon2.argon2id,
            memoryCost: 2 ** 16, // 64MB
            timeCost: 4,
            parallelism: 2
        });

        // Crear el usuario del Empleado
        const usuario = await Usuario.create(
            { nombre, correo, tipoUsuario, contrasena: hash },
            { transaction: t }
        );

        // Crear el Empleado
        const empleado = await Empleado.create({ ...req.body, usuarioId: usuario.id, cargoId: cargoId }, { transaction: t });

        // Crear los telefonos asociados al Empleado
        if (telefonos && Array.isArray(telefonos)) {
            const telefonosData = telefonos.map((tel) => ({
                telefono: tel.telefono,
                empleadoId: empleado.id,
            }));
            await EmpleadoTelefono.bulkCreate(telefonosData, { transaction: t });
        }

        // Crear las direcciones asociadas al Empleado
        if (direcciones && Array.isArray(direcciones)) {
            const direccionesData = direcciones.map((dir) => ({
                direccion: dir.direccion,
                empleadoId: empleado.id,
            }));
            await EmpleadoDireccion.bulkCreate(direccionesData, { transaction: t });
        }
        await t.commit();
        res.status(201).json(empleado);
    } catch (error) {
        console.error(error);
        await t.rollback();
        res.status(500).json({ error: 'Error al crear el empleado' });
    }
};

// Actualizar un empleado
exports.updateEmpleado = async (req, res) => {
    // Validar entrada de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }

    try {
        const { id } = req.params;
        const { nombre, correo, rtn, telefonos, direcciones } = req.body;
        const t = await db.transaction();
        const empleado = await Empleado.findByPk(id);

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }

        await empleado.update({ ...req.body }, { transaction: t });

        // Crear los telefonos asociados
        if (telefonos && Array.isArray(telefonos)) {
            const telefonosData = telefonos.map((tel) => ({
                telefono: tel.telefono,
                empleadoId: id
            }));
            await EmpleadoTelefono.destroy({ where: { empleadoId: id } }, { transaction: t });
            await EmpleadoTelefono.bulkCreate(telefonosData, { transaction: t });
        }

        // Crear las direcciones asociadas
        if (direcciones && Array.isArray(direcciones)) {
            const direccionesData = direcciones.map((dir) => ({
                direccion: dir.direccion,
                empleadoId: id
            }));
            await EmpleadoDireccion.destroy({ where: { empleadoId: id } }, { transaction: t });
            await EmpleadoDireccion.bulkCreate(direccionesData, { transaction: t });
        }
        await t.commit();
        res.json({ message: 'Empleado actualizado correctamente' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Error al actualizar el empleado' });
    }
};

// Eliminar un empleado
exports.deleteEmpleado = async (req, res) => {
    const t = await db.transaction();
    try {
        const { id } = req.params;
        const empleado = await Empleado.findByPk(id);

        if (!empleado) {
            return res.status(404).json({ error: 'Empleado no encontrado' });
        }
        const usuarioId = empleado.usuarioId;

        await EmpleadoTelefono.destroy({ where: { empleadoId: id }, transaction: t });
        await EmpleadoDireccion.destroy({ where: { empleadoId: id }, transaction: t });
        await empleado.destroy({ transaction: t });
        await Usuario.destroy({ where: { id: usuarioId }, transaction: t });
        await t.commit();
        res.json({ message: 'Empleado eliminado correctamente' });
    } catch (error) {
        await t.rollback();
        res.status(500).json({ error: 'Error al eliminar el empleado' });
    }
};