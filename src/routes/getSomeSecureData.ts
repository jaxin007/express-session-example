import asyncHandler from 'express-async-handler';

import {
  Router,
} from 'express';

import {
  AuthMiddlewareService,
} from '../middlewares';
import {
  GetSomeSecureData,
} from '../controllers';
import {
  UserRoles,
} from '../constants';

export const getSomeSecureData = Router();

getSomeSecureData.get(
  '/data',
  AuthMiddlewareService.authMiddleware(UserRoles.admin),
  asyncHandler(GetSomeSecureData.getSomeSecureData),
);
