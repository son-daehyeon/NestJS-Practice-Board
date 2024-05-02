import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UserModule } from '../domain/user/user.module';
import { BoardModule } from '../domain/board/board.module';
import { CommentModule } from '../domain/comment/comment.module';

import { UserMiddleware } from '../domain/user/user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          uri: configService.get<string>('MONGO_URL'),
        };
      },
      inject: [ConfigService],
    }),

    UserModule,
    BoardModule,
    CommentModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes('*');
  }
}
