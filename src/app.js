const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

// Carga las variables de entorno
require('dotenv').config();

// Rutas
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./documentacion/swagger');

// Tablas
const db = require('./configuracion/db');
const { CrearModelos } = require('./modelos');




db.authenticate()
.then(() => {
    console.log(
        "========== Conexion establecida con el servidor de BD =========="
    );
    CrearModelos();

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
})
.catch((error) => console.log("ERROR: " + error));

// Funciones
const limitador = rateLimit({
    windowMs: 1000 * 60 * 10, // 10 minutos
    max: 100, // Maximo de peticiones
});

const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(helmet());
app.use(limitador);
app.use(cors(require('./configuracion/cors')));
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


// Documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

module.exports = app;