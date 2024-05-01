import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserRepository } from './user.repository';
import { User } from './user.schema';

import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { ExceptionFactory, Exceptions } from '../../util/ExceptionFactory';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private configService: ConfigService,
  ) {}

  async register(username: string, email: string, password: string): Promise<void> {
    if (await this.userRepository.existsByEmail(email)) {
      throw ExceptionFactory.of(Exceptions.EMAIL_ALREADY_EXISTS);
    }
    if (await this.userRepository.existsByUsername(username)) {
      throw ExceptionFactory.of(Exceptions.USERNAME_ALREADY_EXISTS);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    await this.userRepository.save({ username, email, password: hash });
  }

  async login(username: string, password: string): Promise<string> {
    if (!(await this.userRepository.existsByUsername(username))) {
      throw ExceptionFactory.of(Exceptions.USER_NOT_FOUND);
    }

    const user = await this.userRepository.findByUsername(username);

    if (!(await bcrypt.compare(password, user.password))) {
      throw ExceptionFactory.of(Exceptions.PASSWORD_INCORRECT);
    }

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const secret = this.configService.get<string>('JWT_SECRET');

    return jwt.sign({ userId: user['_id'] }, secret, { expiresIn: '30d' });
  }
}
