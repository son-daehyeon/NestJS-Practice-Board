import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { User } from './user.schema';

import { Model, ObjectId } from 'mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async save(user: User): Promise<User> {
    return await this.userModel.create(user);
  }

  async findById(id: string | ObjectId): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async existsByEmail(email: string): Promise<boolean> {
    return !!(await this.userModel.exists({ email }).exec());
  }

  async existsByUsername(username: string): Promise<boolean> {
    return !!(await this.userModel.exists({ username }).exec());
  }
}
