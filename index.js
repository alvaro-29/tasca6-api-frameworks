// index.js - OP1-B1-NODE-05 - Frameworks - Fet per Álvaro Gómez Fernández

// Carregar variables d'entorn
require('dotenv').config();

// Importar llibreries necessàries
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connexió a MongoDB establerta');
        
        // Iniciar el servidor
        app.listen(process.env.PORT, () => {
            console.log(`Servidor en funcionament a http://localhost:${process.env.PORT}`);
        });
    })
    .catch(err => console.error('Error connectant a MongoDB:', err));

// Fet per Álvaro Gómez Fernández