import { Injectable, NestMiddleware, createParamDecorator, ExecutionContext } from '@nestjs/common';
import { NextFunction } from 'express';

import { UserRepository } from './user.repository';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserMiddleware implements NestMiddleware {
  constructor(private userRepository: UserRepository) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authorization = req.headers['authorization'];

    if (authorization) {
      const userId = jwt.decode(authorization.slice(7))['userId'];

      req['user'] = await this.userRepository.findById(userId);
    }

    next();
  }
}

export const ReqUser = createParamDecorator((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  return request.user;
});
