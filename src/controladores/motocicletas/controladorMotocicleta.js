const ModeloMotocicleta = require('../../modelos/motocicletas/motocicleta');
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
        await ModeloMotocicleta.findAll()
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
            await ModeloMotocicleta.create({...req.body}) // CON ... SE PASAN TODOS LOS DATOS DEL REQ.BODY
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
            await ModeloMotocicleta.update(
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
            await ModeloMotocicleta.destroy({where: {id: id}})
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
    const { id, marca, modelo, anio, color, precio, estado, disponible } = req.query;
    const contenido = { tipo: 0, datos: [], msj: [] };

    // Validar errores
    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        return enviar(400, contenido, res);
    }

    // Validar que al menos uno de los campos esté presente
    if (!id && !marca && !modelo && !anio && !color && !precio && !estado && disponible === undefined) {
        contenido.msj = "Debe especificar al menos un campo de búsqueda";
        return enviar(400, contenido, res);
    }

    try {
        // Construir el filtro 'where' en base a los parámetros disponibles
        const where = {};
        if (id) where.id = id;
        if (marca) where.marca = marca;
        if (modelo) where.modelo = modelo;
        if (anio) where.anio = anio;
        if (color) where.color = color;
        if (precio) where.precio = precio;
        if (estado) where.estado = estado;
        if (disponible !== undefined) where.disponible = disponible;

        // Realizar la consulta
        const resultados = await ModeloMotocicleta.findAll({ where });

        // Devolver los resultados de la búsqueda
        if (resultados.length > 0) {
            contenido.tipo = 1;
            contenido.datos = resultados;
            contenido.msj = "Búsqueda de motocicletas realizada con éxito";
        } else {
            contenido.msj = "No se encontraron resultados";
        }
        return enviar(200, contenido, res);

    } catch (error) {
        console.error(error);
        contenido.msj = "ERROR EN EL SERVIDOR";
        return enviar(500, contenido, res);
    }
};
