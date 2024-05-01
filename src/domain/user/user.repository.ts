import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';

import { Model } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByUsername(username: string): Promise<User> {
    return await this.userModel.findOne({ username }).exec();
  }

  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.userModel.exists({ email }).exec());
  }

  async existsByUsername(username: string): Promise<boolean> {
    return !!(await this.userModel.exists({ username }).exec());
  }
}
