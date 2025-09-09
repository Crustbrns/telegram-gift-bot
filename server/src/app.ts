import express from 'express';
import itemRoutes from './routes/prizeRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();

app.use(express.json());

// Routes
app.use('/api/prizes', itemRoutes);

// Global error handler (should be after routes)
app.use(errorHandler);

export default app;