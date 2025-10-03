const { app } = require("@azure/functions");
const { getPizzasHandler } = require("../handlers/getPizzasHandler.js");

app.http("GetPizzas", {
  methods: ["GET"],
  authLevel: "anonymous",
  route: "pizzas",
  handler: getPizzasHandler
});
