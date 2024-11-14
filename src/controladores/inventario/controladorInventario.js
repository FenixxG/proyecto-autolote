const ModeloInventario = require('../../modelos/inventario/inventario');
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
        await ModeloInventario.findAll()
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
            await ModeloInventario.create({...req.body}) // CON ... SE PASAN TODOS LOS DATOS DEL REQ.BODY
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
            await ModeloInventario.update(
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
            await ModeloInventario.destroy({where: {id: id}})
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
    const { id, cantidad } = req.query;
    const contenido = { tipo: 0, datos: [], msj: [] };

    // Validar errores
    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        enviar(400, contenido, res);
<<<<<<< HEAD
        return;
    }

    // Validar que al menos uno de los campos de búsqueda esté especificado
    if (!id && !cantidad) {
        contenido.msj = "Debe especificar al menos un campo de búsqueda";
        enviar(400, contenido, res);
        return;
    }

    try {
        const where = {};
        if (id) where.id = id;
        if (cantidad) where.cantidad = cantidad;

        const resultados = await ModeloInventario.findAll({ where });
        if (resultados.length > 0) {
            contenido.tipo = 1;
            contenido.datos = resultados;
            contenido.msj = "Búsqueda de inventario realizada con éxito";
        } else {
            contenido.msj = "No se encontraron resultados";
        }
        enviar(200, contenido, res);
    } catch (error) {
        console.error(error);
        contenido.msj = "ERROR EN EL SERVIDOR";
        enviar(500, contenido, res);
=======
    } else {
        try {
            const where = {};
            if (id) where.id = id;
            if (cantidad) where.cantidad = cantidad;

            const resultados = await ModeloInventario.findAll({ where });
            if (resultados.length > 0) {
                contenido.tipo = 1;
                contenido.datos = resultados;
                contenido.msj = "Búsqueda de inventario realizada con éxito";
            } else {
                contenido.msj = "No se encontraron resultados";
            }
            enviar(200, contenido, res);
        } catch (error) {
            console.error(error);
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
>>>>>>> 844e46afbdd5c91caf58389200c7242ecb084108
    }
};

