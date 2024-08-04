import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.OAS3Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Cryptarithm Solver API',
      description:
        'API endpoints for a Cryptarithm solver services documented on swagger',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'Aldi Tri M.',
        email: 'the.aldi.tri@gmail.com',
        url: 'https://github.com/The-Aldi-Tri/cryptarithm-solver',
      },
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://127.0.0.1:3001/',
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/routes/*.{ts,js}'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
