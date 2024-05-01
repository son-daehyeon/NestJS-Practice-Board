import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const secret = this.configService.get<string>('JWT_SECRET');

    const request = context.switchToHttp().getRequest();
    const authorization = request.headers['authorization'];

    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.slice(7);

      if (jwt.verify(token, secret)) {
        return true;
      }
    }

    return false;
  }
}
