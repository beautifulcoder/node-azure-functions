const { createJsonResponse, handleError } = require("../utils/httpUtils.js");
const pizzaDbService = require("../services/pizzaDbService.js");

const deletePizzaHandler = async (request, context) => {
  try {
    const { id } = request.params;

    const existingPizza = await pizzaDbService.getPizza(id);
    if (!existingPizza) {
      return createJsonResponse(404, { error: "Pizza not found" });
    }

    await pizzaDbService.deletePizza(id);

    return createJsonResponse(204);
  } catch (error) {
    return handleError(context, "Error deleting pizza:", error);
  }
};

module.exports = { deletePizzaHandler };
