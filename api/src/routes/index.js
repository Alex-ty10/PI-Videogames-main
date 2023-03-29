const { Router } = require('express');
const allGames = require('../controllers/allGames');
const createGameDB = require('../controllers/createGameDB');
const getDataID = require('../controllers/getDataID');
const getGenres = require('../controllers/getGenres');


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/videogames',allGames);
router.get('/videogame/:id',getDataID)
router.post('/videogames', createGameDB)
router.get('/genres', getGenres);

module.exports = router;
