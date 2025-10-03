const { app } = require("@azure/functions");
const { getPizzaByIdHandler } = require("../handlers/getPizzaByIdHandler.js");

app.http("GetPizzaById", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "pizzas/{id}",
  handler: getPizzaByIdHandler
});
