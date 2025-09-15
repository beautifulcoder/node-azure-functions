const { app } = require("@azure/functions");
const { updatePizzaHandler } = require("../handlers/updatePizzaHandler.js");

app.http("UpdatePizza", {
  methods: ["PUT"],
  authLevel: "anonymous",
  route: "pizzas/{id}",
  handler: updatePizzaHandler
});
