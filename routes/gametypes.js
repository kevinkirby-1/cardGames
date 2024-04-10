const routes = require('express').Router();
const gametypeController = require("../controllers/gametypes");
const { requiresAuth } = require('express-openid-connect');


// GET ALL GAME TYPES
routes.get('/types', gametypeController.getAllTypes);

// GET GAME TYPE BY ID
routes.get('/types/:id', gametypeController.getTypeById);

// ADD GAME TYPE
routes.post('/types', requiresAuth(), gametypeController.addType);

// UPDATE GAME TYPE
routes.put('/types/:id', requiresAuth(), gametypeController.updateType);

// DELETE GAME TYPE
routes.delete('/types/:id', requiresAuth(), gametypeController.deleteType)

module.exports = routes;