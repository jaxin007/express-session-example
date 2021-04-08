import asyncHandler from 'express-async-handler';

import {
  Router,
} from 'express';

import {
  AuthMiddlewareService,
  validate,
} from '../middlewares';
import {
  loginSchema,
  registerSchema,
} from '../validation';
import {
  AuthController,
} from '../controllers';

export const auth = Router();

auth.post(
  '/register',
  AuthMiddlewareService.guestMiddleware,
  asyncHandler(validate({
    body: registerSchema,
  })),
  asyncHandler(AuthController.register),
);

auth.post(
  '/login',
  AuthMiddlewareService.guestMiddleware,
  asyncHandler(validate({
    body: loginSchema,
  })),
  asyncHandler(AuthController.login),
);

auth.post(
  '/logout',
  AuthMiddlewareService.authMiddleware(),
  asyncHandler(AuthController.logOut),
);

auth.post(
  '/logout-other-sessions',
  AuthMiddlewareService.authMiddleware(),
  asyncHandler(AuthController.terminateOtherSessions),
);
