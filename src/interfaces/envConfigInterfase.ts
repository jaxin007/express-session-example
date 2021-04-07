/* eslint-disable typescript-sort-keys/interface */
export interface EnvConfigInterfase {
  PORT: number;

  PGDATABASE: string,
  PGHOST:string;
  PGPASSWORD: string,
  PGPORT: number,
  PGUSER: string,
  POSTGRES_PASSWORD: string;

  REDIS_HOST: string;
  REDIS_PORT: number;
  REDIS_SECRET: string;

  SESSION_LIFE_TIME: number;
}
