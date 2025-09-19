import express from 'express';
import prizeRoutes from './routes/prizeRoutes.js';
import rollRoutes from './routes/rollRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import config from './config/config.js';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger-output.json' with { type: 'json' };
import cors from 'cors';
// import slowDown from 'express-slow-down';
import morgan from "morgan";
import pingRoute from './routes/pingRoute.js';
// import helmet from 'helmet';

const app = express();
app.use(express.json());
app.use(morgan("dev"));
// app.use(helmet());
app.use(cors());//change origin in future

// const limiter = slowDown({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   delayAfter: 50, // Allow 50 requests per 15 minutes.
//   delayMs: (hits) => hits * 100, // Add 100 ms of delay to every request after the 50th one.
// });
// app.use(limiter);

if (config.nodeEnv == 'development') {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use('/api/prizes', prizeRoutes);
app.use('/api/rolls', rollRoutes);
app.use('/ping', pingRoute);

app.use(errorHandler);

export default app;
