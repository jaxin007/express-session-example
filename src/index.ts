import express from 'express';
import bodyParser from 'body-parser';
import session, {
  Store,
} from 'express-session';

import {
  auth,
  getSomeSecureData,
  home,
} from './routes';
import {
  HttpError,
} from './errors';

import {
  sessionConfig,
} from './config';

export const createApp = (store: Store, conn: any): express.Application => {
  const app = express();

  app.use(bodyParser.json());

  app.use(bodyParser.urlencoded({
    extended: true,
  }));

  app.use(session({
    ...sessionConfig,
    store,
  }));

  app.use('/api/auth', auth);

  app.use('/api/home', home);

  app.use('/api/secure', getSomeSecureData);

  app.use((err: HttpError, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(err.status || 500).json({
      errMessage: err?.detail || err.message,
    });
  });

  return app;
};
