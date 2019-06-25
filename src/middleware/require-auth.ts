import express, { RequestHandler, NextFunction } from 'express';

export function requireAuth(): RequestHandler {
  return (
    req: express.Request,
    res: express.Response,
    next: NextFunction
  ): express.Response | void => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not Logged In' });
    }

    return next();
  };
}
