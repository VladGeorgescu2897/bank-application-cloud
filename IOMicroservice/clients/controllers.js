const Router = require('express').Router();

const {
    // getBookById,
    // getBooks,
    // addBook
    getClients,
    getClientById,
    addClient
} = require('./services.js');

Router.get('/', async (req, res) => {
    console.log("########## IO GET CLIENTS #############")
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

Router.post('/', async (req, res) => {

    const {
        username,
        password,
        email
    } = req.body;

    const id = await addClient(username, password, email);

    res.json(id);
});

module.exports = Router;