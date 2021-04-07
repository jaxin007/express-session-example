import express from 'express';

export class HomeController {
  static getHome(req: express.Request, res: express.Response): express.Response {
    return res.json({
      msg: 'OK',
    });
  }
}
