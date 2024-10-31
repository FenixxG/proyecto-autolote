//
exports.enviar = (codigo, contenido, res) => {
    res.statusCode = codigo;
    res.setHeader("Contenido-Type", "application/json");
    res.json(contenido);
}

// FUNCION PARA EL ENVIO DE ERRORES
exports.errores = (er) => {
    ListasMsj = [];
    er.errors.forEach(element => {
        ListasMsj.push({campo: element.path, msj: element.msg});
    });
    return ListasMsj;
};