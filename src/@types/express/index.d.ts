import 'express-session';

import {
  UserRoles,
} from '../../constants';

declare module 'express-session' {
    interface SessionData {
      user: {
        createdAt?: number,
        id?: number,
        role?: UserRoles,
      }
    }
}
