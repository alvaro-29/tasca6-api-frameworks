const mongoose = require('mongoose');

// Definim l'esquema per a les Tasques
const Tasca = new mongoose.Schema({
    titol: { 
        type: String, 
        required: [true, 'El títol de la Tasca és obligatori.'], // Camp obligatori
        minlength: [3, 'El títol ha de tenir almenys 3 caràcters.'], // Mínim 3 caràcters
        maxlength: [100, 'El títol no pot superar els 100 caràcters.'] // Màxim 100 caràcters
    },

    description: { 
        type: String,
        trim: true, // Treu espais al principi i al final
        maxlength: [500, 'La descripció no pot superar els 500 caràcters.'] // Màxim 500 caràcters
    },

    cost: { 
        type: Number, 
        required: [true, 'El cost de la tasca és obligatori.'], // Camp obligatori
        min: [0, 'El cost no pot ser negatiu.'], // No pot ser negatiu
        max: [10000000, 'El cost és massa alt.'] // Màxim permès
    },

    hours_estimated: { 
        type: Number, 
        required: [true, 'Les hores estimades són obligatories.'], // Camp obligatori
        min: [0, 'Les hores estimades no poden ser negatives.'], // No negatiu
        max: [1000, 'Les hores estimades no poden superar les 1000 hores.'] // Màxim 1000 hores
    },

    hours_real: { 
        type: Number,
        min: [0, 'Les hores reals no poden ser negatives.'], // No negatiu
        max: [1000, 'Les hores reals no poden superar les 1000 hores.'], // Màxim 1000 hores
    },

    image: { 
        type: String,
        trim: true, // Treu espais
        match: [/^https?:\/\/[^\s]+$/, 'La URL de la imatge no és vàlida.'], // Comprova que sigui una URL
    },

    completed: { 
        type: Boolean, 
        default: false // Per defecte no està completada
    },

    finished_at: { 
        type: Date,
        validate: function(value){
            // Si la tarea está completada, finished_at debe existir
            if (this.completed && !value) return false;
            // Si no está completada, no debe existir finished_at
            if (!this.completed && value) return false;
            return true;
        }
    },

    createdAt: { 
        type: Date, 
        default: Date.now, // Data de creació per defecte
        immutable: true // No es pot canviar després de crear-se
    }
});

// Exportem el model per poder-lo usar a altres fitxers
module.exports = mongoose.model('Tasca', Tasca);