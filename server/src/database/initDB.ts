import mongoose from 'mongoose';
import config from '../config/config.ts';

export function initDB() {
  if (!config.connectionString) {
    console.log(
      "\x1b[31mNo connection string to database. Consider restarting the application.\x1b[0m",
    );
    return;
  }

  mongoose.connect(config.connectionString);
  const con = mongoose.connection;

  try {
    con.on('open', () => {
        console.log('Connected to the database.');
    })
} catch (error) {
    console.log("\x1b[31mError: " + error+'\x1b[0m');
}
}
