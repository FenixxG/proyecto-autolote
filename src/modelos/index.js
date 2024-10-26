const modeloCargo = require('./cargo');
const modeloCarro = require('./carro');
const modeloCliente = require('./cliente');
const modeloCompra = require('./compra');
const modeloCotizacion = require('./cotizacion');
const modeloEmpleado = require('./empleado');
const modeloGarantia = require('./garantia');
const modeloInventario = require('./inventario');
const modeloMotocicleta = require('./motocicleta');
const modeloProveedor = require('./proveedor');
const modeloRecibo = require('./recibo');
const modeloServicio = require('./servicio');
const modeloVenta = require('./venta');

exports.CrearModelos = async () => {
    // CREANDO MODELO CARGO
    await modeloCargo.sync().then(() => {
        console.log("Modelo Cargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cargo " + e);
    })

    // CREANDO MODELO CARRO
    await modeloCarro.sync().then(() => {
        console.log("Modelo Carro Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo carro " + e);
    })

    // CREANDO MODELO CLIENTE
    await modeloCliente.sync().then(() => {
        console.log("Modelo Cliente Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cliente " + e);
    })

    // CREANDO MODELO EMPLEADO
    await modeloEmpleado.sync().then(() => {
        console.log("Modelo Empleado Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo empleado " + e);
    })

    // CREANDO MODELO MOTOCICLETA
    await modeloMotocicleta.sync().then(() => {
        console.log("Modelo Motocicleta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo motocicleta " + e);
    })

    // CREANDO MODELO COTIZACION
    await modeloCotizacion.sync().then(() => {
        console.log("Modelo Cotizacion Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cotizacion " + e);
    })

    // CREANDO MODELO PROVEEDOR
    await modeloProveedor.sync().then(() => {
        console.log("Modelo Proveedor Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo proveedor " + e);
    })

    // CREANDO MODELO INVENTARIO
    await modeloInventario.sync().then(() => {
        console.log("Modelo Inventario Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo inventario " + e);
    })

    // CREANDO MODELO VENTA
    await modeloVenta.sync().then(() => {
        console.log("Modelo Venta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo venta " + e);
    })

    // CREANDO MODELO SERVICIO
    await modeloServicio.sync().then(() => {
        console.log("Modelo Servicio Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo servicio " + e);
    })

    // CREANDO MODELO RECIBO
    await modeloRecibo.sync().then(() => {
        console.log("Modelo Recibo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo recibo " + e);
    })

    // CREANDO MODELO COMPRA
    await modeloCompra.sync().then(() => {
        console.log("Modelo Compra Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo compra " + e);
    })

    // CREANDO MODELO GARANTIA
    await modeloGarantia.sync().then(() => {
        console.log("Modelo Garantia Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo garantia " + e);
    })
}
