const { CosmosClient } = require("@azure/cosmos");

class PizzaDbService {
  constructor() {
    this.container = null;
    this.initialized = false;
    this.initializationPromise = null;
  }

  async initialize() {
    if (this.initializationPromise) {
      // Return the existing initialization promise if already in progress
      return this.initializationPromise;
    }

    this.initializationPromise = this._performInitialization();
    return this.initializationPromise;
  }

  async _performInitialization() {
    if (this.initialized) {
      return;
    }

    try {
      // Initialize the CosmosDB client
      const client = new CosmosClient(process.env.CosmosDBConnection);

      // Create database if it doesn't exist
      const { database } = await client.databases.createIfNotExists({
        id: "pizzadb"
      });

      // Create container if it doesn't exist
      const { container } = await database.containers.createIfNotExists({
        id: "pizzas",
        partitionKey: { paths: ["/id"] }
      });

      this.container = container;
      this.initialized = true;

      console.log("PizzaDbService initialized successfully");
    } catch (error) {
      console.error("Failed to initialize PizzaDbService:", error);
      // Reset the promise so initialization can be retried
      this.initializationPromise = null;
      throw error;
    }
  }

  async getPizzas() {
    await this.initialize();
    const { resources } = await this.container.items.readAll().fetchAll();
    return resources;
  }

  async getPizza(id) {
    await this.initialize();
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
    await this.initialize();
    if (!pizza.id) {
      pizza.id = this.generateId();
    }

    const { resource } = await this.container.items.create(pizza);
    return resource;
  }

  async updatePizza(id, pizza) {
    await this.initialize();
    pizza.id = id; // Ensure ID matches
    const { resource } = await this.container.item(id, id).replace(pizza);
    return resource;
  }

  async deletePizza(id) {
    await this.initialize();
    await this.container.item(id, id).delete();
  }

  generateId() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }
}

// Export a singleton instance
const service = new PizzaDbService();

module.exports = service;
