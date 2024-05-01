import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { UserMiddleware } from './user.middleware';
import { User, UserSchema } from './user.schema';
import { UserGuard } from './user.guard';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UserController],
  providers: [UserService, UserRepository, UserMiddleware, UserGuard],
  exports: [UserRepository],
})
export class UserModule {}
