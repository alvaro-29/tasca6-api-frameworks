// taskRoute.js - OP1-B1-NODE-05 - Frameworks - Fet per Álvaro Gómez Fernández

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

router.get('/stats', taskController.getTaskStats);  // Obtenir estadístiques
router.post('', taskController.createTask);  // Crear una tasca
router.get('', taskController.getTasks);  // Obtenir totes les tasques
router.get('/:id', taskController.getEspecificTask);  // Obtenir tasca específica
router.put('/:id', taskController.updateTask);  // Actualitzar una tasca
router.delete('/:id', taskController.deleteTask);  // Eliminar una tasca

router.put('/:id/image', taskController.updateTaskImage);  // Actualitzar imatge de tasca
router.put('/:id/image/reset', taskController.resetTaskImageToDefault);  // Restablir imatge per defecte

module.exports = router;

// Fet per Álvaro Gómez Fernández