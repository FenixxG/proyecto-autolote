const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API-AUTOLOTE',
            version: '1.0.0',
            description: 'API del sistema del Autolote'
        },
        servers: [
            {
                url: 'http://localhost:3001/api', // URL del servidor
                description: 'Servidor local',
            },
        ],
    },
    apis: [`${path.join(__dirname, "../rutas/**/*.js")}`], // Ruta a los archivos donde estan definidas las rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;