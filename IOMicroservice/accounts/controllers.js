const Router = require('express').Router();

const {
    getAccounts,
    getAccountById,
    getAccountsByClientId,
    getAccountByIban,
    addAccount,
    updateAccountBalanceById,
    deleteAccountByIban
} = require('./services.js');

Router.get('/', async (req, res) => {
    console.log("########## IO GET ACCOUNTS #############")
    const accounts = await getAccounts();

    res.json(accounts);
});

// Router.get('/:id', async (req, res) => {
//
//     const {
//         id
//     } = req.params;
//
//     const account = await getAccountById(id);
//
//     res.json(account);
// });

Router.get('/client/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const accounts = await getAccountsByClientId(id);

    res.json(accounts);
});

Router.get('/:iban', async (req, res) => {

    const {
        iban
    } = req.params;

    const account = await getAccountByIban(iban);

    res.json(account);
});

Router.post('/', async (req, res) => {

    const {
        client_id,
        iban,
        balance,
        currency,
        type
    } = req.body;

    const id = await addAccount(client_id, iban, balance, currency, type);

    res.json(id);
});

Router.put('/:id', async (req, res) => {

    const {
        id
    } = req.params;

    const {
        balance
    } = req.body;

    const account_id = await updateAccountBalanceById(balance, id);

    res.json(account_id);

});

Router.delete('/:iban', async (req, res) => {

    const {
        iban
    } = req.params;

    const account_iban = await deleteAccountByIban(iban);

    res.json(account_iban);

});


module.exports = Router;