const {
    sendRequest
} = require('./http-client');


const getClients = async () => {
    console.info(`Sending request to IO for all clients ...`);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients`
    }

    const clients = await sendRequest(options);

    return clients;
};

const getClientById = async (id) => {
    console.info(`Sending request to IO for client ${id} ...`);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients/${id}`
    }

    const client = await sendRequest(options);

    return client;
};

// const addClient = async (username, password, email) => {
//     console.info(`Sending request to IO to add client with username ${username} and email ${email} ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients`,
//         method: 'POST',
//         data: {
//             username,
//             password,
//             email
//         }
//     }
//
//     const client_id = await sendRequest(options);
//
//     return client_id;
// };

const getAccounts = async (token) => {
    console.info(`Sending request to IO for all accounts ...`);

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            token,
        },
    };

    const roles = await sendRequest(sendToken);
    console.log("roles: ", roles);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts`
    }

    const accounts = await sendRequest(options);

    if (roles.clientRole === "admin")
        return accounts;
    else return "NU ESTI AUTORIZAT SA FACI ACEASTA OPERATIE!"
};

const getAccountById = async (id) => {
    console.info(`Sending request to IO for account ${id} ...`);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${id}`
    }

    const account = await sendRequest(options);

    return account;
};

const getAccountsByClientId = async (id) => {
    console.info(`Sending request to IO for accounts of client with id ${id} ...`);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/client/${id}`
    }

    const accounts = await sendRequest(options);

    return accounts;
};

const addAccount = async (client_id, iban, balance, currency, type) => {
    console.info(`Sending request to IO to add account with iban ${iban} and currency ${currency} ...`);

    const options = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts`,
        method: 'POST',
        data: {
            client_id,
            iban,
            balance,
            currency,
            type
        }
    }

    const account_id = await sendRequest(options);

    return account_id;
};

const transfer = async (ibanFrom, ibanTo, balance) => {
    console.info(`Sending request to IO to transfer ${balance} from account with iban ${ibanFrom} to account with iban ${ibanTo}...`);

    const getAccountFrom = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${ibanFrom}`
    }

    const accountFrom = await sendRequest(getAccountFrom);
    const getAccountTo = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${ibanTo}`
    }

    const accountTo = await sendRequest(getAccountTo);

    const updateAccountFrom = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountFrom.account_id}`,
        method: 'PUT',
        data: {
            balance: accountFrom.balance - balance
        }
    }
    const updateAccountTo = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountTo.account_id}`,
        method: 'PUT',
        data: {
            balance: accountTo.balance + balance
        }
    }

    const account_id1 = await sendRequest(updateAccountFrom);
    const account_id2 = await sendRequest(updateAccountTo);
    const response = {
        accountFrom_id1: account_id1,
        accountTo_id2: account_id2
    }


    return response;
};

const withdraw = async (client_id, iban, balance) => {
    console.info(`Sending request to IO to withdraw ${balance} from account with iban ${iban}`);

    const getAccountToWithdrawRequest = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
    }
    const accountToWithdraw = await sendRequest(getAccountToWithdrawRequest);

    const withdrawFromAccount = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountToWithdraw.account_id}`,
        method: 'PUT',
        data: {
            balance: accountToWithdraw.balance - balance
        }
    }

    let accountToWithdrawIban = 0;

    if (accountToWithdraw.client_id === client_id)
        accountToWithdrawIban = await sendRequest(withdrawFromAccount);

    return accountToWithdrawIban;

};

const deposit = async (client_id, iban, balance) => {
    console.info(`Sending request to IO to deposit ${balance} into account with iban ${iban}`);

    const getAccountToDepositRequest = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
    }
    const accountToDeposit = await sendRequest(getAccountToDepositRequest);

    const depositToAccount = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountToDeposit.account_id}`,
        method: 'PUT',
        data: {
            balance: accountToDeposit.balance + balance
        }
    }

    let accountToDepositIban = 0;

    if (accountToDeposit.client_id === client_id)
        accountToDepositIban = await sendRequest(depositToAccount);

    return accountToDepositIban;

};

const deleteAccountByIban = async (client_id, iban) => {
    console.info(`Sending request to IO to delete account with iban ${iban}`);

    const getAccountToDeleteRequest = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
    }

    const accountToDelete = await sendRequest(getAccountToDeleteRequest);

    const deleteAccountRequest = {
        url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`,
        method: 'DELETE',
    }

    let accountToDeleteIban = 0;

    if (accountToDelete.client_id === client_id)
        accountToDeleteIban = await sendRequest(deleteAccountRequest);

    return accountToDeleteIban;
};

module.exports = {
    getClients,
    getClientById,
    getAccounts,
    getAccountById,
    getAccountsByClientId,
    addAccount,
    transfer,
    withdraw,
    deposit,
    deleteAccountByIban
}