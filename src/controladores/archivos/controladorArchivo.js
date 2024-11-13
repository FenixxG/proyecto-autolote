const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { uploadImagenCarro, uploadImagenCliente, uploadImagenEmpleado, uploadImagenMotocicleta } = require("../../configuraciones/archivos");
const { resizeImage } = require("../../configuraciones/archivos");
const { validationResult } = require("express-validator");
const Carro = require("../../modelos/carros/carro");
const Cliente = require("../../modelos/clientes/cliente");
const Empleado = require("../../modelos/empleados/empleado");
const Motocicleta = require("../../modelos/motocicletas/motocicleta");

// VALIDACIONES DE IMAGENES
exports.validarImagenCarro = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    else {
        uploadImagenCarro(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
                console.log(err);
            } else if (err) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

exports.validarImagenCliente = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        uploadImagenCliente(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
                console.log(err);
            } else if (err) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

exports.validarImagenEmpleado = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        uploadImagenEmpleado(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
                console.log(err);
            } else if (err) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

exports.validarImagenMotocicleta = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    } else {
        uploadImagenMotocicleta(req, res, (err) => {
            if (err instanceof multer.MulterError) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
                console.log(err);
            } else if (err) {
                res.status(400).json({ msj: "Error al cargar la imagen", error: err });
            } else {
                next();
            }
        });
    }
};

// ACTUALIZACION DE IMAGENES
exports.actualizarImagenCarro = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => {
            msjerror = msjerror + r.msg + ". ";
        });
        res.status(400).json({ msj: "Hay error en la petición", error: msjerror });
    } else {
        const { id } = req.query;
        if (!req.file) {
            return res.status(400).json({ msj: "No se pudo enviar la imagen" });
        }
        const nombreImagen = req.file.filename;
        var buscarCarro = await Carro.findOne({ where: { id: id } });
        if (!buscarCarro) {
            res.json({ msj: "El id del carro no existe" });
        } else {
            const imagenAnterior = fs.existsSync(path.join(__dirname, "../../../public/img/carros/" + buscarCarro.imagen));
            if (imagenAnterior) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img/carros/" + buscarCarro.imagen));
                console.log("Imagen eliminada");
            }
            const imagenNueva = fs.existsSync(path.join(__dirname, "../../../public/img/carros/" + nombreImagen));
            if (imagenNueva) {
                buscarCarro.imagen = nombreImagen;
                buscarCarro.save()
                    .then((data) => {
                        res.status(200).json({ id: data.id, imagen: data.imagen });
                    }).catch((er) => {
                        res.status(500).json(er);
                    });
                console.log("Imagen actualizada");
            } else {
                res.status(400).json({ msj: "No se pudo actualizar la imagen" });
            }
        }
    }
};

exports.actualizarImagenCliente = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => {
            msjerror = msjerror + r.msg + ". ";
        });
        res.status(400).json({ msj: "Hay error en la petición", error: msjerror });
    } else {
        const { id } = req.query;
        if (!req.file) {
            return res.status(400).json({ msj: "No se pudo enviar la imagen" });
        }
        const nombreImagen = req.file.filename;
        var buscarCliente = await Cliente.findOne({ where: { id: id } });
        if (!buscarCliente) {
            res.json({ msj: "El id del cliente no existe" });
        } else {
            const imagenAnterior = fs.existsSync(path.join(__dirname, "../../../public/img/clientes/" + buscarCliente.imagen));
            if (imagenAnterior) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img/clientes/" + buscarCliente.imagen));
                console.log("Imagen eliminada");
            }
            const imagenNueva = fs.existsSync(path.join(__dirname, "../../../public/img/clientes/" + nombreImagen));
            if (imagenNueva) {
                buscarCliente.imagen = nombreImagen;
                buscarCliente.save()
                    .then((data) => {
                        res.status(200).json({ id: data.id, imagen: data.imagen });
                    }).catch((er) => {
                        res.status(500).json(er);
                    });
                console.log("Imagen actualizada");
            } else {
                res.status(400).json({ msj: "No se pudo actualizar la imagen" });
            }
        }
    }
};

exports.actualizarImagenEmpleado = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => {
            msjerror = msjerror + r.msg + ". ";
        });
        res.status(400).json({ msj: "Hay error en la petición", error: msjerror });
    } else {
        const { id } = req.query;
        if (!req.file) {
            return res.status(400).json({ msj: "No se pudo enviar la imagen" });
        }
        const nombreImagen = req.file.filename;
        var buscarEmpleado = await Empleado.findOne({ where: { id: id } });
        if (!buscarEmpleado) {
            res.json({ msj: "El id del empleado no existe" });
        } else {
            const imagenAnterior = fs.existsSync(path.join(__dirname, "../../../public/img/empleados/" + buscarEmpleado.imagen));
            if (imagenAnterior) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img/empleados/" + buscarEmpleado.imagen));
                console.log("Imagen eliminada");
            }
            const imagenNueva = fs.existsSync(path.join(__dirname, "../../../public/img/empleados/" + nombreImagen));
            if (imagenNueva) {
                buscarEmpleado.imagen = nombreImagen;
                buscarEmpleado.save()
                    .then((data) => {
                        res.status(200).json({ id: data.id, imagen: data.imagen });
                    }).catch((er) => {
                        res.status(500).json(er);
                    });
                console.log("Imagen actualizada");
            } else {
                res.status(400).json({ msj: "No se pudo actualizar la imagen" });
            }
        }
    }
};

exports.actualizarImagenMotocicleta = async (req, res) => {
    const validacion = validationResult(req);
    if (validacion.errors.length > 0) {
        var msjerror = "";
        validacion.errors.forEach(r => {
            msjerror = msjerror + r.msg + ". ";
        });
        res.status(400).json({ msj: "Hay error en la petición", error: msjerror });
    } else {
        const { id } = req.query;
        if (!req.file) {
            return res.status(400).json({ msj: "No se pudo enviar la imagen" });
        }
        const nombreImagen = req.file.filename;
        var buscarMotocicleta = await Motocicleta.findOne({ where: { id: id } });
        if (!buscarMotocicleta) {
            res.json({ msj: "El id de la motocicleta no existe" });
        } else {
            const imagenAnterior = fs.existsSync(path.join(__dirname, "../../../public/img/motocicletas/" + buscarMotocicleta.imagen));
            if (imagenAnterior) {
                fs.unlinkSync(path.join(__dirname, "../../../public/img/motocicletas/" + buscarMotocicleta.imagen));
                console.log("Imagen eliminada");
            }
            const imagenNueva = fs.existsSync(path.join(__dirname, "../../../public/img/motocicletas/" + nombreImagen));
            if (imagenNueva) {
                buscarMotocicleta.imagen = nombreImagen;
                buscarMotocicleta.save()
                    .then((data) => {
                        res.status(200).json({ id: data.id, imagen: data.imagen });
                    }).catch((er) => {
                        res.status(500).json(er);
                    });
                console.log("Imagen actualizada");
            } else {
                res.status(400).json({ msj: "No se pudo actualizar la imagen" });
            }
        }
    }
};