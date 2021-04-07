import express from 'express';

import {
  AuthHelper,
} from '../helpers';
import {
  BadRequest,
  Unauthorized,
} from '../errors';
import {
  UserRoles,
} from '../constants';

export class AuthMiddlewareService {
  static guestMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const isLoggedIn = AuthHelper.isLoggedIn(req);

    if (isLoggedIn) {
      return next(new BadRequest('You`re already logged in'));
    }

    return next(null);
  };

  static authMiddleware = (roles: UserRoles | UserRoles[] = UserRoles.user) => (req: express.Request, res: express.Response, next: express.NextFunction): void => {
    const isLoggedIn = AuthHelper.isLoggedIn(req);

    if (!isLoggedIn) {
      return next(new Unauthorized('You`re not logged in'));
    }

    if (req.session.user!.role! === UserRoles.admin) { // we do not need to check is user role correct if he's admin
      return next(null);
    }

    const isRolesList = Array.isArray(roles);

    const isCorrectRole = isRolesList
      ? roles.includes(req.session.user!.role!)
      : roles === req.session.user!.role!;

    if (!isCorrectRole) {
      return next(new Unauthorized(`Wrong role. Required: ${roles} ${isRolesList ? 'roles' : 'role'}.`));
    }

    return next(null);
  };
}
