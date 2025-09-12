import app from './app.ts';
import config from './config/config.ts';
import { initDB } from './database/initDB.ts';
import { startBot } from './telegram/bot.ts';

app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});

startBot();
initDB();