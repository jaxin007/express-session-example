import redis from 'redis';
import connectRedis from 'connect-redis';
import session from 'express-session';

import {
  createConnection,
} from 'typeorm';

import {
  envConfig,
} from './config';
import {
  createApp,
} from './index';

(async () => {
  const conn = await createConnection();

  const client = redis.createClient();

  const RedisStorage = connectRedis(session);

  const store = new RedisStorage({
    client,
  });

  const app = createApp(store, conn);

  app.listen(envConfig.PORT, () => console.log(`Server listened on port ${envConfig.PORT}`));
})();
