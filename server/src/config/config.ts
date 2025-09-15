import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  host:string;
  nodeEnv: string;
  connectionString: string | undefined;
  botToken: string | undefined;
  secretPassword: string;
  RTP: number;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || "telegram-gift-bot-3jp7.onrender.com",
  nodeEnv: process.env.NODE_ENV || 'development',
  connectionString: process.env.CONNECTION_STRING,
  botToken: process.env.BOT_TOKEN,
  secretPassword: process.env.SECRET_PASSWORD || 'Egorprivet123',
  RTP: Number(process.env.RTP) || 0.75,
};

export default config;