const modeloCargo = require('./cargos/cargo');
const modeloCarro = require('./carros/carro');
const modeloCliente = require('./clientes/cliente');
const modeloCompra = require('./compras/compra');
const modeloCotizacion = require('./cotizaciones/cotizacion');
const modeloEmpleado = require('./empleados/empleado');
const modeloGarantia = require('./garantias/garantia');
const modeloInventario = require('./inventarios/inventario');
const modeloMotocicleta = require('./motocicletas/motocicleta');
const modeloProveedor = require('./proveedores/proveedor');
const modeloRecibo = require('./recibos/recibo');
const modeloServicio = require('./servicios/servicio');
const modeloVenta = require('./ventas/venta');

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
