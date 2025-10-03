const { pizzaSchema } = require("../models/pizzaModel.js");
const { createJsonResponse, handleError } = require("../utils/httpUtils.js");
const pizzaDbService = require("../services/pizzaDbService.js");

const updatePizzaHandler = async (request, context) => {
  try {
    const { id } = request.params;
    const pizza = await request.json();

    const { error } = pizzaSchema.validate(pizza);
    if (error) {
      return createJsonResponse(400, { error });
    }

    const currentPizza = await pizzaDbService.getPizza(id);
    if (!currentPizza) {
      return createJsonResponse(404, { error: "Pizza not found" });
    }

    const result = await pizzaDbService.updatePizza(id, pizza);

    return createJsonResponse(200, result);
  } catch (error) {
    return handleError(context, "Error updating pizza:", error);
  }
};

module.exports = { updatePizzaHandler };
