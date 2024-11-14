const ModeloVenta = require('../../modelos/ventas/venta');
const { enviar, errores} = require('../../configuraciones/ayuda');
const { validationResult } = require('express-validator');

exports.inicio = (req, res) => {
    console.log(req);
    res.json({msj: "Hola"});
};

exports.listar = async(req, res) => {
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    try {
        await ModeloVenta.findAll()
        .then(((data)=>{
            contenido.tipo = 1;
            contenido.datos = data;
            enviar(200, contenido, res);
        }))
        .catch((er) => {
            contenido.tipo = 0;
            contenido.msj = "ERROR AL CARGAR LOS DATOS DEL CARGO";
            enviar(200, contenido, res);
        })
    } catch (error) {
        // ERROR ANTES DE EJECUTAR EL MODELO
        contenido.tipo = 0;
        contenido.msj = "ERROR EN EL SERVIDOR";
        enviar(500, contenido, res);
    }
};

// FUNCION PARA ALMACENAR DATOS
exports.guardar = async(req, res) => {
    //const { nombre } = req.body;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length > 0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloVenta.create({...req.body}) // CON ... SE PASAN TODOS LOS DATOS DEL REQ.BODY
            .then((data)=>{
                contenido.tipo = 1;
                contenido.datos = data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo = 0;
                contenido.msj = "ERROR EN LA CONSULTA";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo = 0;
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
    }
};

// FUNCION PARA EDITAR DATOS
exports.editar = async(req, res) => {
    const { id } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length > 0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloVenta.update(
                ({...req.body}),
                {where: {id: id}})
            .then((data)=>{
                contenido.tipo = 1;
                contenido.datos = data;
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo = 0;
                contenido.msj = "ERROR EN LA CONSULTA";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo = 0;
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
    }
};

// FUNCION PARA ELIMINAR DATOS
exports.eliminar = async(req, res) => {
    const { id } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    }
    contenido.msj = errores(validationResult(req));
    if(contenido.msj.length > 0){
        enviar(200, contenido, res);
    }
    else{
        try {
            await ModeloVenta.destroy({where: {id: id}})
            .then((data)=>{
                contenido.tipo = 1;
                contenido.datos = data;
                contenido.msj = "Eliminado correctamente";
                enviar(200, contenido, res);
            })
            .catch((er)=>{
                console.log(er);
                contenido.tipo = 0;
                contenido.msj = "ERROR EN LA CONSULTA";
                enviar(200, contenido, res);
            })
        } catch (error) {
            console.log(error);
            contenido.tipo = 0;
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
    }
};

exports.busqueda = async (req, res) => {
    const { id, precio, formaPago } = req.query;
    let contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    };

    // Validar errores de parámetros
    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        return enviar(400, contenido, res); // Cambié el código de estado a 400 para errores de validación
    }

    // Validar que al menos uno de los parámetros esté presente
    if (!id && !precio && !formaPago) {
        contenido.msj = "Debe especificar al menos uno de los campos: id, precio, formaPago.";
        return enviar(400, contenido, res); // Cambié el código de estado a 400 para indicar un error en los parámetros
    }

    try {
        // Construir el filtro 'where' en base a los parámetros disponibles
        let where = {};
        if (id) where.id = id;
        if (precio) where.precio = precio;
        if (formaPago) where.formaPago = formaPago;

        // Buscar registros en la base de datos
        const resultados = await ModeloVenta.findAll({ where });

        // Verificar si se encontraron resultados
        if (resultados.length > 0) {
            contenido.tipo = 1;
            contenido.datos = resultados;
            contenido.msj = "Búsqueda de ventas realizada con éxito";
        } else {
            contenido.msj = "No se encontraron resultados para la búsqueda de ventas";
        }

        // Enviar la respuesta
        return enviar(200, contenido, res);

    } catch (error) {
        console.error(error);
        contenido.tipo = 0;
        contenido.msj = "ERROR EN EL SERVIDOR";
        return enviar(500, contenido, res); // Aseguramos el código 500 en caso de error interno
    }
};
