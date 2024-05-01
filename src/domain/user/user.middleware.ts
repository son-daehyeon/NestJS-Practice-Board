import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

import { UserRepository } from './user.repository';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];
    if (authorization) {
      const username = jwt.decode(authorization.slice(7))['username'];

      req['user'] = await this.userRepository.findByUsername(username);
    }

    next();
  }
}
