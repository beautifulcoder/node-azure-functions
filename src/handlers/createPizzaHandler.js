const { pizzaSchema } = require("../models/pizzaModel.js");
const pizzaDbService = require("../services/pizzaDbService.js");
const { createJsonResponse, handleError } = require("../utils/httpUtils.js");

const createPizzaHandler = async (request, context) => {
  try {
    const pizza = await request.json();

    const { error } = pizzaSchema.validate(pizza);
    if (error) {
      return createJsonResponse(400, { error });
    }

    if (pizza.id) {
      const existingPizza = await pizzaDbService.getPizza(pizza.id);
      if (existingPizza) {
        return createJsonResponse(409, { error: "Pizza with this ID already exists" });
      }
    }

    const result = await pizzaDbService.createPizza(pizza);

    return createJsonResponse(201, result);
  } catch (error) {
    return handleError(context, "Error creating pizza:", error);
  }
};

module.exports = { createPizzaHandler };
