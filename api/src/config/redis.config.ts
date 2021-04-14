import redis, {
  RedisClient,
} from 'redis';
import connectRedis, {
  RedisStore,
} from 'connect-redis';
import session from 'express-session';
import {
  envConfig,
} from './env.config';

export const redisClient = (): RedisClient => redis.createClient({
  host: envConfig.REDIS_HOST,
  port: envConfig.REDIS_PORT,
});

const RedisStorage = connectRedis(session);

export const store = (): RedisStore => new RedisStorage({
  client: redisClient(),
});
