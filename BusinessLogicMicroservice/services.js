const {
    sendRequest
} = require('./http-client');

const getClients = async (token) => {
    console.info(`Sending request to IO for all clients ...`);

    const rolesToCheck = ["admin"];

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data : {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };
    const hasPermission = await sendRequest(sendToken);
    if (hasPermission) {
        const getClients = {
            url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients`,
            method: "GET",
        }
        const clients = await sendRequest(getClients);

        return clients;
    }
    else return "You do not have authorization for this operation!";
};

const getClientById = async (token, id) => {
    console.info(`Sending request to IO for client with id ${id} ...`);

    const rolesToCheck = ["admin"];

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data : {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };
    const hasPermission = await sendRequest(sendToken);
    if (hasPermission) {
        const getClientByIdRequest = {
            url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients/${id}`,
        }
        const client = await sendRequest(getClientByIdRequest);

        return client;
    }
    else return "You do not have authorization for this operation!";
};

const getAccounts = async (token) => {
    console.info(`Sending request to IO for all accounts ...`);

    const rolesToCheck = ["admin", "user"];

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data : {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
        const getAccountsRequest = {
            url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts`,
        }

        const accounts = await sendRequest(getAccountsRequest);
        return accounts;
    }

    else return "You do not have authorization for this operation!";
};

const getAccountByIban = async (token, iban) => {
    console.info(`Sending request to IO for account with iban ${iban} ...`);

    const rolesToCheck = ["admin", "user"];

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data : {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
        const getAccountByIbanRequest = {
            url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`,
        }

        const account = await sendRequest(getAccountByIbanRequest);
        return account;
    }

    else return "You do not have authorization for this operation!";
};


const getAccountsByClientId = async (token, id) => {
    console.info(`Sending request to IO for accounts of client with id ${id} ...`);

    const rolesToCheck = ["admin", "user"];
    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
        const getAccountByClientIdRequest = {
            url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/client/${id}`,
        }
        const accounts = await sendRequest(getAccountByClientIdRequest);

        return accounts;
    }
    else return "You do not have authorization for this operation!";
};

const addAccount = async (token, client_id, iban, balance, currency, type) => {
    console.info(`Sending request to IO to add account with iban ${iban} and currency ${currency} ...`);

    const rolesToCheck = ["admin", "user"];

    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
        const addAccountRequest = {
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
        const account_id = await sendRequest(addAccountRequest);

        return account_id;
    }
    else return "You do not have authorization for this operation!";
};

const transfer = async (token, ibanFrom, ibanTo, balance) => {
    console.info(`Sending request to IO to transfer ${balance} from account with iban ${ibanFrom} to account with iban ${ibanTo}...`);

    const rolesToCheck = ["admin", "user"];
    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
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
    }
    else return "You do not have authorization for this operation!";
};

const withdraw = async (token, client_id, iban, balance) => {
    console.info(`Sending request to IO to withdraw ${balance} from account with iban ${iban}`);

    const rolesToCheck = ["admin", "user"];
    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {

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
        else return "Client id that was provided is wrong!"

        return accountToWithdrawIban;
    }
    else return "You do not have authorization for this operation!";

};

const deposit = async (token, client_id, iban, balance) => {
    console.info(`Sending request to IO to deposit ${balance} into account with iban ${iban}`);

    const rolesToCheck = ["admin", "user"];
    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
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
        else return "Client id that was provided is wrong!"

        return accountToDepositIban;
    }
    else return "You do not have authorization for this operation!";
};

const deleteAccountByIban = async (token, client_id, iban) => {
    console.info(`Sending request to IO to delete account with iban ${iban}`);

    const rolesToCheck = ["admin", "user"];
    const sendToken = {
        url: `http://${process.env.AUTH_SERVICE_API_ROUTE}/verify`,
        method: "GET",
        data: {
            rolesToCheck,
        },
        headers: {
            authorization: token,
        },
    };

    const hasPermission = await sendRequest(sendToken);

    if (hasPermission) {
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
        else return "Client id that was provided is wrong!"

        return accountToDeleteIban;
    }
    else return "You do not have authorization for this operation!";
};

module.exports = {
    getClients,
    getClientById,
    getAccounts,
    getAccountByIban,
    getAccountsByClientId,
    addAccount,
    transfer,
    withdraw,
    deposit,
    deleteAccountByIban
}