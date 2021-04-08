import express, {
  Request,
  Response,
} from 'express';
import bcrypt from 'bcrypt';

import {
  envConfig,
} from '../config';

import {
  LoginUserModel,
} from '../models';

export class AuthHelper {
  static isLoggedIn(req: express.Request): boolean {
    return !!req.session.user?.id;
  }

  static logIn(req: Request, userData: LoginUserModel): void {
    req.session.user = {
      ...userData,
      createdAt: Date.now(),
    };

    req.session.cookie.expires = new Date(Date.now() + envConfig.SESSION_LIFE_TIME);
  }

  static async logOut(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject): void => {
      req.session.destroy((err) => {
        if (err) {
          reject(err);
        }

        resolve();
      });
    });
  }

  static async hashData(data: string, saltOrRounds: number | string = 10): Promise<string> {
    return bcrypt.hash(data, saltOrRounds);
  }

  static async compareData(data: string, hashToCompare: string): Promise<boolean> {
    return bcrypt.compare(data, hashToCompare);
  }
}
