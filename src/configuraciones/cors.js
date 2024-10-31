const cors = {
    origin: '*', // Permite solo solicitudes desde este dominio
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permite solo estos metodos HTTP
    allowedHeaders: ['Content-Type', 'Authorization'], // Permite solo estos encabezados
    credentials: true // Permite enviar credenciales (cookies, tokens de autorizacion)
};
module.exports = cors;