const nodemailer = require('nodemailer');
const { USUARIO_CORREO, CONTRASENA_CORREO, SERVICIO_CORREO } = process.env;

exports.enviarCorreo = async (datos) => {
    // Configuracion del remitente
    const transporter = nodemailer.createTransport({
        host: SERVICIO_CORREO, // Puede usar otros servicios como 'hotmail', 'yahoo', etc.
        port: 465,
        secure: true,
        auth: {
            user: USUARIO_CORREO, // Tu direccion de correo electronico
            pass: CONTRASENA_CORREO // Tu contraseña
        }
    });

    // Datos del correo electrónico
    const mailOptions = {
        from: USUARIO_CORREO,
        to: datos.para,
        subject: datos.asunto,
        text: datos.descripcion,
        html: datos.html
    };

    // Enviar el correo electrónico
    return transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Correo enviado: ' + info.response);
    });
}