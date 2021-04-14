import {
  EnvConfigInterfase,
} from '../interfaces';

export const envConfig: EnvConfigInterfase = {
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:8080',

  PORT: Number.parseInt(process.env.PORT || '3000', 10),

  PGDATABASE: process.env.PGDATABASE || 'postgres',
  PGHOST: process.env.PGHOST || 'localhost',
  PGPORT: Number.parseInt(process.env.PGPORT || '3300', 10),
  PGUSER: process.env.PGUSER || 'postgres',
  PGPASSWORD: process.env.PGPASSWORD || 'secret',
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD || 'secret',

  REDIS_HOST: process.env.REDIS_HOST || 'localhost',
  REDIS_SECRET: process.env.REDIS_SECRET || 'secret',
  REDIS_PORT: Number.parseInt(process.env.REDIS_PORT || '6379', 10),

  SESSION_LIFE_TIME: Number.parseInt(process.env.SESSION_LIFE_TIME || '360000', 10),
};
