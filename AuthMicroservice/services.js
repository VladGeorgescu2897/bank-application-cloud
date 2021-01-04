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
    // to be done
    // HINT: folositi functia "sign" din biblioteca jsonwebtoken
    // HINT2: seamana cu functia verify folosita mai jos ;)
    /*
     payload trebuie sa fie de forma:
     {
         userId: ,
         userRole:
     }
    */
    try {
        const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, options);
        return token;
    } catch (err) {
        console.trace(err);
        // throw new ServerError("Eroare la codificarea tokenului!", 500);
    }
};

const verifyAndDecodeData = async (token) => {
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY, options);
        return decoded;
    } catch (err) {
        console.trace(err);
        // throw new ServerError("Eroare la decodificarea tokenului!", 500);
    }
};

// const decode = async (req, res, next) => {
//     try {
//         if (!req.headers.authorization) {
//             throw new ServerError('Lipseste headerul de autorizare!', 403);
//         }
//         const token = req.headers.authorization.split(" ")[1]; // se separa dupa " " deoarece este de forma: Bearer 1wqeiquqwe0871238712qwe
//
//         validateFields({
//             jwt: {
//                 value: token,
//                 type: 'jwt'
//             }
//         });
//
//         const decoded = await verifyAndDecodeData(token);
//         /*
//          Decoded este obiectul care a fost trimis pentru criptare in functia "generateToken"
//          are forma:
//          {
//             userId: ,
//             userRole:
//          }
//         */
//
//         /*
//         pentru a putea folosi informatia in middleware-ul urmator retin informatia decodata in campul "state" al obiectului "req"
//         obiectul "req" va fi transmis implicit la urmatorul middleware
//         */
//
//         req.state = {
//             decoded
//         };
//
//         next();
//     } catch (err) {
//         next(err);
//     }
// };


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
    // if (client === null) {
    //     throw new ServerError(`Utilizatorul inregistrat cu ${username} nu exista!`, 404);
    // }
    // myPass = client.password

    // if (await compare(password, user.password)) {
    //     return await generateToken({
    //         userId: user._id,
    //         userRole: user.role
    //     });
    // }
    // throw new ServerError("Combinatia de username si parola nu este buna!", 404);
};

// const getClientById = async (id) => {
//     console.info(`Sending request to IO for client ${id} ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/clients/${id}`
//     }
//
//     const client = await sendRequest(options);
//
//     return client;
// };
//
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
//
// const getAccounts = async () => {
//     console.info(`Sending request to IO for all accounts ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts`
//     }
//
//     const accounts = await sendRequest(options);
//
//     return accounts;
// };
//
// const getAccountById = async (id) => {
//     console.info(`Sending request to IO for account ${id} ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${id}`
//     }
//
//     const account = await sendRequest(options);
//
//     return account;
// };
//
// const getAccountsByClientId = async (id) => {
//     console.info(`Sending request to IO for accounts of client with id ${id} ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/client/${id}`
//     }
//
//     const accounts = await sendRequest(options);
//
//     return accounts;
// };
//
// const addAccount = async (client_id, iban, balance, currency, type) => {
//     console.info(`Sending request to IO to add account with iban ${iban} and currency ${currency} ...`);
//
//     const options = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts`,
//         method: 'POST',
//         data: {
//             client_id,
//             iban,
//             balance,
//             currency,
//             type
//         }
//     }
//
//     const account_id = await sendRequest(options);
//
//     return account_id;
// };
//
// const transfer = async (ibanFrom, ibanTo, balance) => {
//     console.info(`Sending request to IO to transfer ${balance} from account with iban ${ibanFrom} to account with iban ${ibanTo}...`);
//
//     const getAccountFrom = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${ibanFrom}`
//     }
//
//     const accountFrom = await sendRequest(getAccountFrom);
//     const getAccountTo = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${ibanTo}`
//     }
//
//     const accountTo = await sendRequest(getAccountTo);
//
//     const updateAccountFrom = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountFrom.account_id}`,
//         method: 'PUT',
//         data: {
//             balance: accountFrom.balance - balance
//         }
//     }
//     const updateAccountTo = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountTo.account_id}`,
//         method: 'PUT',
//         data: {
//             balance: accountTo.balance + balance
//         }
//     }
//
//     const account_id1 = await sendRequest(updateAccountFrom);
//     const account_id2 = await sendRequest(updateAccountTo);
//     const response = {
//         accountFrom_id1: account_id1,
//         accountTo_id2: account_id2
//     }
//
//
//     return response;
// };
//
// const withdraw = async (client_id, iban, balance) => {
//     console.info(`Sending request to IO to withdraw ${balance} from account with iban ${iban}`);
//
//     const getAccountToWithdrawRequest = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
//     }
//     const accountToWithdraw = await sendRequest(getAccountToWithdrawRequest);
//
//     const withdrawFromAccount = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountToWithdraw.account_id}`,
//         method: 'PUT',
//         data: {
//             balance: accountToWithdraw.balance - balance
//         }
//     }
//
//     let accountToWithdrawIban = 0;
//
//     if (accountToWithdraw.client_id === client_id)
//         accountToWithdrawIban = await sendRequest(withdrawFromAccount);
//
//     return accountToWithdrawIban;
//
// };
//
// const deposit = async (client_id, iban, balance) => {
//     console.info(`Sending request to IO to deposit ${balance} into account with iban ${iban}`);
//
//     const getAccountToDepositRequest = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
//     }
//     const accountToDeposit = await sendRequest(getAccountToDepositRequest);
//
//     const depositToAccount = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${accountToDeposit.account_id}`,
//         method: 'PUT',
//         data: {
//             balance: accountToDeposit.balance + balance
//         }
//     }
//
//     let accountToDepositIban = 0;
//
//     if (accountToDeposit.client_id === client_id)
//         accountToDepositIban = await sendRequest(depositToAccount);
//
//     return accountToDepositIban;
//
// };
//
// const deleteAccountByIban = async (client_id, iban) => {
//     console.info(`Sending request to IO to delete account with iban ${iban}`);
//
//     const getAccountToDeleteRequest = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`
//     }
//
//     const accountToDelete = await sendRequest(getAccountToDeleteRequest);
//
//     const deleteAccountRequest = {
//         url: `http://${process.env.IO_SERVICE_API_ROUTE}/accounts/${iban}`,
//         method: 'DELETE',
//     }
//
//     let accountToDeleteIban = 0;
//
//     if (accountToDelete.client_id === client_id)
//         accountToDeleteIban = await sendRequest(deleteAccountRequest);
//
//     return accountToDeleteIban;
// };

module.exports = {
    addClient,
    authenticate,
    verifyAndDecodeData,
    test
}