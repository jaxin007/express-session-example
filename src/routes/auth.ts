import asyncHandler from 'express-async-handler';

import {
  Router,
} from 'express';

import {
  BadRequest,
} from '../errors';
import {
  AuthHelper,
} from '../helpers';
import {
  AuthMiddlewareService,
} from '../middlewares';
import {
  loginSchema,
  registerSchema,
  validate,
} from '../validation';
import {
  container,
} from '../config/inversify.config';
import {
  TYPES,
} from '../constants';

import {
  AuthServiceInterface,
} from '../interfaces';

export const auth = Router();

auth.post('/register', AuthMiddlewareService.guestMiddleware, asyncHandler(async (req, res) => {
  const authService = container.get<AuthServiceInterface>(TYPES.AuthService); // TODO: refactor

  await validate(registerSchema, req.body);

  await authService.registerUser(req.body);

  return res.json({
    msg: 'OK',
  });
}));

auth.post('/login', AuthMiddlewareService.guestMiddleware, asyncHandler(async (req, res) => {
  const authService = container.get<AuthServiceInterface>(TYPES.AuthService); // TODO: refactor

  await validate(loginSchema, req.body);

  const user = await authService.findUserByLogin(req.body.login);

  if (req.body.login !== user.login || req.body.password !== user.password) {
    throw new BadRequest('Incorrect auth data');
  }

  AuthHelper.logIn(req, user.id);

  res.json({
    msg: 'OK',
  });
}));

auth.post('/logout', AuthMiddlewareService.authMiddleware, asyncHandler(async (req, res) => {
  await AuthHelper.logOut(req, res);

  res.json({
    msg: 'OK',
  });
}));
