import { request } from 'https';
import app from './app.js';
import config from './config/config.js';
import { initDB } from './database/initDB.js';
import { startBot } from './telegram/bot.js';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

startBot();
initDB();