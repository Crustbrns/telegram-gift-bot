import swaggerAutogen from 'swagger-autogen';
// @ts-ignore
import config from './config/config.ts';

const doc = {
  info: {
    title: 'GIFT BOT API',
    description: 'API for gift bot',
  },
  host: config.host,
  schemes: ['https'],
};

if (config.host.includes('localhost')) {
  doc.schemes = ['http'];
}

const swaggerFile = './swagger-output.json';
const routes = ['./app.ts'];

swaggerAutogen()(swaggerFile, routes, doc);
