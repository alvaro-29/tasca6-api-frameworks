// controllers/taskController.js - OP1-B1-NODE-06 - Frameworks - Fet per Álvaro Gómez Fernández

const Tasca = require('../models/Task');  // Importem el model Tasca de Mongoose

// OPERACIONS CRUD BÀSIQUES

// Crear una nova tasca
exports.createTask = (req, res) => {

    // Desestructurem les dades del cos de la petició (req.body)
    const { titol, description, cost, hours_estimated, hours_real, image, completed, finished_at } = req.body;

    // --- Validacions manuals abans de crear l'objecte ---
    
    // 1. Camps obligatoris
    if (!titol || cost === undefined || hours_estimated === undefined) {
        return res.status(400).send({ error: 'Falten camps obligatoris: títol, cost o hores estimades.' });
    } 

    // 2. Longitud del títol
    if (titol.trim().length < 3 || titol.trim().length > 50) {
        return res.status(400).send({ error: 'El títol ha de tenir entre 3 i 50 caràcters.' });
    }

    // 3. Longitud de la descripció (opcional)
    if (description && description.trim().length > 500) {
        return res.status(400).send({ error: 'La descripció no pot superar els 500 caràcters.' });
    }

    // 4. Valors numèrics positius
    if (cost < 0) {
        return res.status(400).send({ error: 'El cost no pot ser negatiu.' });
    }

    if (hours_estimated < 0) {
        return res.status(400).send({ error: 'Les hores estimades han de ser positives.' });
    }

    if (hours_real !== undefined && hours_real < 0) {
        return res.status(400).send({ error: 'Les hores reals no poden ser negatives.' });
    }

    // 5. Validació de format URL per la imatge
    if (image && !/^https?:\/\/[^\s]+$/.test(image)) {
        return res.status(400).send({ error: 'La URL de la imatge no és vàlida.' });
    }

    // 6. Coherència de dades (si està completada, ha de tenir data de fi)
    if (completed && !finished_at) {
        return res.status(400).send({ error: 'Si la tasca està completada, cal indicar la data de finalització.' });
    }

    // Creem la nova instància del model Tasca amb les dades validades
    const tascaNova = new Tasca({
        titol,
        description,
        cost,
        hours_estimated,
        hours_real,
        image,
        completed,
        finished_at
    });

    // Guardem la tasca a la base de dades MongoDB
    tascaNova.save()
        .then(tascaGuardada => {
            return res.status(201).send(tascaGuardada); // Codi 201: Creat amb èxit
        })
        .catch(err => {
            return res.status(400).send({ error: "No s'ha pogut crear la tasca", details: err.message });
        });
};

// Llistar totes les tasques
exports.getTasks = (req, res) => {
    Tasca.find()  // Mètode de Mongoose per obtenir tots els documents
        .then(tasques => {
            return res.status(200).send(tasques);  // Retornem l'array de tasques
        })
        .catch(err => {
            return res.status(500).send({ error: 'Error obtenint les tasques', details: err.message})
        })
};

// Mostrar una tasca específica per ID
exports.getEspecificTask = (req, res) => {
    Tasca.findById(req.params.id) // Busquem pel paràmetre ID de la URL
        .then(tasca => {
            if (!tasca) {
                // Si no es troba, retornem 404 Not Found
                return res.status(404).send({ error: "No s'ha trobat cap tasca amb aquest ID" });
            }
            res.status(200).send(tasca); // Retornem la tasca trobada
        })
        .catch(err => {
            res.status(400).send({ error: 'ID invàlid o error en la consulta', details: err.message });
        });
};

// Actualitzar una tasca específica (tots els camps)
exports.updateTask = (req, res) => {
    // findByIdAndUpdate: busca, actualitza i retorna (si usem {new: true})
    // runValidators: true assegura que les regles del model s'apliquin també en actualitzar
    Tasca.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
        .then(tascaUpdated => {
            if (!tascaUpdated) {
                return res.status(404).send({ message: 'Tasca no trobada' });
            }
            res.status(200).send(tascaUpdated); // Retornem la tasca ja modificada
        })
        .catch(err => {
            res.status(400).send({ error: 'Error actualitzant la tasca', details: err.message });
        });
};

// Eliminar una tasca específica
exports.deleteTask = (req, res) => {
    Tasca.findByIdAndDelete(req.params.id) // Elimina directament per ID
        .then(tascaEliminada => {
            if (!tascaEliminada) {
                return res.status(404).send({ message: 'Tasca no trobada' });
            }
            res.status(200).send({ message: 'Tasca eliminada amb èxit', tasca: tascaEliminada });
        })
        .catch(err => {
            res.status(500).send({ error: 'Error eliminant la tasca', details: err.message });
        });
};

// GESTIÓ D'IMATGES

// Actualitzar només la imatge d'una tasca (rep una URL)
exports.updateTaskImage = (req, res) => {
    const { image } = req.body; // Extraiem la URL del cos de la petició

    // Validem que ens hagin enviat alguna cosa
    if (!image) {
        return res.status(400).send({ error: 'Cal proporcionar una URL d\'imatge' });
    }

    // Actualitzem només el camp 'image'
    Tasca.findByIdAndUpdate(req.params.id, { image: image }, { new: true, runValidators: true })
        .then(tascaUpdated => {
            if (!tascaUpdated) return res.status(404).send({ message: 'Tasca no trobada' });
            res.status(200).send(tascaUpdated);
        })
        .catch(err => res.status(400).send({ error: 'Error actualitzant la imatge', details: err.message }));
};

// Restablir la imatge per defecte (eliminar la URL existent)
exports.resetTaskImageToDefault = (req, res) => {
    // Posem la imatge a null per indicar que no en té (o tornar a la per defecte)
    Tasca.findByIdAndUpdate(req.params.id, { image: null }, { new: true })
        .then(tascaUpdated => {
            if (!tascaUpdated) {
                return res.status(404).send({ message: 'Tasca no trobada' });
            }
            res.status(200).send({ message: 'Imatge restablerta per defecte', tasca: tascaUpdated });
        })
        .catch(err => res.status(400).send({ error: 'Error resetejant la imatge', details: err.message }));
};

// ESTADÍSTIQUES

// Obtenir estadístiques globals de les tasques
exports.getTaskStats = (req, res) => {
    // Recuperem totes les tasques per fer els càlculs en memòria
    Tasca.find()
        .then(tasques => {
            // 1. Càlculs generals
            const totalTasks = tasques.length;

            // Filtrem tasques completades i calculem pendents
            const completedTasks = tasques.filter(t => t.completed).length;
            const pendingTasks = totalTasks - completedTasks;
            // Calculem % de completació (evitant divisió per zero)
            const completionRate = totalTasks ? ((completedTasks / totalTasks) * 100).toFixed(2) : 0;

            // 2. Càlculs econòmics (sumatoris)
            // Usem reduce per sumar tots els costos (controlant valors nuls amb || 0)
            const totalCost = tasques.reduce((acc, tasca) => acc + (tasca.cost || 0), 0);
            
            // Cost desglossat per estat de la tasca
            const completedTasksCost = tasques.reduce((acc, tasca) => tasca.completed ? acc + (tasca.cost || 0) : acc, 0);
            const pendingTasksCost = tasques.reduce((acc, tasca) => tasca.completed ? acc : acc + (tasca.cost || 0), 0);
            
            // Mitjana de cost per tasca
            const averageCostPerTask = totalTasks ? (totalCost / totalTasks).toFixed(2) : 0;

            // 3. Càlculs temporals
            // Sumem hores estimades vs hores reals invertides
            const totalHoursEstimated = tasques.reduce((acc, t) => acc + (t.hours_estimated || 0), 0);
            const totalHoursReal = tasques.reduce((acc, t) => acc + (t.hours_real || 0), 0);
            
            // Diferència (estalvi o sobrecost)
            const hoursSaved = totalHoursEstimated - totalHoursReal;

            // 4. Construcció i enviament de la resposta JSON
            res.status(200).send({
                success: true,
                data: {
                    // Resum general
                    overview: {
                        totalTasks,
                        completedTasks,
                        pendingTasks,
                        completionRate
                    },
                    
                    // Dades financeres
                    financial: {
                        totalCost,
                        completedTasksCost,
                        pendingTasksCost,
                        averageCostPerTask
                    },
                    
                    // Dades de temps i eficiència
                    time: {
                        totalHoursEstimated,
                        totalHoursReal,
                        hoursSaved
                    }
                }
            });
        })
        .catch(err => {
            // Gestió d'errors del servidor
            res.status(500).send({ error: 'Error obtenint estadístiques', details: err.message });
        });
};

// Fet per Álvaro Gómez Fernández