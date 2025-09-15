const { app } = require("@azure/functions");
const { deletePizzaHandler } = require("../handlers/deletePizzaHandler.js");

app.http("DeletePizza", {
  methods: ["DELETE"],
  authLevel: "anonymous",
  route: "pizzas/{id}",
  handler: deletePizzaHandler
});
