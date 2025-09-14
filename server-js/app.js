import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import swaggerFile from './swagger/swagger-output.json' with { type: 'json' };
import swaggerUi from 'swagger-ui-express';
import config from './config/config.js';
import { errorHandler } from './middlewares/errorHandler.js';
import prizeRoutes from './routes/prizeRoutes.js';
import rollRoutes from './routes/rollRoutes.js';
import { startBot } from './telegram/bot.js';
import { initDB } from './database/initDB.js';

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.get('/', (req, res) =>
  res.send('Congratulation 🎉🎉! Our Express server is Running on Vercel'),
);

if (config.nodeEnv == 'development') {
  app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));
}

app.use('/api/prizes', prizeRoutes);
app.use('/api/rolls', rollRoutes);

app.use(errorHandler);

app.listen(config.port, () => {
  startBot();
  initDB();
  console.log(`Server running on port ${config.port}`);
});

export default app;
