import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'GIFT BOT API',
    description: 'API for gift bot'
  },
};

const swaggerFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen()(swaggerFile, routes, doc);