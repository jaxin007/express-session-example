import {
  envConfig,
} from './src/config';

export = {
  type: 'postgres',
  host: envConfig.PGHOST,
  port: envConfig.PGPORT,
  username: envConfig.PGUSER,
  password: envConfig.PGPASSWORD,
  database: 'postgres',
  synchronize: false,
  logging: true,
  entities: [
    'src/entities/**/*.ts',
  ],
  migrations: [
    'src/migration/**/*.ts',
  ],
  subscribers: [
    'src/subscriber/**/*.ts',
  ],
  factories: [
    'src/factories/**/*.ts',
  ],
  seeds: [
    'src/seeds/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
