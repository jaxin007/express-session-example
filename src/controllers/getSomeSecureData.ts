import express from 'express';

export class GetSomeSecureData {
  static getSomeSecureData(req: express.Request, res: express.Response): express.Response {
    const secureMockData = {
      message: 'OK',
    };

    return res.json(secureMockData);
  }
}
