import express from 'express';

import {
  container,
} from '../config/inversify.config';
import {
  TYPES,
} from '../constants';
import {
  BadRequest,
} from '../errors';
import {
  AuthHelper,
} from '../helpers';
import {
  redisClient,
} from '../config';

import {
  AuthServiceInterface,
} from '../interfaces';

export class AuthController {
  static async register(req: express.Request, res: express.Response): Promise<express.Response> {
    const authService = container.get<AuthServiceInterface>(TYPES.AuthService); // TODO: refactor

    const hashedPassword = await AuthHelper.hashData(req.body.password);

    await authService.registerUser({
      ...req.body,
      password: hashedPassword,
    });

    return res.json({
      msg: 'OK',
    });
  }

  static async login(req: express.Request, res: express.Response): Promise<express.Response> {
    const authService = container.get<AuthServiceInterface>(TYPES.AuthService); // TODO: refactor

    const user = await authService.findUserByLogin(req.body.login, true);

    const isPasswordCorrect = await AuthHelper.compareData(req.body.password, user!.password);

    if (req.body.login !== user?.login || !isPasswordCorrect) {
      throw new BadRequest('Incorrect auth data');
    }

    AuthHelper.logIn(req, user!);

    await authService.assignSessionIdToUser(req.session.user!.id!, req.sessionID);

    return res.json({
      msg: 'OK',
    });
  }

  static async logOut(req: express.Request, res: express.Response): Promise<express.Response> {
    await AuthHelper.logOut(req, res);

    return res.json({
      msg: 'OK',
    });
  }

  static async terminateOtherSessions(req: express.Request, res: express.Response): Promise<express.Response> {
    const authService = container.get<AuthServiceInterface>(TYPES.AuthService); // TODO: refactor

    const otherSessions = await authService.terminateAllOtherSessions(req.session.user!.id!, req.sessionID);

    otherSessions.forEach((sessionId) => redisClient.del(`sess:${sessionId.sessionId}`));

    return res.json({
      msg: 'OK',
    });
  }
}
