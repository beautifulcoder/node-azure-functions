const { CosmosClient } = require("@azure/cosmos");

class PizzaDbService {
  constructor() {
    this.client = new CosmosClient(process.env.CosmosDBConnection);
    this.database = this.client.database("pizzadb");
    this.container = this.database.container("pizzas");
    this.initialized = false;
  }

  async initialize() {
    if (this.initialized) {
      return;
    }

    // Create database if it doesn’t exist
    const { database } = await this.client.databases.createIfNotExists({
      id: "pizzadb"
    });

    // Create container if it doesn’t exist
    await database.containers.createIfNotExists({
      id: "pizzas",
      partitionKey: { paths: ["/id"] }
    });

    this.initialized = true;
  }

  async getPizzas() {
    const { resources } = await this.container.items.readAll().fetchAll();

    return resources;
  }

  async getPizza(id) {
    try {
      const { resource } = await this.container.item(id, id).read();

      return resource;
    } catch (error) {
      if (error.code === 404) {
        return null;
      }

      throw error;
    }
  }

  async createPizza(pizza) {
    if (!pizza.id) {
      pizza.id = this.generateId();
    }

    const { resource } = await this.container.items.create(pizza);

    return resource;
  }

  async updatePizza(id, pizza) {
    pizza.id = id; // Ensure ID matches
    const { resource } = await this.container.item(id, id).replace(pizza);

    return resource;
  }

  async deletePizza(id) {
    await this.container.item(id, id).delete();
  }

  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

// Export a singleton instance
const service = new PizzaDbService();
service.initialize().catch(error => {
  console.error("Failed to initialize PizzaDbService:", error);
  throw error;
});

module.exports = service;
