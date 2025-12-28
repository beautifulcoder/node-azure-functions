const { expect } = require("chai");
const { getPizzasHandler } = require("../src/handlers/getPizzasHandler");

const pizzaDbService = require("../src/services/pizzaDbService");

beforeEach(async () => {
  const allPizzas = await pizzaDbService.getPizzas();
  for (const pizza of allPizzas) {
    await pizzaDbService.deletePizza(pizza.id);
  }
});

describe("GetPizzas Integration Tests", () => {
  describe("GET /api/pizzas", () => {
    it("should return 200 and an empty array when no pizzas exist", async () => {
      const request = {};
      const context = {};

      const response = await getPizzasHandler(request, context);

      expect(response.status).to.equal(200);
    });

    it("should return 200 and all pizzas when pizzas exist", async () => {
      const testPizza1 = {
        id: "test-pizza-1",
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      const testPizza2 = {
        id: "test-pizza-2",
        name: "Pepperoni",
        size: "large",
        ingredients: ["tomato", "mozzarella", "pepperoni"],
        price: 15.99
      };

      await pizzaDbService.createPizza(testPizza1);
      await pizzaDbService.createPizza(testPizza2);

      const request = {};
      const context = {};

      const response = await getPizzasHandler(request, context);

      expect(response.status).to.equal(200);
    });
  });
});
