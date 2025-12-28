const { expect } = require("chai");
const { updatePizzaHandler } = require("../src/handlers/updatePizzaHandler");

const pizzaDbService = require("../src/services/pizzaDbService");

beforeEach(async () => {
  const allPizzas = await pizzaDbService.getPizzas();
  for (const pizza of allPizzas) {
    await pizzaDbService.deletePizza(pizza.id);
  }
});

describe("UpdatePizza Integration Tests", () => {
  describe("PUT /api/pizzas/{id}", () => {
    it("should return 200 when pizza is successfully updated", async () => {
      const testPizza = {
        id: "test-pizza-1",
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      await pizzaDbService.createPizza(testPizza);

      const updatedPizza = {
        name: "Margherita Deluxe",
        size: "large",
        ingredients: ["tomato", "mozzarella", "basil", "parmesan"],
        price: 15.99
      };

      const request = {
        params: { id: "test-pizza-1" },
        json: async () => updatedPizza
      };

      const context = {};

      const response = await updatePizzaHandler(request, context);

      expect(response.status).to.equal(200);
    });

    it("should return 404 when pizza does not exist", async () => {
      const updatedPizza = {
        name: "Non-existent Pizza",
        size: "medium",
        ingredients: ["tomato", "mozzarella"],
        price: 12.99
      };

      const request = {
        params: { id: "non-existent-pizza" },
        json: async () => updatedPizza
      };

      const context = {};

      const response = await updatePizzaHandler(request, context);

      expect(response.status).to.equal(404);
    });

    it("should return 400 when pizza data is invalid", async () => {
      const testPizza = {
        id: "test-pizza-1",
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      await pizzaDbService.createPizza(testPizza);

      const invalidPizza = {
        name: "Invalid Pizza",
        size: "invalid-size",
        ingredients: ["tomato"],
        price: -5
      };

      const request = {
        params: { id: "test-pizza-1" },
        json: async () => invalidPizza
      };

      const context = {};

      const response = await updatePizzaHandler(request, context);

      expect(response.status).to.equal(400);
    });
  });
});
