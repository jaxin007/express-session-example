import {
  Container,
} from 'inversify';

import {
  TYPES,
} from '../constants';

import {
  AuthService,
} from '../services';

import {
  AuthServiceInterface,
} from '../interfaces';

export const container = new Container();

container.bind<AuthServiceInterface>(TYPES.AuthService).to(AuthService);
