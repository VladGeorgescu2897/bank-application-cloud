const {
    query
} = require('../data');

const getClients = async () => {
    console.info(`Getting all clients ...`);

    const clients = await query("SELECT * FROM clients");

    return clients;
};

const getClientById = async (id) => {
    console.info(`Getting client ${id} ...`);

    const clients = await query("SELECT * FROM clients WHERE client_id = $1", [id]);

    return clients[0];
};

const addClient = async (username, password, email) => {
    console.info(`Adding client with username ${username} and email ${email} ...`);

    const clients = await query("INSERT INTO clients (username, password, email) VALUES ($1, $2, $3) RETURNING client_id", [username, password, email]);

    return clients[0].client_id;
};

module.exports = {
    getClients,
    getClientById,
    addClient
}