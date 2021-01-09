const {
    query
} = require('../data');

const getClients = async () => {
    console.info(`Getting all clients ...`);

    const clients = await query("SELECT * FROM clients");

    return clients;
};

const getClientById = async (id) => {
    console.info(`Getting client with id ${id} ...`);

    const clients = await query("SELECT * FROM clients WHERE client_id = $1", [id]);

    return clients[0];
};

module.exports = {
    getClients,
    getClientById
}