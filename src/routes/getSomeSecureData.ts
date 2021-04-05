import {
  Router,
} from 'express';

import {
  AuthMiddlewareService,
} from '../middlewares';

export const getSomeSecureData = Router();

getSomeSecureData.get('/data', AuthMiddlewareService.authMiddleware, (req, res) => {
  const secureMockData = {
    message: 'OK',
  };

  return res.status(200).json(secureMockData);
});
