// uploadCloud.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

const storage = require('../config/cloudinary');
const multer = require('multer');


const uploadCloud = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB
});

module.exports = uploadCloud;

// Fet per Álvaro Gómez Fernández