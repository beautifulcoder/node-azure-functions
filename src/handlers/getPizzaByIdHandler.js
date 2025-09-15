const pizzaDbService = require("../services/pizzaDbService.js");
const { createJsonResponse, handleError } = require("../utils/httpUtils.js");

const getPizzaByIdHandler = async (request, context) => {
  try {
    const { id } = request.params;
    const pizza = await pizzaDbService.getPizza(id);

    if (!pizza) {
      return createJsonResponse(404, { error: "Pizza not found" });
    }

    return createJsonResponse(200, pizza);
  } catch (error) {
    return handleError(context, "Error getting pizza:", error);
  }
};

module.exports = { getPizzaByIdHandler };
