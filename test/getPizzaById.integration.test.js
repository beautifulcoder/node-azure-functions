const { expect } = require("chai");
const { getPizzaByIdHandler } = require("../src/handlers/getPizzaByIdHandler");

const pizzaDbService = require("../src/services/pizzaDbService");

beforeEach(async () => {
  const allPizzas = await pizzaDbService.getPizzas();
  for (const pizza of allPizzas) {
    await pizzaDbService.deletePizza(pizza.id);
  }
});

describe("GetPizzaById Integration Tests", () => {
  describe("GET /api/pizzas/{id}", () => {
    it("should return 200 and the pizza when it exists", async () => {
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

      const response = await getPizzaByIdHandler(request, context);

      expect(response.status).to.equal(200);
    });

    it("should return 404 when pizza does not exist", async () => {
      const request = {
        params: { id: "non-existent-pizza" }
      };

      const context = {};

      const response = await getPizzaByIdHandler(request, context);

      expect(response.status).to.equal(404);
    });
  });
});
