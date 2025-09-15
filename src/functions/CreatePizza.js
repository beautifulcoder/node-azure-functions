const { app } = require("@azure/functions");
const { createPizzaHandler } = require("../handlers/createPizzaHandler.js");

app.http("CreatePizza", {
  methods: ["POST"],
  authLevel: "anonymous",
  route: "pizzas",
  handler: createPizzaHandler
});
