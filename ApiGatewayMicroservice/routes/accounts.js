const Router = require("express").Router();

const { sendRequest } = require("../http-client");

Router.get("/", async (req, res) => {
  console.info(`Forwarding request for get accounts ...`);

  const { token } = req.body;


  const getAccountsRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts`,
    method: "GET",
    data:  {
      token,
    },
  };

  const accounts = await sendRequest(getAccountsRequest);

  res.json(accounts);
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.info(`Forwarding request for get account ${id} ...`);

  const getAccountIdRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/${id}`,
  };

  const account = await sendRequest(getAccountIdRequest);

  res.json(account);
});

Router.get("/client/:id", async (req, res) => {
  const { id } = req.params;

  console.info(`Forwarding request for get accounts of client with id ${id} ...`);

  const getAccountsByClientIdRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/client/${id}`,
  };

  const accounts = await sendRequest(getAccountsByClientIdRequest);

  res.json(accounts);
});

Router.post("/", async (req, res) => {
  const { client_id, iban, balance, currency, type } = req.body;

  const postAccountRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts`,
    method: "POST",
    data: {
      client_id,
      iban,
      balance,
      currency,
      type
    },
  };

  const id = await sendRequest(postAccountRequest);

  res.json({ id });
});

Router.put("/transfer", async (req, res) => {
  const { ibanFrom, ibanTo, balance } = req.body;

  const putAccountRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/transfer`,
    method: "PUT",
    data: {
      ibanFrom,
      ibanTo,
      balance,
    },
  };

  const response = await sendRequest(putAccountRequest);
  res.json({ response });
});

Router.put("/withdraw/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id, balance } = req.body;

  const withdrawAccountRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/withdraw/${iban}`,
    method: "PUT",
    data: {
      client_id,
      balance,
    },
  };

  const response = await sendRequest(withdrawAccountRequest);
  res.json({ response });
});

Router.put("/deposit/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id, balance } = req.body;

  const depositAccountRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/deposit/${iban}`,
    method: "PUT",
    data: {
      client_id,
      balance,
    },
  };

  const response = await sendRequest(depositAccountRequest);
  res.json({ response });
});

Router.delete("/:iban", async (req, res) => {
  const { iban } = req.params;
  const { client_id } = req.body;

  const deleteAccountRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/accounts/${iban}`,
    method: "DELETE",
    data: {
      client_id,
    },
  };

  const response = await sendRequest(deleteAccountRequest);
  res.json({ response });
});

module.exports = Router;
