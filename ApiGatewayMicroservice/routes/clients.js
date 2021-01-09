const Router = require("express").Router();

const { sendRequest } = require("../http-client");

Router.get("/", async (req, res) => {

  console.info(`Forwarding request for get clients ...`);
  const token = req.headers.authorization.split(" ")[1];

  const getClientsRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/clients`,
    headers: {
      authorization: token,
    },method: "GET",

  };

  const clients = await sendRequest(getClientsRequest);

  res.json(clients);
});

Router.get("/:id", async (req, res) => {

  const token = req.headers.authorization.split(" ")[1];
  const { id } = req.params;

  console.info(`Forwarding request for get client with id ${id} ...`);

  const getClientIdRequest = {
    url: `http://${process.env.BUSINESS_LOGIC_SERVICE_API_ROUTE}/clients/${id}`,
    headers: {
      authorization: token,
    },
  };

  const client = await sendRequest(getClientIdRequest);

  res.json(client);
});

module.exports = Router;
