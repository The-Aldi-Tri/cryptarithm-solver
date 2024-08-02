const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Cryptarithm Solver API",
    description:
      "API endpoints for a Cryptarithm solver services documented on swagger",
    license: {
      name: "Licensed Under MIT",
      url: "https://spdx.org/licenses/MIT.html",
    },
    contact: {
      name: "Aldi Tri M.",
      email: "the.aldi.tri@gmail.com",
      url: "https://github.com/The-Aldi-Tri/cryptarithm-solver",
    },
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3001/",
      description: "Local server",
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files containing OpenAPI definitions from root directory project
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
