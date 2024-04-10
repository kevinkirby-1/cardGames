const routes = require('express').Router()
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');

// Auth0 Config
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.AUTH0_BASE_URL,
    clientID: process.env.AUTH0_CLIENT_ID,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL
  };
routes.use(auth(config));
routes.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // #swagger.tags = ['User']
});

// Display User Info
routes.get('/user', requiresAuth(), (req, res) => {
    res.status(200).send("Hello " + req.oidc.user.name);
    // #swagger.tags = ['User']
});

module.exports = routes;
