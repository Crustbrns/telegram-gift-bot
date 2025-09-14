import dotenv from 'dotenv';
import process from 'process';

dotenv.config();

const config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  connectionString: process.env.CONNECTION_STRING,
  botToken: process.env.BOT_TOKEN,
  secretPassword: process.env.SECRET_PASSWORD || 'Egorprivet123',
  RTP: Number(process.env.RTP) || 0.75,
};

export default config;