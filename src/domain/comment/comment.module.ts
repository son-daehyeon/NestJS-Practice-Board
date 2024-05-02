import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { Comment, CommentSchema } from './comment.schema';

import { BoardModule } from '../board/board.module';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Comment.name,
        useFactory: () => {
          const schema = CommentSchema;
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          schema.plugin(require('mongoose-autopopulate'));
          return schema;
        },
      },
    ]),

    BoardModule,
  ],
  controllers: [CommentController],
  providers: [CommentService, CommentRepository],
  exports: [CommentRepository],
})
export class CommentModule {}
