const { GenericContainer, Wait } = require("testcontainers");

let container = null;

async function startContainer() {
  console.log("Starting CosmosDB Emulator container...");

  container = await new GenericContainer("mcr.microsoft.com/cosmosdb/linux/azure-cosmos-emulator:latest")
    .withExposedPorts({ container: 8081, host: 8081 })
    .withExposedPorts({ container: 10250, host: 10250 })
    .withExposedPorts({ container: 10251, host: 10251 })
    .withExposedPorts({ container: 10252, host: 10252 })
    .withExposedPorts({ container: 10253, host: 10253 })
    .withExposedPorts({ container: 10254, host: 10254 })
    .withExposedPorts({ container: 10255, host: 10255 })
    .withEnvironment({
      "AZURE_COSMOS_EMULATOR_PARTITION_COUNT": "1",
      "AZURE_COSMOS_EMULATOR_ENABLE_DATA_PERSISTENCE": "false",
      "AZURE_COSMOS_EMULATOR_IP_ADDRESS_OVERRIDE": "127.0.0.1"
    })
    .withWaitStrategy(Wait.forLogMessage(/Started/))
    .withStartupTimeout(120000)
    .start();

  const host = container.getHost();
  const port = 8081;
  const endpoint = `https://${host}:${port}`;
  const key = "C2y6yDjf5/R+ob0N8A7Cgv30VRDJIWEHLM+4QDU5DE2nQ9nDuVTqobD4b8mGGyPMbIZnqyMsEcaGQy67XIw/Jw==";

  // Output connection string for tests to use
  const connectionString = `AccountEndpoint=${endpoint};AccountKey=${key};`;
  console.log("\n=== COSMOS DB CONNECTION INFO ===");
  console.log(`Connection String: ${connectionString}`);
  console.log("\nBefore running tests, verify the emulator is ready:");
  console.log(`  curl -i -k https://${host}:${port}/_explorer/emulator.pem`);
  console.log("=================================\n");

  // Set environment variables for tests
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // Disable TLS verification for emulator
  process.env.CosmosDBConnection = connectionString;

  console.log("Container started, logs show 'Started' message");
  console.log("Waiting 90 seconds for emulator to be fully ready...");

  await new Promise((resolve) => setTimeout(resolve, 90000));

  console.log("Wait complete, emulator should be ready");
}

async function stopContainer() {
  if (container) {
    await container.stop();
  }
}

// Mocha global hooks
exports.mochaGlobalSetup = async function() {
  await startContainer();
};

exports.mochaGlobalTeardown = async function() {
  await stopContainer();
};
