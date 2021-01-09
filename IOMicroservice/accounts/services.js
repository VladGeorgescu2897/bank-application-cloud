const {
    query
} = require('../data');

const getAccounts = async () => {
    console.info(`Getting all accounts ...`);

    const accounts = await query("SELECT * FROM accounts");

    return accounts;
};

const getAccountById = async (id) => {
    console.info(`Getting account ${id} ...`);

    const account = await query("SELECT * FROM accounts WHERE account_id = $1", [id]);

    console.log("########ACCOUNT: ", account[0]);

    return account[0];
};

const getAccountsByClientId = async (id) => {
    console.info(`Getting accounts of client with id ${id} ...`);

    const accounts = await query("SELECT * FROM accounts WHERE client_id = $1", [id]);

    return accounts;
};

const getAccountByIban = async (iban) => {
    console.info(`Getting account with iban ${iban} ...`);

    const accounts = await query("SELECT * FROM accounts WHERE iban = $1", [iban]);

    return accounts[0];
};

const addAccount = async (client_id, iban, balance, currency, type) => {
    console.info(`Adding account with iban ${iban} and currency ${currency} ...`);

    const accounts = await query("INSERT INTO accounts (client_id, iban, balance, currency, type) VALUES ($1, $2, $3, $4, $5) RETURNING account_id", [client_id, iban, balance, currency, type]);

    return accounts[0].account_id;
};

const updateAccountBalanceById = async (balance, id) => {
    console.info(`Update account balance ...`);

    const accounts = await query("UPDATE accounts SET balance = $1 where account_id = $2", [balance, id]);

    return id;
};

const deleteAccountByIban = async (iban) => {
    console.info(`Delete account with IBAN ${iban} ...`);

    const accounts = await query("DELETE FROM accounts where iban = $1", [iban]);

    return iban;
};

module.exports = {
    getAccounts,
    getAccountById,
    getAccountsByClientId,
    getAccountByIban,
    addAccount,
    updateAccountBalanceById,
    deleteAccountByIban
}