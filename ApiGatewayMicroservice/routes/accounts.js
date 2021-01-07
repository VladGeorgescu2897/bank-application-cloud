const Router = require("express").Router();

const { sendRequest } = require("../http-client");

Router.get("/", async (req, res) => {
  console.info(`Forwarding request for get all accounts ...`);
  const token = req.headers.authorization.split(" ")[1];

  const getAccountsRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts`,
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  const accounts = await sendRequest(getAccountsRequest);

  res.json(accounts);
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request for get account with id ${id} ...`);

  const getAccountIdRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/${id}`,
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  const account = await sendRequest(getAccountIdRequest);

  res.json(account);
});

Router.get("/client/:id", async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request for get accounts of client with id ${id} ...`);

  const getAccountsByClientIdRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/client/${id}`,
    method: "GET",
    headers: {
      authorization: token,
    },
  };

  const accounts = await sendRequest(getAccountsByClientIdRequest);

  res.json(accounts);
});

Router.post("/", async (req, res) => {
  console.info(`Forwarding request for post a new account...`);
  const { client_id, iban, balance, currency, type } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  const postAccountRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts`,
    method: "POST",
    data: {
      client_id,
      iban,
      balance,
      currency,
      type
    },
    headers: {
      authorization: token,
    },
  };

  const id = await sendRequest(postAccountRequest);

  res.json({ id });
});

Router.put("/transfer", async (req, res) => {
  const { ibanFrom, ibanTo, balance } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request for transfer money from the account with iban ${ibanFrom} to account with iban ${ibanTo}...`);

  const putAccountRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/transfer`,
    method: "PUT",
    data: {
      ibanFrom,
      ibanTo,
      balance,
    },
    headers: {
      authorization: token,
    },
  };

  const response = await sendRequest(putAccountRequest);
  res.json({ response });
});

Router.put("/withdraw/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id, balance } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request for withdraw money from the account with iban ${iban} of the client with id ${client_id}...`);

  const withdrawAccountRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/withdraw/${iban}`,
    method: "PUT",
    data: {
      client_id,
      balance,
    },
    headers: {
      authorization: token,
    },
  };

  const response = await sendRequest(withdrawAccountRequest);
  res.json({ response });
});

Router.put("/deposit/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id, balance } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request for deposit money into account with iban ${iban} of the client with id ${client_id}...`);

  const depositAccountRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/deposit/${iban}`,
    method: "PUT",
    data: {
      client_id,
      balance,
    },
    headers: {
      authorization: token,
    },
  };

  const response = await sendRequest(depositAccountRequest);
  res.json({ response });
});

Router.delete("/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id } = req.body;
  const token = req.headers.authorization.split(" ")[1];

  console.info(`Forwarding request to delete the account with iban ${iban} of the client with id ${client_id}...`);

  const deleteAccountRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/accounts/${iban}`,
    method: "DELETE",
    data: {
      client_id,
    },
    headers: {
      authorization: token,
    },
  };

  const response = await sendRequest(deleteAccountRequest);
  res.json({ response });
});

module.exports = Router;
