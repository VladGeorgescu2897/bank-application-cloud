const {
    sendRequest
} = require('./http-client');

const jwt = require('jsonwebtoken');

const options = {
    issuer: process.env.JWT_ISSUER,
    subject: process.env.JWT_SUBJECT,
    audience: process.env.JWT_AUDIENCE
};

const {
    query
} = require('./data');

const generateToken = async (payload) => {
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    } catch (err) {
        console.trace(err);
        // throw new ServerError("Eroare la codificarea tokenului!", 500);
    }
};

const verifyAndDecodeData = async (token, rolesToCheck) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return rolesToCheck.includes(decoded.clientRole);
    } catch (err) {
        console.trace(err);
        // throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

const test = async () => {
    console.info(`##############AUTH REQUEST TEST ...#############`);

    return "VLAD ESTE HACKER";
};

const addClient = async (username, password, email, role) => {
    console.info(`Sending request to db to add client with username ${username} and email ${email} ...`);

    const clients = await query("INSERT INTO clients (username, password, email, role) VALUES ($1, $2, $3, $4) RETURNING client_id", [username, password, email, role]);

    return clients[0].client_id;
};

const authenticate = async (username, password, email) => {
    console.info(`Sending request to db to login ...`);

    const client = await query("SELECT * FROM clients WHERE username = '" + username + "' and email = '" + email + "'");
    let token = "";
    if (password === client[0].password) {
        token = await generateToken({
            clientId: client[0].client_id,
            clientRole: client[0].role
        })
    }

    return token;
};

module.exports = {
    addClient,
    authenticate,
    verifyAndDecodeData,
    test
}