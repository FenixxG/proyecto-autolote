const ModeloRecibo = require('../../modelos/recibos/recibo');
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
        await ModeloRecibo.findAll()
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
            await ModeloRecibo.create({...req.body}) // CON ... SE PASAN TODOS LOS DATOS DEL REQ.BODY
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
            await ModeloRecibo.update(
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
            await ModeloRecibo.destroy({where: {id: id}})
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
    const { id, monto, formaPago } = req.query;
    var contenido = {
        tipo: 0,
        datos: [],
        msj: [],
    };
<<<<<<< HEAD

    // Validar errores de los parámetros
    contenido.msj = errores(validationResult(req));
    if (contenido.msj.length > 0) {
        return enviar(200, contenido, res);
    }

    // Validar que al menos uno de los campos esté presente
    if (!id && !monto && !formaPago) {
        contenido.msj = "Debe especificar al menos un campo de búsqueda (id, monto, formaPago).";
        return enviar(400, contenido, res);
    }

    try {
        // Construir el filtro 'where' en base a los parámetros disponibles
        let where = {};
        if (id) where.id = id;
        if (monto) where.monto = monto;
        if (formaPago) where.formaPago = formaPago;

        // Buscar los resultados en la base de datos
        const resultados = await ModeloRecibo.findAll({ where });

        // Verificar si se encontraron resultados
        if (resultados.length > 0) {
            contenido.tipo = 1;
            contenido.datos = resultados;
            contenido.msj = "Búsqueda de recibos realizada con éxito";
        } else {
            contenido.tipo = 0;
            contenido.msj = "No se encontraron resultados para la búsqueda de recibos";
        }

        // Enviar la respuesta con los resultados
        return enviar(200, contenido, res);

    } catch (error) {
        console.error(error);
        contenido.tipo = 0;
        contenido.msj = "ERROR EN EL SERVIDOR";
        return enviar(500, contenido, res);
    }
};

=======
    contenido.msj = errores(validationResult(req));

    if (contenido.msj.length > 0) {
        enviar(200, contenido, res);
    } else {
        try {
            // Construimos el filtro 'where' en base a los parámetros disponibles
            let where = {};
            if (id) where.id = id;
            if (monto) where.monto = monto;
            if (formaPago) where.formaPago = formaPago;

            const resultados = await ModeloRecibo.findAll({ where });

            if (resultados.length > 0) {
                contenido.tipo = 1;
                contenido.datos = resultados;
                contenido.msj = "Búsqueda de recibos realizada con éxito";
            } else {
                contenido.tipo = 0;
                contenido.msj = "No se encontraron resultados para la búsqueda de recibos";
            }

            enviar(200, contenido, res);
        } catch (error) {
            console.error(error);
            contenido.tipo = 0;
            contenido.msj = "ERROR EN EL SERVIDOR";
            enviar(500, contenido, res);
        }
    }
};
>>>>>>> 844e46afbdd5c91caf58389200c7242ecb084108
