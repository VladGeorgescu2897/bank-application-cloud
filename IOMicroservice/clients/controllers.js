const Router = require('express').Router();

const {
    getClients,
    getClientById
} = require('./services.js');

Router.get('/', async (req, res) => {
    const clients = await getClients();

    res.json(clients);
});

Router.get('/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const client = await getClientById(id);

    res.json(client);
});

module.exports = Router;