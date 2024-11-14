const modeloUsuario = require('./usuarios/usuario');
const modeloCarro = require('./carros/carro');
const modeloCliente = require('./clientes/cliente');
const modeloClienteTelefono = require('./clientes/clientetelefono');
const modeloClienteDireccion = require('./clientes/clientedireccion');
const modeloCompra = require('./compras/compra');
const modeloCotizacion = require('./cotizaciones/cotizacion');
const modeloEmpleado = require('./empleados/empleado');
const modeloEmpleadoCargo = require('./empleados/empleadocargo');
const modeloEmpleadoTelefono = require('./empleados/empleadotelefono');
const modeloEmpleadoDireccion = require('./empleados/empleadodireccion');
const modeloGarantia = require('./garantias/garantia');
const modeloInventario = require('./inventario/inventario');
const modeloMotocicleta = require('./motocicletas/motocicleta');
const modeloProveedor = require('./proveedores/proveedor');
const modeloRecibo = require('./recibos/recibo');
const modeloServicio = require('./servicios/servicio');
const modeloVenta = require('./ventas/venta');

exports.CrearModelos = async () => {
    // === RELACIONES ===
    // Relación: Ventas
    modeloCarro.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloCarro);
    modeloMotocicleta.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloMotocicleta);
    modeloCliente.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloCliente);

    // Relación: Empleados y Ventas
    modeloEmpleado.hasMany(modeloVenta);
    modeloVenta.belongsTo(modeloEmpleado);

    // Relación: Compras
    modeloCarro.hasMany(modeloCompra);
    modeloCompra.belongsTo(modeloCarro);
    modeloMotocicleta.hasMany(modeloCompra);
    modeloCompra.belongsTo(modeloMotocicleta);
    modeloProveedor.hasMany(modeloCompra);
    modeloCompra.belongsTo(modeloProveedor);

    // Relación: Recibos
    modeloVenta.hasMany(modeloRecibo);
    modeloRecibo.belongsTo(modeloVenta);
    modeloCliente.hasMany(modeloRecibo);
    modeloRecibo.belongsTo(modeloCliente);

    // Relación: Cotizaciones
    modeloCarro.hasMany(modeloCotizacion);
    modeloCotizacion.belongsTo(modeloCarro);
    modeloMotocicleta.hasMany(modeloCotizacion);
    modeloCotizacion.belongsTo(modeloMotocicleta);
    modeloCliente.hasMany(modeloCotizacion);
    modeloCotizacion.belongsTo(modeloCliente);

    // Relación: Inventario
    modeloCarro.hasMany(modeloInventario);
    modeloInventario.belongsTo(modeloCarro);
    modeloMotocicleta.hasMany(modeloInventario);
    modeloInventario.belongsTo(modeloMotocicleta);
    modeloProveedor.hasMany(modeloInventario);
    modeloInventario.belongsTo(modeloProveedor);

    // Relación: Ventas y Garantías
    modeloVenta.hasOne(modeloGarantia);
    modeloGarantia.belongsTo(modeloVenta);

    // Relación: Ventas y Servicios
    modeloVenta.hasMany(modeloServicio);
    modeloServicio.belongsTo(modeloVenta);

    // Relación: Cargo y Empleados
    modeloEmpleadoCargo.hasMany(modeloEmpleado,);
    modeloEmpleado.belongsTo(modeloEmpleadoCargo);

    // Relacion: Clientes y Direcciones
    modeloCliente.hasMany(modeloClienteDireccion);
    modeloClienteDireccion.belongsTo(modeloCliente);

    // Relacion: Clientes y Telefonos
    modeloCliente.hasMany(modeloClienteTelefono);
    modeloClienteTelefono.belongsTo(modeloCliente);

    // Relacion: Empleados y Direcciones
    modeloEmpleado.hasMany(modeloEmpleadoDireccion);
    modeloEmpleadoDireccion.belongsTo(modeloEmpleado);

    // Relacion: Empleados y Telefonos
    modeloEmpleado.hasMany(modeloEmpleadoTelefono);
    modeloEmpleadoTelefono.belongsTo(modeloEmpleado);

    // Relacion: Cliente y Usuarios
    modeloUsuario.hasMany(modeloCliente);
    modeloCliente.belongsTo(modeloUsuario);

    // Relacion: Empleado y Usuarios
    modeloUsuario.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloUsuario);

    // === CREACION DE MODELOS ===

    // CREANDO MODELO USUARIO
    await modeloUsuario.sync().then(() => {
        console.log("Modelo Usuario Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Usuario " + e);
    })

    // CREANDO MODELO CLIENTE
    await modeloCliente.sync().then(() => {
        console.log("Modelo Cliente Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Cliente " + e);
    })

    // CREANDO MODELO CLIENTE DIRECCION
    await modeloClienteDireccion.sync().then(() => {
        console.log("Modelo ClienteDireccion Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo ClienteDireccion " + e);
    })

    // CREANDO MODELO CLIENTE TELEFONO
    await modeloClienteTelefono.sync().then(() => {
        console.log("Modelo ClienteTelefono Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo ClienteTelefono " + e);
    })

    // CREANDO MODELO EMPLEADO CARGO
    await modeloEmpleadoCargo.sync().then(() => {
        console.log("Modelo EmpleadoCargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo EmpleadoCargo " + e);
    })

    // CREANDO MODELO EMPLEADO
    await modeloEmpleado.sync().then(() => {
        console.log("Modelo Empleado Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Empleado " + e);
    })

    // CREANDO MODELO EMPLEADO DIRECCION
    await modeloEmpleadoDireccion.sync().then(() => {
        console.log("Modelo EmpleadoDireccion Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo EmpleadoDireccion " + e);
    })

    // CREANDO MODELO EMPLEADO TELEFONO
    await modeloEmpleadoTelefono.sync().then(() => {
        console.log("Modelo EmpleadoTelefono Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo EmpleadoTelefono " + e);
    })

    // CREANDO MODELO CARRO
    await modeloCarro.sync().then(() => {
        console.log("Modelo Carro Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Carro " + e);
    })

    // CREANDO MODELO MOTOCICLETA
    await modeloMotocicleta.sync().then(() => {
        console.log("Modelo Motocicleta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Motocicleta " + e);
    })

    // CREANDO MODELO COTIZACION
    await modeloCotizacion.sync().then(() => {
        console.log("Modelo Cotizacion Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Cotizacion " + e);
    })

    // CREANDO MODELO PROVEEDOR
    await modeloProveedor.sync().then(() => {
        console.log("Modelo Proveedor Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Proveedor " + e);
    })

    // CREANDO MODELO INVENTARIO
    await modeloInventario.sync().then(() => {
        console.log("Modelo Inventario Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Inventario " + e);
    })

    // CREANDO MODELO VENTA
    await modeloVenta.sync().then(() => {
        console.log("Modelo Venta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Venta " + e);
    })

    // CREANDO MODELO SERVICIO
    await modeloServicio.sync().then(() => {
        console.log("Modelo Servicio Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Servicio " + e);
    })

    // CREANDO MODELO RECIBO
    await modeloRecibo.sync().then(() => {
        console.log("Modelo Recibo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Recibo " + e);
    })

    // CREANDO MODELO COMPRA
    await modeloCompra.sync().then(() => {
        console.log("Modelo Compra Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Compra " + e);
    })

    // CREANDO MODELO GARANTIA
    await modeloGarantia.sync().then(() => {
        console.log("Modelo Garantia Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo Garantia " + e);
    })
}