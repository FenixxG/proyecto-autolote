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
const rutasUsuarios = require('./rutas/usuarios/rutaUsuario');
const rutasCarros = require('./rutas/carros/rutaCarro');
const rutasClientes = require('./rutas/clientes/rutaCliente');
const rutasCompras = require('./rutas/compras/rutaCompra');
const rutasCotizaciones = require('./rutas/cotizaciones/rutaCotizacion');
const rutasEmpleados = require('./rutas/empleados/rutaEmpleado');
const rutasCargos = require('./rutas/empleados/rutaEmpleadoCargo');
const rutasGarantias = require('./rutas/garantias/rutaGarantia');
const rutasInventario = require('./rutas/inventario/rutaInventario');
const rutasMotocicletas = require('./rutas/motocicletas/rutaMoticicleta');
const rutasProveedores = require('./rutas/proveedores/rutaProveedor');
const rutasRecibos = require('./rutas/recibos/rutaRecibo');
const rutasServicios = require('./rutas/servicios/rutaServicio');
const rutasVentas = require('./rutas/ventas/rutaVenta');

// Tablas
const db = require('./configuraciones/db');
const { CrearModelos } = require('./modelos');


db.authenticate()
.then(() => {
    console.log(
        "========== Conexion establecida con el servidor de BD =========="
    );
    CrearModelos();
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
app.use(cors(require('./configuraciones/cors')));
app.use(express.json());

// Llamado de rutas
app.use('/api/usuarios', rutasUsuarios);
app.use('/api/carros', rutasCarros);
app.use('/api/clientes', rutasClientes);
app.use('/api/compras', rutasCompras);
app.use('/api/cotizaciones', rutasCotizaciones);
app.use('/api/empleados', rutasEmpleados);
app.use('/api/cargos', rutasCargos);
app.use('/api/garantias', rutasGarantias);
app.use('/api/inventario', rutasInventario);
app.use('/api/motocicletas', rutasMotocicletas);
app.use('/api/proveedores', rutasProveedores);
app.use('/api/recibos', rutasRecibos);
app.use('/api/servicios', rutasServicios);
app.use('/api/ventas', rutasVentas);

// Documentacion
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Documentacion de Swagger: http://localhost:${port}/api-docs`);
});

module.exports = app;