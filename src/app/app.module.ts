import { MiddlewareConsumer, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

import { UserModule } from '../domain/user/user.module';
import { BoardModule } from '../domain/board/board.module';
import { CommentModule } from '../domain/comment/comment.module';

import { UserMiddleware } from '../domain/user/user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    WinstonModule.forRoot({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.ms(),
        winston.format.printf(({ level, message, timestamp }) => {
          return `${timestamp} [${level}] ${message}`;
        }),
      ),
      transports: [
        new winston.transports.Console(),

        new winston.transports.DailyRotateFile({
          level: 'info',
          datePattern: 'YYYY-MM-DD',
          dirname: './logs',
          filename: `%DATE%.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),

        new winston.transports.DailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: './logs/error',
          filename: `%DATE%.error.log`,
          maxFiles: 30,
          zippedArchive: true,
        }),
      ],
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
