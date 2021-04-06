import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

export const redisClient = redis.createClient();

const RedisStorage = connectRedis(session);

export const store = new RedisStorage({
  client: redisClient,
});
