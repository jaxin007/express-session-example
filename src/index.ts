import express from 'express';
import bodyParser from 'body-parser';
import session, {
  Store,
} from 'express-session';

import {
  EntityNotFoundError,
} from 'typeorm';
import {
  auth,
  getSomeSecureData,
  home,
} from './routes';
import {
  HttpError,
  ValidationError,
} from './errors';

import {
  sessionConfig,
} from './config';

export const createApp = (store: Store): express.Application => {
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
    if (err instanceof ValidationError) {
      return res.status(err.status).json({
        errMessage: err.validationErrors,
      });
    }

    if (err instanceof EntityNotFoundError) {
      return res.status(404).json({
        errMessage: err.message,
      });
    }

    return res.status(err.status || 500).json({
      errMessage: err?.detail || err.message,
    });
  });

  return app;
};
