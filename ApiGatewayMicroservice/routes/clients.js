const Router = require("express").Router();

const { sendRequest } = require("../http-client");

Router.get("/", async (req, res) => {
  console.log("########## GATEWAY GET CLIENTS #############");
  console.info(`#$%^&Forwarding request for get clients ...`);


  const getClientsRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/clients`,
  };

  const clients = await sendRequest(getClientsRequest);

  res.json(clients);
});

Router.get("/:id", async (req, res) => {
  const { id } = req.params;

  console.info(`Forwarding request for get client ${id} ...`);

  const getClientIdRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/clients/${id}`,
  };

  const client = await sendRequest(getClientIdRequest);

  res.json(client);
});

Router.post("/", async (req, res) => {
  const { username, password, email } = req.body;

  const postClientRequest = {
    url: `http://${process.env.CLIENTS_SERVICE_API_ROUTE}/clients`,
    method: "POST",
    data: {
      username,
      password,
      email
    },
  };
  console.log("Vlad e in post in gateway in clients");
  const id = await sendRequest(postClientRequest);

  res.json({ id });
});

module.exports = Router;
