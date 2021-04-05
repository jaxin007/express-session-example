import 'express-session';

declare module 'express-session' {
    interface SessionData {
      createdAt?: number,
      userId?: number,
    }
}
