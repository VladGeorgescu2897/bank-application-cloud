const Router = require('express').Router();

const ClientsController = require('./clients/controllers.js');
const AccountsController = require('./accounts/controllers.js');

Router.use('/clients', ClientsController);
Router.use('/accounts', AccountsController);

module.exports = Router;