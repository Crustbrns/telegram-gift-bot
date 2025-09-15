import swaggerAutogen from 'swagger-autogen';
import config from './config/config.js';

const doc = {
  info: {
    title: 'GIFT BOT API',
    description: 'API for gift bot',
  },
  host: config.host,
};

const swaggerFile = './swagger-output.json';
const routes = ['./app.js'];

swaggerAutogen()(swaggerFile, routes, doc);
