const pizzaDbService = require("../services/pizzaDbService.js");
const { createJsonResponse, handleError } = require("../utils/httpUtils.js");

const getPizzasHandler = async (_request, context) => {
  try {
    const pizzas = await pizzaDbService.getPizzas();

    return createJsonResponse(200, pizzas);
  } catch (error) {
    return handleError(context, "Error getting pizzas:", error);
  }
};

module.exports = { getPizzasHandler };
