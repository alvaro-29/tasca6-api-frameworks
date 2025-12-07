// uploadController.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

// controllers/uploadController.js

// Subida Local
exports.uploadLocal = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No s'ha penjat cap arxiu." });
    }

    // Construimos la URL completa para que sea accesible desde el navegador
    const localUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    res.status(201).send({
        success: true,
        message: 'Imatge pujada localment',
        image: {
            filename: req.file.filename,
            path: req.file.path,
            url: localUrl, 
            size: req.file.size,
            mimetype: req.file.mimetype
        }
    });
};

// Subida Cloudinary
exports.uploadCloud = (req, res) => {
    if (!req.file) {
        return res.status(400).send({ error: "No s'ha penjat cap arxiu." });
    }

    // Cloudinary ya nos devuelve la URL en req.file.path
    res.status(201).send({
        success: true,
        message: 'Imatge pujada a Cloudinary',
        image: {
            url: req.file.path, // URL pública de Cloudinary
            public_id: req.file.filename,
            format: req.file.format,
            size: req.file.size
        }
    });
};

// Fet per Álvaro Gómez Fernández