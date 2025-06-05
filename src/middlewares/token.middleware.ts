import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TokenMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authToken = req.headers['authorization'];
    console.log(' authToken', authToken);
    //verify token
    next();
  }
}
