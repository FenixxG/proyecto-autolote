const ModeloCompra = require('../../modelos/compras/compra');
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
        await ModeloCompra.findAll()
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
            await ModeloCompra.create({...req.body}) // CON ... SE PASAN TODOS LOS DATOS DEL REQ.BODY
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
            await ModeloCompra.update(
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
            await ModeloCompra.destroy({where: {id: id}})
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
    const { id, precio } = req.query;
    const contenido = { tipo: 0, datos: [], msj: [] };

    // Verificar errores de validación
    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        enviar(400, contenido, res);
        return;
    }

    // Validar que al menos uno de los campos de búsqueda esté especificado
    if (!id && !precio) {
        contenido.msj = "Debe especificar al menos un campo de búsqueda";
        enviar(400, contenido, res);
        return;
    }

    try {
        // Construir el filtro 'where' basado en los parámetros
        const where = {};
        if (id) where.id = id;
        if (precio) where.precio = precio;

        // Buscar registros en la base de datos
        const resultados = await ModeloCompra.findAll({ where });
        if (resultados.length > 0) {
            contenido.tipo = 1;
            contenido.datos = resultados;
            contenido.msj = "Búsqueda de compras realizada con éxito";
        } else {
            contenido.msj = "No se encontraron resultados";
        }
        enviar(200, contenido, res);
    } catch (error) {
        console.error(error);
        contenido.msj = "ERROR EN EL SERVIDOR";
        enviar(500, contenido, res);
    }
};
