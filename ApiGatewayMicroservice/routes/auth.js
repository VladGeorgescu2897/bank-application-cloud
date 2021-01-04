const Router = require("express").Router();

const { sendRequest } = require("../http-client");

Router.get("/login", async (req, res) => {
    console.info(`Forwarding request for login ...`);

    const { username, password, email } = req.body;


    const getResponseRequest = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/login`,
        method: "GET",
        data: {
            username,
            password,
            email,
        },
    };

    const string = await sendRequest(getResponseRequest);

    res.json(string);
});

Router.post("/register", async (req, res) => {
    console.info(`Forwarding request for register ...`);

    const { username, password, email, role} = req.body;


    const getResponseRequest = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/register`,
        method: "POST",
        data: {
            username,
            password,
            email,
            role,
        },
    };

    const string = await sendRequest(getResponseRequest);

    res.json(string);
});

module.exports = Router;