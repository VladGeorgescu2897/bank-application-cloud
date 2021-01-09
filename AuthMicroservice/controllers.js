const Router = require('express').Router();

const {
    ServerError
} = require('./errors');

const {
    addClient,
    authenticate,
    verifyAndDecodeData
} = require('./services.js');

Router.get('/login', async (req, res) => {

    const {
        username,
        password,
        email
    } = req.body;

    const token = await authenticate(username, password, email)

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

    const token = req.headers.authorization;
    const { rolesToCheck } = req.body;

    const hasPermission = await verifyAndDecodeData(token, rolesToCheck);

    res.json(hasPermission);
});

module.exports = Router;