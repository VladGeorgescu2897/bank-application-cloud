const Router = require('express').Router();

const {
    ServerError
} = require('./errors');

const {
    test,
    addClient,
    authenticate,
    verifyAndDecodeData
} = require('./services.js');

Router.get('/login', async (req, res) => {
    console.log("########## AUTH CONTROLLER #############")

    const {
        username,
        password,
        email
    } = req.body;

    const token = await authenticate(username, password, email)
    const string = await test();

    res.json(token);
});

Router.post('/register', async (req, res) => {

    const {
        username,
        password,
        email,
        role
    } = req.body;

    const id = await addClient(username, password, email, role);

    res.json(id);
});

Router.get('/verify', async (req, res) => {
    console.log("############# VERIFY AUTH")
    const {
        token
    } = req.body;

    const decoded = await verifyAndDecodeData(token);

    res.json(decoded);
});




module.exports = Router;