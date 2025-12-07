// uploadRoutes.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Góm1ez Fernández

const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const uploadLocal = require('../middleware/uploadLocal'); // El que hicimos antes
const uploadCloud = require('../middleware/uploadCloud'); // El nuevo

// Ruta POST Local
router.post('/local', uploadLocal.single('image'), uploadController.uploadLocal);
//                    MIDDLEWARE PRIMER            CONTROLLER DESPRÉS

// Ruta POST Cloud
router.post('/cloud', uploadCloud.single('image'), uploadController.uploadCloud);
//                    MIDDLEWARE PRIMER            CONTROLLER DESPRÉS

module.exports = router;

// Fet per Álvaro Gómez Fernández