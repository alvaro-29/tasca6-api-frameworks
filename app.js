// app.js - OP1-B1-NODE-05 - Frameworks - Fet per Álvaro Gómez Fernández

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors') ;
const path = require('path');  // Importem 'path' per a rutes estàtiques

const app = express(); // Inicialitzar Express

// Middleware per gestionar CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Middleware per analitzar JSON i formularis URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Ruta inicial de prova
app.get('/', (req, res) => {
    res.send({ message: 'Gestor de tasques en funcionament!'});
});

// Importar rutes
const taskRoutes = require('./routes/taskRoutes');
const uploadRoutes = require('./routes/uploadRoutes')

app.use('/api/tasks', taskRoutes);  // Afegir les rutes de tasques
app.use('/api/upload', uploadRoutes); 

module.exports = app;  // Exportar l'aplicació

// Fet per Álvaro Gómez Fernández