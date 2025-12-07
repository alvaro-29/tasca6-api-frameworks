// /config/cloudinary.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary'); 
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'task-manager/images', // Carpeta en Cloudinary
        allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
    },
});

module.exports = storage;

// Fet per Álvaro Gómez Fernández