import {
  createConnection,
} from 'typeorm';

import {
  envConfig,
  store,
} from './config';
import {
  createApp,
} from './index';

(async () => {
  await createConnection();

  const app = createApp(store);

  app.listen(envConfig.PORT, () => console.log(`Server listened on port ${envConfig.PORT}`));
})();
