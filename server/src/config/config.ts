import dotenv from 'dotenv';

dotenv.config();

interface Config {
  port: number;
  host: string;
  nodeEnv: string;
  connectionString: string | undefined;
  botToken: string | undefined;
  secretPassword: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  host: process.env.HOST || 'localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
  connectionString: process.env.CONNECTION_STRING,
  botToken: process.env.BOT_TOKEN,
  secretPassword: process.env.SECRET_PASSWORD || 'Egorprivet123',
};

export default config;