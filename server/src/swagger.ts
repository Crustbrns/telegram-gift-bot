import swaggerAutogen from 'swagger-autogen';
import config from './config/config.ts';

const doc = {
  info: {
    title: 'GIFT BOT API',
    description: 'API for gift bot'
  },
  host: config.host
};

const swaggerFile = './swagger-output.json';
const routes = ['./app.ts'];

swaggerAutogen()(swaggerFile, routes, doc);