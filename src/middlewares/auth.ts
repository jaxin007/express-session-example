import express from 'express';

import {
  AuthHelper,
} from '../helpers';
import {
  BadRequest,
  Unauthorized,
} from '../errors';

export class AuthMiddlewareService {
  static guestMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (AuthHelper.isLoggedIn(req)) {
      return next(new BadRequest('You`re already logged in'));
    }

    return next(null);
  };

  static authMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    if (!AuthHelper.isLoggedIn(req)) {
      return next(new Unauthorized('You`re not logged in'));
    }

    return next(null);
  };
}
