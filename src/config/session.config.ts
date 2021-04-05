import {
  SessionOptions,
} from 'express-session';
import {
  envConfig,
} from './env.config';

export const sessionConfig: SessionOptions = {
  secret: envConfig.REDIS_SECRET,
  resave: false,
  saveUninitialized: false,
};
