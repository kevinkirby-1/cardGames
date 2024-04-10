const routes = require('express').Router();
const { requiresAuth } = require('express-openid-connect');
const phase10Controller = require("../controllers/phase10");


// GET ALL GAMES
routes.get('/phase10/games', phase10Controller.getAllGames);

// GET GAME BY ID
routes.get('/phase10/games/:id', phase10Controller.getGameById);

// ADD NEW GAME
routes.post('/phase10/games', requiresAuth(), phase10Controller.addGame);

// UPDATE GAME BY ID
routes.put('/phase10/games/:id', requiresAuth(), phase10Controller.updateGame);

// DELETE GAME
routes.delete('/phase10/games/:id', requiresAuth(), phase10Controller.deleteGame);

// GET GAME BY PLAYER ID
routes.get('/phase10/gamesByPlayer/:id', phase10Controller.getGamesByPlayer)

module.exports = routes;