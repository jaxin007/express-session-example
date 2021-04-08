import {
  Router,
} from 'express';

import {
  HomeController,
} from '../controllers';

export const home = Router();

home.get(
  '/',
  HomeController.getHome,
);
