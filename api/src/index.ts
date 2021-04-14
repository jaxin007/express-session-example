import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
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
  envConfig,
  sessionConfig,
} from './config';

export const app = express();

export const createApp = (store: Store): express.Application => {
  app.use(cors({
    origin: envConfig.CLIENT_URL,
    credentials: true,
  }));

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
      return res.status(404).json();
    }

    return res.status(err.status || 500).json({
      errMessage: err?.detail || err.message,
    });
  });

  return app;
};
