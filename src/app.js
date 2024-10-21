const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const db = require('./configuracion/db');
const modeloCargo = require('./modelos/cargo');
const modeloCarro = require('./modelos/carro');
const modeloCliente = require('./modelos/cliente');
const modeloCompra = require('./modelos/compra');
const modeloCotizacion = require('./modelos/cotizacion');
const modeloEmpleado = require('./modelos/empleado');
const modeloGarantia = require('./modelos/garantia');
const modeloInventario = require('./modelos/inventario');
const modeloMotocicleta = require('./modelos/motocicleta');
const modeloProveedor = require('./modelos/proveedor');
const modeloRecibo = require('./modelos/recibo');
const modeloServicio = require('./modelos/servicio');
const modeloVenta = require('./modelos/venta');

db.authenticate()
.then( async (data) => {
    console.log("Conexion establecida");

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
    modeloCargo.hasMany(modeloEmpleado);
    modeloEmpleado.belongsTo(modeloCargo);


    // CREANDO MODELO CARGO
    await modeloCargo.sync().then((da) => {
        console.log("Modelo Cargo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cargo " + e);
    })

    // CREANDO MODELO CARRO
    await modeloCarro.sync().then((da) => {
        console.log("Modelo Carro Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo carro " + e);
    })

    // CREANDO MODELO CLIENTE
    await modeloCliente.sync().then((da) => {
        console.log("Modelo Cliente Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cliente " + e);
    })

    // CREANDO MODELO EMPLEADO
    await modeloEmpleado.sync().then((da) => {
        console.log("Modelo Empleado Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo empleado " + e);
    })

    // CREANDO MODELO MOTOCICLETA
    await modeloMotocicleta.sync().then((da) => {
        console.log("Modelo Motocicleta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo motocicleta " + e);
    })

    // CREANDO MODELO COTIZACION
    await modeloCotizacion.sync().then((da) => {
        console.log("Modelo Cotizacion Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo cotizacion " + e);
    })

    // CREANDO MODELO PROVEEDOR
    await modeloProveedor.sync().then((da) => {
        console.log("Modelo Proveedor Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo proveedor " + e);
    })

    // CREANDO MODELO INVENTARIO
    await modeloInventario.sync().then((da) => {
        console.log("Modelo Inventario Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo inventario " + e);
    })

    // CREANDO MODELO VENTA
    await modeloVenta.sync().then((da) => {
        console.log("Modelo Venta Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo venta " + e);
    })

    // CREANDO MODELO SERVICIO
    await modeloServicio.sync().then((da) => {
        console.log("Modelo Servicio Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo servicio " + e);
    })

    // CREANDO MODELO RECIBO
    await modeloRecibo.sync().then((da) => {
        console.log("Modelo Recibo Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo recibo " + e);
    })

    // CREANDO MODELO COMPRA
    await modeloCompra.sync().then((da) => {
        console.log("Modelo Compra Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo compra " + e);
    })

    // CREANDO MODELO GARANTIA
    await modeloGarantia.sync().then((da) => {
        console.log("Modelo Garantia Creado Correctamente")
    })
    .catch((e) => {
        console.log("Error al crear el modelo garantia " + e);
    })

})
.catch((er) => {
    console.log("ERROR: " + er);
});

const app = express();
app.set('port', 3001);
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use('/api', require('./rutas')); //usando archivo aparte que se encarga solo de las rutas
app.use('/api/cargos', require('./rutas/rutaCargo'));
app.use('/api/carros', require('./rutas/rutaCarro'));
app.use('/api/clientes', require('./rutas/rutaCliente'));
app.use('/api/compras', require('./rutas/rutaCompra'));
app.use('/api/cotizaciones', require('./rutas/rutaCotizacion'));
app.use('/api/empleados', require('./rutas/rutaEmpleado'));
app.use('/api/garantias', require('./rutas/rutaGarantia'));
app.use('/api/inventario', require('./rutas/rutaInventario'));
app.use('/api/motocicletas', require('./rutas/rutaMoticicleta'));
app.use('/api/proveedores', require('./rutas/rutaProveedor'));
app.use('/api/recibos', require('./rutas/rutaRecibo'));
app.use('/api/servicios', require('./rutas/rutaServicio'));
app.use('/api/ventas', require('./rutas/rutaVenta'));


app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto ' + app.get('port'));
});