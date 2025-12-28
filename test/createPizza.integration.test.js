const { expect } = require("chai");
const { createPizzaHandler } = require("../src/handlers/createPizzaHandler");

const pizzaDbService = require("../src/services/pizzaDbService");

beforeEach(async () => {
  const allPizzas = await pizzaDbService.getPizzas();
  for (const pizza of allPizzas) {
    await pizzaDbService.deletePizza(pizza.id);
  }
});

describe("CreatePizza Integration Tests", () => {
  describe("POST /api/pizzas", () => {
    it("should return 201 and create a pizza with valid data", async () => {
      const newPizza = {
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      const request = {
        json: async () => newPizza
      };

      const context = {};

      const response = await createPizzaHandler(request, context);

      expect(response.status).to.equal(201);
    });

    it("should return 201 and create a pizza with a custom id", async () => {
      const newPizza = {
        id: "custom-pizza-id",
        name: "Pepperoni",
        size: "large",
        ingredients: ["tomato", "mozzarella", "pepperoni"],
        price: 15.99
      };

      const request = {
        json: async () => newPizza
      };

      const context = {};

      const response = await createPizzaHandler(request, context);

      expect(response.status).to.equal(201);
    });

    it("should return 400 when pizza data is invalid", async () => {
      const invalidPizza = {
        name: "Invalid Pizza",
        size: "invalid-size",
        ingredients: ["tomato"],
        price: -5
      };

      const request = {
        json: async () => invalidPizza
      };

      const context = {};

      const response = await createPizzaHandler(request, context);

      expect(response.status).to.equal(400);
    });

    it("should return 409 when pizza with same id already exists", async () => {
      const existingPizza = {
        id: "duplicate-pizza",
        name: "Margherita",
        size: "medium",
        ingredients: ["tomato", "mozzarella", "basil"],
        price: 12.99
      };

      await pizzaDbService.createPizza(existingPizza);

      const request = {
        json: async () => existingPizza
      };

      const context = {};

      const response = await createPizzaHandler(request, context);

      expect(response.status).to.equal(409);
    });
  });
});
