const routes = require('express').Router();
const rageController = require("../controllers/rage");
const { requiresAuth } = require('express-openid-connect')


// GET ALL GAMES
routes.get('/rage/games', rageController.getAllGames);

// GET GAME BY ID
routes.get('/rage/games/:id', rageController.getGameById)

// ADD GAME
routes.post('/rage/games', requiresAuth(), rageController.addGame)

// UPDATE GAME BY ID
routes.put('/rage/games/:id', requiresAuth(), rageController.updateGame)

// DELETE GAME BY ID
routes.delete('/rage/games/:id', requiresAuth(), rageController.deleteGame)

// GET GAMES BY PLAYER ID
routes.get('/rage/gamesByPlayer/:id', rageController.getGamesByPlayer)


module.exports = routes;  