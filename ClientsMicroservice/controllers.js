const Router = require('express').Router();

const {
    ServerError
} = require('./errors');

const {
    getClients,
    getClientById,
    getAccounts,
    getAccountsByClientId,
    addAccount,
    transfer,
    withdraw,
    deposit,
    deleteAccountByIban
} = require('./services.js');

Router.get('/clients', async (req, res) => {
    const token = req.headers.authorization;
    const clients = await getClients(token);

    res.json(clients);
});

Router.get('/clients/:id', async (req, res) => {
    const token = req.headers.authorization;
    const {
        id
    } = req.params;

    const client = await getClientById(token, id);

    res.json(client);
});

Router.get('/accounts', async (req, res) => {
    const token = req.headers.authorization;

    const accounts = await getAccounts(token);

    res.json(accounts);
});

Router.get('/accounts/client/:id', async (req, res) => {
    const token = req.headers.authorization;
    const {
        id
    } = req.params;

    const account = await getAccountsByClientId(token, id);

    res.json(account);
});

Router.get('/accounts/:id', async (req, res) => {
    console.log("##########VLAD E AICI")
    const token = req.headers.authorization;
    const {
        id
    } = req.params;

    const account = await getAccountById(token, id);

    res.json(account);
});

Router.post('/accounts', async (req, res) => {
    const token = req.headers.authorization;
    const {
        client_id,
        iban,
        balance,
        currency,
        type
    } = req.body;


    const id = await addAccount(token, client_id, iban, balance, currency, type);

    res.json(id);
});

Router.put('/accounts/transfer', async (req, res) => {
    const token = req.headers.authorization;
    const {
        ibanFrom,
        ibanTo,
        balance
    } = req.body;

    const response = await transfer(token, ibanFrom, ibanTo, balance);

    res.json(response);

});

Router.put('/accounts/withdraw/:iban', async (req, res) => {
    const token = req.headers.authorization;
    const {
        iban
    } = req.params;

    const {
        client_id,
        balance
    } = req.body;

    const response = await withdraw(token, client_id, iban, balance);

    res.json(response);

});

Router.put('/accounts/deposit/:iban', async (req, res) => {
    const token = req.headers.authorization;
    const {
        iban
    } = req.params;

    const {
        client_id,
        balance
    } = req.body;

    const response = await deposit(token, client_id, iban, balance);

    res.json(response);

});

Router.delete('/accounts/:iban', async (req, res) => {
    const token = req.headers.authorization;
    const {
        iban
    } = req.params;

    const {
        client_id
    } = req.body;

    const response = await deleteAccountByIban(token, client_id, iban);

    res.json(response);

});

module.exports = Router;