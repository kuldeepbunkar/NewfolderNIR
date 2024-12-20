import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/interfaces';

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export {}; 