const multer = require('multer');
const path = require('path');
const sharp = require('sharp');

const resizeImage = async (file) => {
    const {buffer} = file; const {size} = buffer;
    const maxSize = 1 * 1024 * 1024; // 1MB
    if (size > maxSize) {
        const resizedBuffer = await sharp(buffer).resize({width: 800})
            .toBuffer();
        return resizedBuffer;
    }
    return buffer;
};

const diskStorageCarros = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/carros"));
    },
    filename: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            const uniqueSuffix = Math.round(Math.random() * (99998 - 10000)) + 10001;
            cb(
                null,
                "carro-" +
                Date.now() +
                uniqueSuffix +
                "-" +
                req.query.id +
                "-" +
                file.mimetype.replace("/", ".")
            );
        }
    },
});

const diskStorageClientes = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/clientes"));
    },
    filename: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            const uniqueSuffix = Math.round(Math.random() * (99998 - 10000)) + 10001;
            cb(
                null,
                "cliente-" +
                Date.now() +
                uniqueSuffix +
                "-" +
                req.query.id +
                "-" +
                file.mimetype.replace("/", ".")
            );
        }
    },
});

const diskStorageEmpleados = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/empleados"));
    },
    filename: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            const uniqueSuffix = Math.round(Math.random() * (99998 - 10000)) + 10001;
            cb(
                null,
                "empleado-" +
                Date.now() +
                uniqueSuffix +
                "-" +
                req.query.id +
                "-" +
                file.mimetype.replace("/", ".")
            );
        }
    },
});

const diskStorageMotocicletas = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../../public/img/motocicletas"));
    },
    filename: (req, file, cb) => {
        if (
            file.mimetype === "image/jpeg" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"
        ) {
            const uniqueSuffix = Math.round(Math.random() * (99998 - 10000)) + 10001;
            cb(
                null,
                "motocicleta-" +
                Date.now() +
                uniqueSuffix +
                "-" +
                req.query.id +
                "-" +
                file.mimetype.replace("/", ".")
            );
        }
    },
});

// SUBIDA DE IMAGENES
exports.uploadImagenCarro = multer({
    storage: diskStorageCarros,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Solo se permiten archivos png, jpeg o jpg de imagen"));
        }
    },
    limits: {
        fileSize: 1000000, // 1MB
    },
}).single("imagen");

exports.uploadImagenCliente = multer({
    storage: diskStorageClientes,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Solo se permiten archivos png, jpeg o jpg de imagen"));
        }
    },
    limits: {
        fileSize: 1000000, // 1MB
    },
}).single("imagen");

exports.uploadImagenEmpleado = multer({
    storage: diskStorageEmpleados,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Solo se permiten archivos png, jpeg o jpg de imagen"));
        }
    },
    limits: {
        fileSize: 1000000, // 1MB
    },
}).single("imagen");

exports.uploadImagenMotocicleta = multer({
    storage: diskStorageMotocicletas,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpeg" || file.mimetype == "image/jpg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error("Solo se permiten archivos png, jpeg o jpg de imagen"));
        }
    },
    limits: {
        fileSize: 1000000, // 1MB
    },
}).single("imagen");