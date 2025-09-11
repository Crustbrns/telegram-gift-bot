import express from 'express';
import prizeRoutes from './routes/prizeRoutes.ts';
import rollRoutes from './routes/rollRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';
import config from './config/config.ts';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with {type: "json"};

const app = express();

app.use(express.json());

if (config.nodeEnv == 'development') {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use('/api/prizes', prizeRoutes);
app.use('/api/roll', rollRoutes);

app.use(errorHandler);

export default app;
