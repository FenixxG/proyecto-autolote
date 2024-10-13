const { Router } = require('express');
const rutas = Router();
rutas.get('/', (req, res)=>{
    res.send("Hola Mundo");
});
rutas.get('/otra', (req, res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.json(info);
});
rutas.get('/otra2', (req, res)=>{
    var info = {
        nombre: "Cristian",
        apellido: "Miranda",
        clase: {
            codigo: "IF3algo",
            nombre: "Seminario Taller de Software"
        }
    }
    res.statusCode = 200; // MANDANDO CODIGO DE ESTADO (TODO SE EJECUTO CORRECTAMENTE)
    res.setHeader("Contenido-Type", "application/json");
    res.json({clase: info.clase.codigo + ' ' + info.clase.nombre});
});
module.exports = rutas;