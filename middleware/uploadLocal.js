// uploadLocal.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

const multer = require('multer');

// Configuració d'emmagatzematge local
// importem la configuració del multer:
const { storage, fileFilter } = require('../config/multer');


// Configuració de Multer per pujada local
const uploadLocal = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // Límit de 5MB
    }
});

module.exports = uploadLocal;

// Fet per Álvaro Gómez Fernández