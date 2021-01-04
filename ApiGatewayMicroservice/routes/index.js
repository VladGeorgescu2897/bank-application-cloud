const Router = require('express').Router();

const ClientsRoute = require('./clients.js');
const AccountsRoute = require('./accounts.js');
const AuthRoute = require('./auth.js');

Router.use('/clients', ClientsRoute);
Router.use('/accounts', AccountsRoute);
Router.use('/auth', AuthRoute);

module.exports = Router;
