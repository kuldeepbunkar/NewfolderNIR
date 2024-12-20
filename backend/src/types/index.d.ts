declare namespace Express {
  export interface Request {
    user?: {
      _id: string;
      role: string;
    };
  }
}

declare module 'express-rate-limit';
declare module 'swagger-jsdoc';
declare module 'swagger-ui-express';
declare module 'winston-daily-rotate-file'; 