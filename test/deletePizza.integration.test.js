const { expect } = require("chai");
const { deletePizzaHandler } = require("../src/handlers/deletePizzaHandler");

const pizzaDbService = require("../src/services/pizzaDbService");

beforeEach(async () => {
  const allPizzas = await pizzaDbService.getPizzas();
  for (const pizza of allPizzas) {
    await pizzaDbService.deletePizza(pizza.id);
  }
});

describe("DeletePizza Integration Tests", () => {
  describe("DELETE /api/pizzas/{id}", () => {
    it("should return 204 when pizza is successfully deleted", async () => {
      const testPizza = {
        id: "test-pizza-1",
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      await pizzaDbService.createPizza(testPizza);

      const request = {
        params: { id: "test-pizza-1" }
      };

      const context = {};

      const response = await deletePizzaHandler(request, context);

      expect(response.status).to.equal(204);
    });

    it("should return 404 when pizza does not exist", async () => {
      const request = {
        params: { id: "non-existent-pizza" }
      };

      const context = {};

      const response = await deletePizzaHandler(request, context);

      expect(response.status).to.equal(404);
    });
  });
});
