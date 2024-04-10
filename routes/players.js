const routes = require('express').Router();
const playersController = require("../controllers/players");
const { requiresAuth } = require('express-openid-connect');


// GET ALL PLAYERS
routes.get('/players', playersController.getAllPlayers);

// GET PLAYER BY ID
routes.get('/players/:id', playersController.getPlayerById);

// ADD PLAYER
routes.post('/players', requiresAuth(), playersController.addPlayer);

// UPDATE PLAYER
routes.put('/players/:id', requiresAuth(), playersController.updatePlayer);

// DELETE PLAYER
routes.delete('/player/:id', requiresAuth(), playersController.deletePlayer);

module.exports = routes;