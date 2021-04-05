import express,
{
  Request,
  Response,
} from 'express';

export class AuthHelper {
  static isLoggedIn(req: express.Request): boolean {
    return !!req.session.userId;
  }

  static logIn(req: Request, userId: number): void {
    const hourInMillis = 360000;

    req.session.cookie.expires = new Date(Date.now() + hourInMillis);
    req.session.userId = userId;
    req.session.createdAt = Date.now();
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
}
