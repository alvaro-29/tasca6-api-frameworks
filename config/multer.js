// /config/multer.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Assegurar que el directori existeix
const uploadDir = 'uploads/';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true }); // L'opció { recursive: true } assegura que es creïn tots els subdirectoris necessaris si cal.
}

// Configuració d'emmagatzematge local
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);  // destination indica on guardar els fitxers.
    },
    // filename defineix com anomenar cada fitxer pujat per evitar sobrescriure fitxers amb el mateix nom.
    filename: function (req, file, cb) {
        // Generar nom únic: timestamp + nom original
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const extension = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, extension);
        cb(null, `${baseName}-${uniqueSuffix}${extension}`);
    }
});

// Filtrar només imatges
const fileFilter = (req, file, cb) => {
    // Expresión regular para tipos de archivo permitidos
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
        return cb(null, true);
    }
    cb(new Error('Error: Només es permeten arxius d\'imatge vàlids (jpeg, jpg, png, gif, webp).'));
};

module.exports = {
    storage,
    fileFilter
};

// Fet per Álvaro Gómez Fernández