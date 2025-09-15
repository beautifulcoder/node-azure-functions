const { app } = require("@azure/functions");
const { httpExampleHandler } = require("../handlers/httpExampleHandler.js");

app.http("HttpExample", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: httpExampleHandler
});
