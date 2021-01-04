const Router = require('express').Router();

const {
    ServerError
} = require('./errors');

const {
    getClients,
    getClientById,
    // addClient,
    getAccounts,
    getAccountById,
    getAccountsByClientId,
    addAccount,
    transfer,
    withdraw,
    deposit,
    deleteAccountByIban,
    testConnectivityAuth
} = require('./services.js');

Router.get('/clients', async (req, res) => {
    console.log("########## MID GET CLIENTS #############")
    const clients = await getClients();

    res.json(clients);
});

Router.get('/clients/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const client = await getClientById(id);

    res.json(client);
});

// Router.post('/clients', async (req, res) => {
//
//     const {
//         username,
//         password,
//         email
//     } = req.body;
//
//     if (!username) {
//         throw new ServerError('No username provided!', 400);
//     }
//
//     if (!email) {
//         throw new ServerError('No email provided!', 400);
//     }
//
//     const id = await addClient(username, password, email);
//
//     res.json(id);
// });

Router.get('/accounts', async (req, res) => {
    const {
        token
    } = req.body;

    const accounts = await getAccounts(token);

    res.json(accounts);
});

Router.get('/accounts/client/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const account = await getAccountsByClientId(id);

    res.json(account);
});

Router.get('/accounts/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const account = await getAccountById(id);

    res.json(account);
});

Router.post('/accounts', async (req, res) => {

    const {
        client_id,
        iban,
        balance,
        currency,
        type
    } = req.body;

    // if (!username) {
    //     throw new ServerError('No username provided!', 400);
    // }
    //
    // if (!email) {
    //     throw new ServerError('No email provided!', 400);
    // }

    const id = await addAccount(client_id, iban, balance, currency, type);

    res.json(id);
});

Router.put('/accounts/transfer', async (req, res) => {

    const {
        ibanFrom,
        ibanTo,
        balance
    } = req.body;

    const response = await transfer(ibanFrom, ibanTo, balance);

    res.json(response);

});

Router.put('/accounts/withdraw/:iban', async (req, res) => {

    const {
        iban
    } = req.params;

    const {
        client_id,
        balance
    } = req.body;

    const response = await withdraw(client_id, iban, balance);

    res.json(response);

});

Router.put('/accounts/deposit/:iban', async (req, res) => {

    const {
        iban
    } = req.params;

    const {
        client_id,
        balance
    } = req.body;

    const response = await deposit(client_id, iban, balance);

    res.json(response);

});

Router.delete('/accounts/:iban', async (req, res) => {

    const {
        iban
    } = req.params;

    const {
        client_id
    } = req.body;

    const response = await deleteAccountByIban(client_id, iban);

    res.json(response);

});

module.exports = Router;