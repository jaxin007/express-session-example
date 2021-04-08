import redis, {
  RedisClient,
} from 'redis';
import connectRedis, {
  RedisStore,
} from 'connect-redis';
import session from 'express-session';

export const redisClient = (): RedisClient => redis.createClient();

const RedisStorage = connectRedis(session);

export const store = (): RedisStore => new RedisStorage({
  client: redisClient(),
});
