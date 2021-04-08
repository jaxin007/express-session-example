import express from 'express';

export interface Middleware {
  (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void>
}
